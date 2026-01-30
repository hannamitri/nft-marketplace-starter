const axios = require('axios');

async function testApi() {
  console.log("Testing API...");
  try {
    const start = Date.now();
    const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections', { timeout: 5000 });
    console.log(`Status: ${response.status}`);
    console.log(`Time: ${Date.now() - start}ms`);
    console.log(`Data length: ${response.data.length}`);
  } catch (error) {
    console.error("API Error:", error.message);
    if (error.response) {
      console.log("Response status:", error.response.status);
    }
  }
}

testApi();