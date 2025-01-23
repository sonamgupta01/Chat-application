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
        socket.send(JSON.stringify({ message }));
        input.value = '';
    }
});
