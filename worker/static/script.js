document.getElementById('startChat').addEventListener('click', function() {
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
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
