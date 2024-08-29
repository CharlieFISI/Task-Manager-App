export function showFeedback(message, type) {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback feedback--${type} feedback--show`;

  setTimeout(() => {
    feedbackElement.classList.remove("feedback--show");
  }, 3000);
}
