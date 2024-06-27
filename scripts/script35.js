let conversationHistory = [];

document.getElementById("gptButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) {
    alert("Введи повідомлення.");
    return;
  }

  conversationHistory.push({ role: "user", content: userInput });

  const response = await fetch('/run-gpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages: conversationHistory })
  });

  const data = await response.json();
  conversationHistory.push({ role: "assistant", content: data.message });

  const responseContainer = document.getElementById("responseContainer");
  responseContainer.innerHTML = "";

  for (let i = 0; i < conversationHistory.length; i += 2) {
    const userMessage = conversationHistory[i];
    const assistantMessage = conversationHistory[i + 1];

    const messageBlock = document.createElement("div");
    messageBlock.className = "messageBlock";

    const userDiv = document.createElement("div");
    userDiv.className = "userMessage";
    userDiv.textContent = userMessage.content;
    messageBlock.appendChild(userDiv);

    if (assistantMessage) {
      const assistantDiv = document.createElement("div");
      assistantDiv.className = "assistantMessage";
      assistantDiv.textContent = assistantMessage.content;
      messageBlock.appendChild(assistantDiv);
    }

    responseContainer.appendChild(messageBlock);
  }

  // Очищення поля вводу
  document.getElementById("userInput").value = '';
});
