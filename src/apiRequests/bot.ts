export function sendPrompt(prompt: string) {
    return prompt;
}

export async function checkBot() {
    const response = await fetch('http://localhost:1234/v1/models');
    const result = await response.json();
    console.log(result);
}

export async function sendMessage(prompt: string) {
    const response = await fetch('http://localhost:1234/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: -1,
            // "stream": true
        }),
    });
    const result = await response.json();
    return result
}
