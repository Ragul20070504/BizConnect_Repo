# Install dependencies:
# pip install flask flask-cors deep-translator python-docx

from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_translator import GoogleTranslator
from docx import Document
import io

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

def translate_text(text, dest_language='ta'):
    try:
        # GoogleTranslator automatically detects source language
        return GoogleTranslator(source='auto', target=dest_language).translate(text)
    except Exception as e:
        return f"Translation Error: {str(e)}"

def read_file_content(file):cd
    filename = file.filename.lower()
    
    if filename.endswith('.txt'):
        # Read plain text file
        return file.read().decode('utf-8')
    
    elif filename.endswith('.docx'):
        # Read docx file
        file_stream = io.BytesIO(file.read())
        doc = Document(file_stream)
        full_text = "\n".join([para.text for para in doc.paragraphs])
        return full_text
    
    else:
        return None

@app.route("/process-text", methods=["POST"])
def process_text():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400
    
    content = read_file_content(file)
    if content is None:
        return jsonify({"error": "Unsupported file type"}), 400

    # Translate the content to Tamil
    translated_text = translate_text(content, 'ta')
    
    return jsonify({"result": translated_text})

if __name__ == "__main__":
    app.run(port=8000, debug=True)

