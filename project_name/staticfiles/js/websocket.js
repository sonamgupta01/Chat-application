// Establish WebSocket connection
const roomName = "example_room"; // Replace with dynamic room name if needed
const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
const socket = new WebSocket(`${wsProtocol}${window.location.host}/ws/chat/${roomName}/`);

// Handle WebSocket connection open
socket.onopen = () => {
    console.log("WebSocket connection established.");
};

// Handle messages received from the server
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const message = data.message;

    // Append the message to the chat box
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
};

// Handle WebSocket errors
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

// Handle WebSocket connection close
socket.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
};

// Send a message through the WebSocket
const sendMessage = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ message: message }));
    } else {
        console.error("WebSocket is not open. Cannot send message.");
    }
};

// Example: Send a message when a button is clicked
document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById("message-input");
    const message = input.value;
    if (message.trim() !== "") {
        sendMessage(message);
        input.value = ""; // Clear input after sending
    }
});
