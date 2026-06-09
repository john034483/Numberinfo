export default async function handler(req, res) {
  const num = req.query.num;

  if (!num) {
    return res.status(400).json({ error: "No number provided" });
  }

  try {
    const url = `http://number-free1year.vercel.app/?apikey=toxicadminn&number=${num}`;
    
    const response = await fetch(url, {
      method: "GET"
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

    return res.status(200).json(data);

  } catch (err) {
    return res.status(200).json({
      status: false,
      message: "Fetch failed",
      error: err.message
    });
  }
}
