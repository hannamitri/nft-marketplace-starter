const axios = require('axios');

async function checkStructure() {
  try {
    console.log("Fetching Hot Collections...");
    const res1 = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
    console.log("HotCollections type:", typeof res1.data);
    console.log("HotCollections isArray:", Array.isArray(res1.data));
    if (!Array.isArray(res1.data)) console.log("Keys:", Object.keys(res1.data));
    let validNftId = 1;
    let validAuthorId = 1;

    if (Array.isArray(res1.data) && res1.data.length > 0) {
        console.log("Sample item:", Object.keys(res1.data[0]));
        validNftId = res1.data[0].nftId;
        validAuthorId = res1.data[0].authorId;
        console.log(`Found valid IDs - NFT: ${validNftId}, Author: ${validAuthorId}`);
    }

    console.log("\nFetching New Items...");

    const res2 = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
    console.log("NewItems isArray:", Array.isArray(res2.data));
    if (Array.isArray(res2.data) && res2.data.length > 0) console.log("Sample item:", Object.keys(res2.data[0]));

    console.log("\nFetching Top Sellers...");
    const res3 = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
    console.log("TopSellers isArray:", Array.isArray(res3.data));
    if (Array.isArray(res3.data) && res3.data.length > 0) console.log("Sample item:", Object.keys(res3.data[0]));

    console.log("\nFetching Explore Items...");
    const res4 = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore');
    console.log("ExploreItems isArray:", Array.isArray(res4.data));
    if (Array.isArray(res4.data) && res4.data.length > 0) console.log("Sample item:", Object.keys(res4.data[0]));

    console.log(`\nFetching Item Details (id=${validNftId})...`);
    const res5 = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${validNftId}`);
    console.log("ItemDetails keys:", Object.keys(res5.data));

    console.log(`\nFetching Author (id=${validAuthorId})...`);
    const res6 = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?authorId=${validAuthorId}`);
    console.log("Author keys:", Object.keys(res6.data));



  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkStructure();