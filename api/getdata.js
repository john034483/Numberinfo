export default async function handler(req, res) {
  const num = req.query.num;

  if (!num) {
    return res.status(400).json({ error: "No number provided" });
  }

  // HTML me chal rahi current exact key
  const currentKey = "TABBO_DEMO_003"; 

  try {
    const url = `https://tabbopro.vercel.app/api/key-tabbo/number?key=${currentKey}&num=${num}`;
    
    // Request config ko exact browser format me bhej rahe hain
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const text = await response.text();

    if (!text || text.trim() === "") {
      return res.status(200).json({
        status: false,
        message: "No data from API"
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(200).json({
        status: false,
        message: "Invalid JSON from API",
        raw: text
      });
    }

    // Agar server key fail ka response deta hai
    if (data.msg === "key not found" || data.success === false || data.status === "failed") {
      return res.status(200).json({
        status: false,
        message: "Server returned key error",
        error: "KEY_NOT_FOUND",
        suggestion: "Check if the key TABBO_DEMO_003 is still active on the main server"
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(200).json({
      status: false,
      message: "Fetch failed",
      error: err.message
    });
  }
}
