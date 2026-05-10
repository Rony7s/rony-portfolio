const form = document.getElementById("contact-form");
const statusBox = document.getElementById("form-status");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZG-jWuH_NS8w0ZGP1NexeLRuTQnVKTg_pAvC4mx7Nt0l0dtMvjF1eQ7Hj2eMTsdrvLA/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // UI update
  statusBox.innerHTML = "Sending message...";
  statusBox.style.color = "#facc15";

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.result === "success") {
      statusBox.innerHTML = "Message sent successfully!";
      statusBox.style.color = "#22c55e";
      form.reset();
    } else {
      statusBox.innerHTML = "Failed to send message!";
      statusBox.style.color = "#ef4444";
    }

  } catch (error) {
    statusBox.innerHTML = "Something went wrong!";
    statusBox.style.color = "#ef4444";
    console.error(error);
  }
});