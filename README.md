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

1. **Planner Agent**: Analyzes your prompt and creates a high-level project plan
   - Defines project structure
   - Selects appropriate tech stack
   - Lists required features and files

2. **Architect Agent**: Breaks down the plan into concrete implementation tasks
   - Creates detailed implementation steps
   - Defines dependencies between tasks
   - Specifies function signatures and data flow

3. **Coder Agent**: Implements each task using tool-calling capabilities
   - Reads existing files for context
   - Writes complete, integrated code
   - Maintains consistency across modules

## 📋 Prerequisites

- Python 3.11 or higher
- Groq API key (get one at [groq.com](https://groq.com))

## 🚀 Installation

1. Clone the repository:
git clone <your-repo-url>
cd ai-developer2. Install dependencies using `uv` (recommended):
pip install uv
uv syncOr using pip:
pip install -r requirements.txt3. Create a `.env` file in the project root:
GROQ_API_KEY=your_groq_api_key_here## 💻 Usage

## Running the Web Interface

To start the Streamlit web application, run:
``bash
streamlit run main.py

## How to Use
1. Enter your project description in the text area
2. Click "Generate Code"
3. Wait for the agent to complete (may take 1-2 minutes)
4. View generated files and download as ZIP
