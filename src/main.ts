import "./style.css";

// Select or create the container where the button will be added
const container = document.getElementById("app") || document.body;

// Create a new button element
const button = document.createElement("button");
button.textContent = "Hello World"; // Set the button's text

// Optional: Add styles to the button
button.style.padding = "10px 20px";
button.style.fontSize = "16px";
button.style.cursor = "pointer";

// Add an event listener to handle button clicks
button.addEventListener("click", () => {
  console.log("Hello World button clicked!");
  alert("Hello World!"); // Display an alert when the button is clicked
});

// Append the button to the container
container.appendChild(button);
