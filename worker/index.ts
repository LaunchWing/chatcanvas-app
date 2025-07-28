// Auto-generated entrypoint for Cloudflare Worker

import { OpenAIIntegrationBackendHandler } from './api/OpenAIIntegrationBackend';
import { UserAccountManagementBackendHandler } from './api/UserAccountManagementBackend';

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatCanvas - Personalize Your Conversations</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body class="bg-gray-100">
    <header class="bg-white shadow-md py-4">
        <div class="container mx-auto flex items-center justify-between">
            <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-eeM7RLe3Wv2HZ7Toub47POas/user-rnGwZEmjnwoUoF8lEvadvt0O/img-nFTLtPl6t3gCBmVocjfa6ITt.png?st=2025-07-28T08%3A46%3A38Z&se=2025-07-28T10%3A46%3A38Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-28T01%3A31%3A55Z&ske=2025-07-29T01%3A31%3A55Z&sks=b&skv=2024-08-04&sig=GBtLpZwjJbvkAZr0oyEl2qjI/RhW2ckwaxZ3qPv7/is%3D" alt="ChatCanvas Logo" class="h-10">
            <h1 class="text-xl font-semibold text-gray-800">ChatCanvas</h1>
        </div>
    </header>
    <main class="container mx-auto py-8">
        <section class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to ChatCanvas</h2>
            <p class="text-gray-600 mb-4">Personalize your conversations with our AI-powered chatbot. Choose your favorite UI template and start chatting!</p>
            <button id="startChat" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Chatting</button>
        </section>
        <section id="chatWindow" class="hidden bg-white mt-8 p-6 rounded-lg shadow-md">
            <div class="flex flex-col space-y-4">
                <div id="chatMessages" class="flex-grow overflow-y-auto max-h-64">
                    <!-- Chat messages will appear here -->
                </div>
                <div class="flex items-center">
                    <input type="text" id="userInput" class="w-full p-2 border border-gray-300 rounded mr-2" placeholder="Type your message">
                    <button id="sendMessage" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Send</button>
                </div>
            </div>
        </section>
    </main>
    <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto text-center">
            <p>&copy; 2023 ChatCanvas. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
const STYLE_CSS = `body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
#chatWindow {
    border-top: 2px solid #4A90E2;
}
button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}
`;
const SCRIPT_JS = `document.getElementById('startChat').addEventListener('click', function() {
    document.getElementById('chatWindow').classList.toggle('hidden');
});

document.getElementById('sendMessage').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') {
        appendMessage('You', userInput);
        fetch('/functions/api/handler.ts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('ChatCanvas', data.response);
        })
        .catch(error => console.error('Error:', error));
        document.getElementById('userInput').value = '';
    }
});

function appendMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('p-2', 'rounded', 'bg-gray-100', 'mb-2');
    messageElement.innerHTML = \`<strong>\${sender}:</strong> \${message}\`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === '/') return new Response(INDEX_HTML, { headers: { 'Content-Type': 'text/html' } });
    if (path === '/style.css') return new Response(STYLE_CSS, { headers: { 'Content-Type': 'text/css' } });
    if (path === '/script.js') return new Response(SCRIPT_JS, { headers: { 'Content-Type': 'application/javascript' } });
    if (path === '/api/OpenAIIntegrationBackend') return OpenAIIntegrationBackendHandler(request);
    if (path === '/api/UserAccountManagementBackend') return UserAccountManagementBackendHandler(request);
    return new Response('Not found', { status: 404 });
  }
};
