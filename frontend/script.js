const API_URL = "https://97xkw7v5e8.execute-api.us-east-1.amazonaws.com/login";

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  resultEl.textContent = "Authenticating...";
  resultEl.className = "info";
  submitBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
      })
    });

    const data = await response.json();
    resultEl.textContent = data.message || "No response message";

    if (response.ok && data.message === "Login successful!") {
      resultEl.className = "success";
    } else {
      resultEl.className = "error";
    }
  } catch (error) {
    console.error("Login request failed:", error);
    resultEl.textContent = "Backend connection failed.";
    resultEl.className = "error";
  } finally {
    submitBtn.disabled = false;
  }
});
