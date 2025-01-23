// Collapsible menu toggle
const toggleMenu = () => {
    const leftMenu = document.querySelector('.left-menu');
    leftMenu.style.display = leftMenu.style.display === 'none' ? 'block' : 'none';
};

// Screen width adjustment
const adjustPage = () => {
    const width = window.innerWidth;
    let scale = 1;

    if (width <= 600) {
        scale = 0.5;
    } else if (width <= 700) {
        scale = 0.75;
    } else if (width <= 767) {
        scale = 0.8;
    } else if (width <= 1600) {
        scale = 0.9;
    }

    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin = '0 0';
};

window.addEventListener('resize', adjustPage);
adjustPage();

// WebSocket Chat
const socket = new WebSocket('ws://' + window.location.host + '/ws/chat/room_name/');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = data.message;
    chatBox.appendChild(messageElement);
};

document.getElementById('send-button').addEventListener('click', () => {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message.trim() !== '') {
        socket.send(JSON.stringify({
            'message': message,
            'sender': loggedInUser,  // Replace with the logged-in user's username
            'recipient': selectedRecipient,  // Replace with the recipient's username
        }));
        input.value = '';
    }
});