const axios = require('axios');

async function testApi() {
  try {
    const start = Date.now();
    const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections', { timeout: 5000 });
  } catch (error) {
    console.error("API Error:", error.message);
    if (error.response) {
    }
  }
}

testApi();