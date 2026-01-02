document.getElementById('humanizeBtn').addEventListener('click', humanizeText);

async function humanizeText() {
    const input = document.getElementById('inputText').value;
    const outputContainer = document.getElementById('outputContainer');
    const placeholder = document.getElementById('placeholderText');
    const loader = document.getElementById('loader');
    
    // Replace with your actual Gemini API Key
    const API_KEY = "AIzaSyA3_DRDqkghQHRu6ZdSHLGpWYQgznsmyLs";

    if (input.trim().length < 10) {
        alert("Please enter a longer text for better results.");
        return;
    }

    // Show Loader
    placeholder.classList.add('hidden');
    loader.classList.remove('hidden');
    outputContainer.style.opacity = '0.7';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Rewrite this following text into a natural, conversational, and highly human-like style. Remove all AI-typical robotic structures while maintaining the original meaning. Text: " + input
                    }]
                }]
            })
        });

        const data = await response.json();
        const resultText = data.candidates[0].content.parts[0].text;

        // Display Result
        loader.classList.add('hidden');
        outputContainer.style.opacity = '1';
        outputContainer.innerHTML = `<div style="white-space: pre-wrap;">${resultText}</div>`;

    } catch (error) {
        loader.classList.add('hidden');
        placeholder.classList.remove('hidden');
        alert("Failed to connect to AI Engine. Please check your API key.");
    }
}

function copyContent() {
    const text = document.getElementById('outputContainer').innerText;
    if(text && text !== "Output will appear here...") {
        navigator.clipboard.writeText(text);
        alert("Result copied to clipboard!");
    }
}
