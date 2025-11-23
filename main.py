from agent.graph import agent
import streamlit as st
import pathlib
import zipfile
import io

PROJECT_ROOT = pathlib.Path.cwd() / "generated_project"

def get_generated_files():
    """Get all files in the generated project directory."""
    if not PROJECT_ROOT.exists():
        return []
    return sorted([f for f in PROJECT_ROOT.glob("**/*") if f.is_file()])

def create_zip_of_project():
    """Create a ZIP file of the entire generated project."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for file_path in get_generated_files():
            arcname = file_path.relative_to(PROJECT_ROOT)
            zip_file.write(file_path, arcname)
    zip_buffer.seek(0)
    return zip_buffer

# Page config
st.set_page_config(page_title="AI Developer Agent", layout="wide")
st.title("🤖 AI Developer Agent")
st.write("Enter your development task and download the generated code.")

# Prompt input
user_prompt = st.text_area(
    "Enter your prompt:",
    placeholder="e.g., Build a colourful modern todo app in html css and js",
    height=120
)

# Run button
if st.button("🚀 Generate Code", type="primary"):
    if user_prompt:
        with st.spinner("Agent is working... This may take a minute."):
            try:
                result = agent.invoke(
                    {"user_prompt": user_prompt},
                    {"recursion_limit": 100}
                )
                st.success("✅ Code generation completed!")
                st.session_state['generated'] = True
            except Exception as e:
                st.error(f"❌ Error: {str(e)}")
    else:
        st.warning("Please enter a prompt first!")

# Display files if generated
if st.session_state.get('generated'):
    generated_files = get_generated_files()
    
    if generated_files:
        st.divider()
        
        # Download ZIP button
        col1, col2 = st.columns([3, 1])
        with col1:
            st.subheader(f"📁 {len(generated_files)} files generated")
        with col2:
            zip_buffer = create_zip_of_project()
            st.download_button(
                label="📦 Download ZIP",
                data=zip_buffer,
                file_name="generated_project.zip",
                mime="application/zip",
                use_container_width=True
            )
        
        # File viewer
        st.divider()
        st.subheader("📂 View Files")
        
        selected_file = st.selectbox(
            "Select a file to view:",
            options=generated_files,
            format_func=lambda x: str(x.relative_to(PROJECT_ROOT))
        )
        
        if selected_file:
            # Display file path
            st.caption(f"📄 {selected_file.relative_to(PROJECT_ROOT)}")
            
            # Read and display content
            try:
                with open(selected_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Determine language for syntax highlighting
                file_ext = selected_file.suffix[1:] if selected_file.suffix else None
                language_map = {
                    'py': 'python',
                    'js': 'javascript',
                    'ts': 'typescript',
                    'html': 'html',
                    'css': 'css',
                    'json': 'json',
                    'md': 'markdown',
                    'sh': 'bash',
                    'yml': 'yaml',
                    'yaml': 'yaml'
                }
                language = language_map.get(file_ext, file_ext)
                
                # Show code with syntax highlighting
                st.code(content, language=language, line_numbers=True)
                
                # Individual file download
                st.download_button(
                    label=f"⬇️ Download {selected_file.name}",
                    data=content,
                    file_name=selected_file.name,
                    mime="text/plain"
                )
                
            except Exception as e:
                st.error(f"Error reading file: {str(e)}")
    else:
        st.info("No files found. Try running the agent again.")