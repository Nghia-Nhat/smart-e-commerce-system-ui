export function sendPrompt(prompt: string) {
  return prompt;
}

export async function checkBot() {
  const response = await fetch("http://localhost:1234/v1/models");
  const result = await response.json();
  console.log(result);
}

export async function sendMessage(prompt: string, history_messages?: any) {
  const response = await fetch("http://localhost:5000/llm/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: prompt,
      history_messages,
    }),
  });
  const result = await response.json();
  return result;
}
