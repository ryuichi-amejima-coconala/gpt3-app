export default defineEventHandler(async (event) => {
  // フロント側から渡されたリクエストデータを取得
  const { prompt } = await readBody(event);

  // OpenAIの API に渡す payload を作成
  const payload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 300,
    n: 1,
  };

  // fetch メソッドで OpenAI からレスポンスオブジェクトを取得
  const response = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  // レスポンスオブジェクトから json データを取得しフロントに返す
  const json = await response.json();
  return json;
})