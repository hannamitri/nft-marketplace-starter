// /api/author.js
export default async function handler(req, res) {
    const { author } = req.query;
  
    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${author}`
      );
  
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch author info" });
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  