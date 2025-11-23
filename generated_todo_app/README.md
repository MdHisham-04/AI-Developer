# ColorfulTodo

## Brief Description
**ColorfulTodo** is a vibrant, interactive web‑based to‑do list application that brings a splash of color to task management. It allows users to add, edit, delete, and complete tasks, filter them by status, reorder via drag‑and‑drop, and customize the theme. All data is stored locally in the browser using `localStorage`, ensuring your tasks persist across sessions without any backend.

---

## Tech Stack
- **HTML** – Structure of the application.
- **CSS** – Styling, responsive layout, and colorful themes.
- **JavaScript** – Core functionality: task management, drag‑and‑drop, theming, and persistence.

---

## Features
- **Add Tasks** – Quickly create new tasks with a single input.
- **Edit Tasks** – Inline editing of task titles.
- **Delete Tasks** – Remove tasks you no longer need.
- **Complete Tasks** – Mark tasks as done; completed items are visually distinguished.
- **Filter Views** – Switch between *All*, *Active*, and *Completed* tasks.
- **Drag‑and‑Drop Reordering** – Rearrange tasks by dragging them to a new position.
- **Theme Customization** – Choose from a palette of colorful themes to personalize the UI.
- **Persistent Storage** – All tasks and selected theme are saved in `localStorage`.
- **Responsive Design** – Works on desktop and mobile browsers.

---

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ColorfulTodo.git
   cd ColorfulTodo
   ```
2. **Open the application**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
   - No additional build steps, server, or dependencies are required.

---

## Usage Guide
### Adding a Task
- Type your task description into the input field at the top.
- Press **Enter** or click the **Add** button.

### Editing a Task
- Double‑click on a task’s text to enable inline editing.
- Press **Enter** or click outside the input to save changes.

### Deleting a Task
- Click the **trash** icon (🗑️) on the right side of a task.

### Completing a Task
- Click the checkbox next to a task. Completed tasks are crossed out and dimmed.

### Filtering Tasks
- Use the filter buttons (**All**, **Active**, **Completed**) at the bottom to view tasks based on their status.

### Drag‑and‑Drop Reordering
- Click and hold a task, then drag it to the desired position.
- Release to drop; the new order is saved automatically.

### Theme Customization
- Click the **Theme** button (🎨) in the header.
- Choose a color from the palette; the UI updates instantly.
- The selected theme is saved and restored on next visit.

---

## File Structure
```
ColorfulTodo/
├─ index.html      # Main HTML markup and layout
├─ style.css       # All styling, including themes and responsive rules
├─ script.js       # JavaScript logic for task management, drag‑and‑drop, theming, and storage
└─ README.md       # Project documentation (this file)
```
- **index.html** – Contains the structural elements: header, input form, task list container, filter controls, and theme selector.
- **style.css** – Defines the visual appearance, color palettes, animations, and layout.
- **script.js** – Implements the core functionality: CRUD operations, event handling, localStorage integration, and drag‑and‑drop via the HTML5 API.

---

## Contribution Guidelines (Optional)
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix.
3. Ensure code follows existing style conventions.
4. Test changes locally by opening `index.html`.
5. Submit a pull request with a clear description of your changes.

---

## License
[Insert License Here] – This project is open source and can be used under the terms of the chosen license.

---

## Screenshots
| Light Theme | Dark Theme |
|-------------|------------|
| ![Light Theme](https://example.com/screenshots/light-theme.png) | ![Dark Theme](https://example.com/screenshots/dark-theme.png) |
| Drag‑and‑Drop Reordering | Completed Tasks |
| ![Drag‑and‑Drop](https://example.com/screenshots/drag-drop.png) | ![Completed](https://example.com/screenshots/completed.png) |

---

## Data Persistence & Reset
- All tasks, their order, and the selected theme are stored in the browser’s **localStorage** under keys such as `todos` and `theme`.
- To reset the application:
  1. Open the browser’s developer tools.
  2. Navigate to the **Application** (or **Storage**) tab.
  3. Locate **Local Storage → http://your‑domain**.
  4. Delete the `todos` and `theme` entries or click **Clear site data**.
  5. Refresh the page – the app will start with a clean slate.

---

Enjoy using **ColorfulTodo** to keep your tasks organized and your day a little brighter! 🎉
