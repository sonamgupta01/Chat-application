let currentUser = null;

async function selectUser(username) {
    currentUser = username;
    document.getElementById('chat-title').innerText = `Chat with ${username}`;
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';

    try {
        const response = await fetch(`/get_messages/${username}/`);
        const data = await response.json();

        if (data.messages) {
            data.messages.forEach((msg) => {
                const messageElement = document.createElement('div');
                messageElement.textContent = data.message;
                chatBox.appendChild(messageElement);
            });
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}


async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message && currentUser) {
        try {
            await fetch('/send_message/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}', // Include CSRF token
                },
                body: JSON.stringify({
                    receiver: currentUser,
                    message: message,
                }),
            });

            const chatBox = document.getElementById('chat-box');
            const messageElement = document.createElement('div');
            messageElement.textContent = data.message;
            chatBox.appendChild(messageElement);

            messageInput.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}
