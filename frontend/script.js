const form = document.getElementById("shorten-form");
const resultDiv = document.getElementById("result");
const API_BASE_URL = "https://url-generator-2axe.onrender.com";

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  const longUrl = document.getElementById("longUrl").value;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/urlUser/generateURL`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ long_url: longUrl }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    const shortUrl = data.data.shortUrl;

    resultDiv.innerHTML = `
      <p>Short URL:</p>
      <a href="${shortUrl}" target="_blank">${shortUrl}</a>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});
