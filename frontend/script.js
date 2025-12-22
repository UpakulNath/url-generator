const form = document.getElementById("shorten-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  const longUrl = document.getElementById("longUrl").value;

  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/urlUser/generateURL",
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
