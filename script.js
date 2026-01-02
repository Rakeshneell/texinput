/**
 * AI Text Humanizer - Professional Implementation
 * Powered by Gemini 1.5 Flash API
 */

// Event listener for the "Humanize Now" button
document.getElementById('humanizeBtn').addEventListener('click', humanizeText);

async function humanizeText() {
    const input = document.getElementById('inputText').value;
    const outputContainer = document.getElementById('outputContainer');
    const placeholder = document.getElementById('placeholderText');
    const loader = document.getElementById('loader');
    
    // --- API CONFIGURATION ---
    // Your provided API Key is now integrated
    const API_KEY = "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"; 
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // 1. Input Validation: Minimum 20 characters for best results
    if (!input || input.trim().length < 20) {
        alert("Please enter at least 20 characters for a professional transformation.");
        return;
    }

    // 2. UI Updates: Show Loading Animation
    placeholder.classList.add('hidden');
    loader.classList.remove('hidden');
    outputContainer.style.opacity = '0.6';
    outputContainer.innerHTML = ""; 

    try {
        // 3. API Request to Gemini Engine
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Rewrite this following text into a natural, conversational, and professional human-like style. Completely remove robotic AI patterns while keeping the core message intact: " + input
                    }]
                }]
            })
        });

        const data = await response.json();

        // 4. Response Validation and Display
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            const resultText = data.candidates[0].content.parts[0].text;
            
            loader.classList.add('hidden');
            outputContainer.style.opacity = '1';
            outputContainer.innerHTML = `<div style="white-space: pre-wrap;">${resultText}</div>`;
        } else {
            // Detailed error if API fails
            throw new Error(data.error?.message || "Invalid API response structure.");
        }

    } catch (error) {
        // 5. Error Management and User Alert
        console.error("Developer Debug Info:", error);
        loader.classList.add('hidden');
        placeholder.classList.remove('hidden');
        alert("System Error: " + error.message + ". Please verify your connection.");
    }
}

/**
 * Professional Copy to Clipboard Function
 */
function copyContent() {
    const outputArea = document.getElementById('outputContainer');
    const text = outputArea.innerText;
    
    if (text && text !== "Output will appear here...") {
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.querySelector('.secondary-btn');
            const originalHTML = copyBtn.innerHTML;
            
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        });
    } else {
        alert("Nothing to copy yet!");
    }
}
