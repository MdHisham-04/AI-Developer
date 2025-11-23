# 🤖 AI Developer Agent

An intelligent code generation agent powered by LangGraph and Groq that automatically plans, architects, and implements complete software projects from natural language prompts.

## 🌟 Features

- **Natural Language to Code**: Simply describe your project idea in plain English
- **Multi-Agent Architecture**: Coordinated planning, architecture, and coding agents
- **Complete Project Generation**: Generates all necessary files with proper structure
- **Web UI Interface**: Beautiful Streamlit interface for easy interaction
- **Code Viewer**: Built-in syntax-highlighted code viewer
- **Easy Export**: Download individual files or entire project as ZIP

## 🏗️ Architecture

The agent uses a three-stage pipeline powered by LangGraph:

### 1. Planner Agent
Analyzes your prompt and creates a high-level project plan:
- Defines project structure
- Selects appropriate tech stack
- Lists required features and files

### 2. Architect Agent
Breaks down the plan into concrete implementation tasks:
- Creates detailed implementation steps
- Defines dependencies between tasks
- Specifies function signatures and data flow

### 3. Coder Agent
Implements each task using tool-calling capabilities:
- Reads existing files for context
- Writes complete, integrated code
- Maintains consistency across modules

## 📋 Prerequisites

- Python 3.11 or higher
- Groq API key (get one at [groq.com](https://groq.com))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-developer
   ```

2. **Install dependencies**

   Using `uv` (recommended):
   ```bash
   pip install uv
   uv sync
   ```

3. **Configure environment**

   Create a `.env` file in the project root:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

## 💻 Usage

### Running the Web Interface

To start the Streamlit web application, run:

```bash
streamlit run main.py
```

### How to Use

1. **Enter your project description** in the text area
2. **Click "Generate Code"** to start the generation process
3. **Wait for completion** (typically 1-2 minutes depending on project complexity)
4. **View generated files** in the code viewer with syntax highlighting
5. **Download files** individually or export the entire project as a ZIP archive

### Example Prompts

- "Create a REST API for a todo list application using Flask"
- "Build a simple calculator app with a GUI using tkinter"
- "Generate a web scraper that extracts product data from e-commerce sites"
- "Create a basic chat application using websockets"

## 🛠️ Tech Stack

- **LangGraph**: Agent orchestration and workflow management
- **Groq**: Fast LLM inference
- **Streamlit**: Web interface
- **Python 3.11+**: Core language

## ⚙️ Configuration

You can customize the agent's behavior by modifying the following parameters:

- **Model**: Change the Groq model in the agent configuration
- **Temperature**: Adjust creativity vs consistency
- **Max Iterations**: Set limits on agent planning depth