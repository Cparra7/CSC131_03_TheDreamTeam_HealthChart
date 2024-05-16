const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  
  // Check for User login
  if (username === "User" && password === "Password") {
    alert("You have successfully logged in as a User.");
    window.location.href = "User/User Dashboard.html"; // Redirect to User dashboard
  }

  // Handle incorrect login
  else {
    loginErrorMsg.style.opacity = 1;
  }
});
