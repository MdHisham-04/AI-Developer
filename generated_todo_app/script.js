(() => {
  // =============================
  // A. Data Model
  // =============================
  /**
   * Represents a single todo item.
   * @class
   */
  class TodoItem {
    /**
     * @param {string} id - UUID string.
     * @param {string} text - Todo description.
     * @param {boolean} completed - Completion flag.
     * @param {number} order - Sorting order (timestamp based).
     */
    constructor({ id, text, completed = false, order = Date.now() }) {
      this.id = id;
      this.text = text;
      this.completed = completed;
      this.order = order;
    }

    /**
     * Re‑creates a TodoItem from a plain object (e.g., parsed JSON).
     * @param {Object} obj
     * @returns {TodoItem}
     */
    static fromObject(obj) {
      // Ensure the object has the required shape.
      return new TodoItem({
        id: obj.id,
        text: obj.text,
        completed: obj.completed,
        order: obj.order,
      });
    }
  }

  // =============================
  // B. Storage Module
  // =============================
  const TodoStorage = {
    /**
     * Load todos from localStorage and return an array of TodoItem instances.
     * @returns {TodoItem[]}
     */
    load() {
      const raw = localStorage.getItem('todos');
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map(TodoItem.fromObject);
      } catch (e) {
        console.error('Failed to parse stored todos:', e);
        return [];
      }
    },

    /**
     * Persist an array of TodoItem instances to localStorage.
     * @param {TodoItem[]} todos
     */
    save(todos) {
      const plain = todos.map(t => ({
        id: t.id,
        text: t.text,
        completed: t.completed,
        order: t.order,
      }));
      localStorage.setItem('todos', JSON.stringify(plain));
    },
  };

  // Export to global namespace for future extensions.
  window.TodoStorage = TodoStorage;

  // =============================
  // C. UI Rendering & Event Delegation
  // =============================
  const todoListEl = document.getElementById('todo-list');
  let todos = [];
  let currentFilter = 'all'; // 'all' | 'active' | 'completed'

  /**
   * Render the todo list based on the current filter.
   * @param {string} [filter=currentFilter]
   */
  function renderTodos(filter = currentFilter) {
    // Store filter for later calls.
    currentFilter = filter;
    // Clear existing items.
    todoListEl.innerHTML = '';

    // Determine which items should be displayed.
    const filtered = todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true; // 'all'
    });

    // Sort by the `order` property to keep a stable order.
    filtered.sort((a, b) => a.order - b.order);

    // Create DOM nodes.
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.dataset.id = todo.id;
      li.draggable = true; // enable drag‑and‑drop

      li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
        <button class="edit-btn" title="Edit">✎</button>
        <button class="delete-btn" title="Delete">✕</button>
      `;
      todoListEl.appendChild(li);
    });
  }

  // ----- Delegated event listeners for list actions -----
  // Checkbox toggle
  todoListEl.addEventListener('change', e => {
    if (e.target.matches('.complete-checkbox')) {
      const li = e.target.closest('.todo-item');
      if (!li) return;
      const id = li.dataset.id;
      toggleComplete(id);
    }
  });

  // Edit & Delete button clicks
  todoListEl.addEventListener('click', e => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = li.dataset.id;
    if (e.target.matches('.edit-btn')) {
      const newText = prompt('Edit todo:', li.querySelector('.todo-text').textContent);
      if (newText !== null) editTodo(id, newText.trim());
    } else if (e.target.matches('.delete-btn')) {
      if (confirm('Delete this todo?')) deleteTodo(id);
    }
  });

  // ----- Drag‑and‑Drop handling -----
  let draggedId = null;

  todoListEl.addEventListener('dragstart', e => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    draggedId = li.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedId);
    li.classList.add('dragging');
  });

  todoListEl.addEventListener('dragend', e => {
    const li = e.target.closest('.todo-item');
    if (li) li.classList.remove('dragging');
    draggedId = null;
  });

  todoListEl.addEventListener('dragover', e => {
    e.preventDefault(); // allow drop
    const afterElement = getDragAfterElement(e.clientY);
    const draggingEl = todoListEl.querySelector('.dragging');
    if (!draggingEl) return;
    if (afterElement == null) {
      todoListEl.appendChild(draggingEl);
    } else {
      todoListEl.insertBefore(draggingEl, afterElement);
    }
  });

  /**
   * Helper to find the element after which the dragged item should be inserted.
   * @param {number} y - Mouse Y coordinate.
   * @returns {HTMLElement|null}
   */
  function getDragAfterElement(y) {
    const draggableElements = [...todoListEl.querySelectorAll('.todo-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }

  // After a drop, rebuild the `todos` array order based on DOM order.
  todoListEl.addEventListener('drop', e => {
    e.preventDefault();
    // Re‑order the in‑memory array to match DOM order.
    const orderedIds = [...todoListEl.children].map(li => li.dataset.id);
    const idToTodo = {};
    todos.forEach(t => { idToTodo[t.id] = t; });
    todos = orderedIds.map((id, index) => {
      const t = idToTodo[id];
      // Update the order field to reflect new position.
      t.order = Date.now() + index; // simple monotonic value
      return t;
    });
    TodoStorage.save(todos);
    renderTodos();
  });

  // =============================
  // D. CRUD Operations
  // =============================
  /**
   * Add a new todo.
   * @param {string} text
   */
  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    const todo = new TodoItem({ id, text: trimmed, completed: false, order: Date.now() });
    todos.push(todo);
    TodoStorage.save(todos);
    renderTodos();
  }

  /**
   * Edit an existing todo's text.
   * @param {string} id
   * @param {string} newText
   */
  function editTodo(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    todo.text = newText;
    TodoStorage.save(todos);
    renderTodos();
  }

  /**
   * Delete a todo by id.
   * @param {string} id
   */
  function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    TodoStorage.save(todos);
    renderTodos();
  }

  /**
   * Toggle completion state.
   * @param {string} id
   */
  function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    TodoStorage.save(todos);
    renderTodos();
  }

  // =============================
  // E. Filtering
  // =============================
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (!filter) return;
      // Update active class.
      filterButtons.forEach(b => b.classList.toggle('active', b === btn));
      renderTodos(filter);
    });
  });

  // =============================
  // G. Theme Customization
  // =============================
  const primaryColorInput = document.getElementById('primary-color');
  primaryColorInput.addEventListener('input', e => {
    const value = e.target.value;
    document.documentElement.style.setProperty('--primary-color', value);
    localStorage.setItem('themeColor', value);
  });

  // =============================
  // H. Initialization
  // =============================
  document.addEventListener('DOMContentLoaded', () => {
    // Load and apply saved theme color.
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
      primaryColorInput.value = savedColor;
      document.documentElement.style.setProperty('--primary-color', savedColor);
    }

    // Load todos.
    todos = TodoStorage.load();

    // Add button handler.
    const addBtn = document.getElementById('add-btn');
    const newTodoInput = document.getElementById('new-todo');
    addBtn.addEventListener('click', () => {
      addTodo(newTodoInput.value);
      newTodoInput.value = '';
    });
    // Enter key handling.
    newTodoInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        addTodo(newTodoInput.value);
        newTodoInput.value = '';
      }
    });

    // Initial render.
    renderTodos();
  });

  // Expose for debugging (optional).
  window.addTodo = addTodo;
  window.editTodo = editTodo;
  window.deleteTodo = deleteTodo;
  window.toggleComplete = toggleComplete;
  window.renderTodos = renderTodos;
})();