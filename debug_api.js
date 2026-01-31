const axios = require("axios");

async function checkStructure() {
  try {
    const res1 = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    if (!Array.isArray(res1.data));
    let validNftId = 1;
    let validAuthorId = 1;

    if (Array.isArray(res1.data) && res1.data.length > 0) {
      validNftId = res1.data[0].nftId;
      validAuthorId = res1.data[0].authorId;
    }


    const res2 = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
    );
    if (Array.isArray(res2.data) && res2.data.length > 0)

    {
      const res3 = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );
    if (Array.isArray(res3.data) && res3.data.length > 0)

    }

  } catch (error) 
  

  } catch (error) {
    try {
  }
  try {
    const res4 = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    );
    if (Array.isArray(res4.data) && res4.data.length > 0)


  } catch (error) {
  }
}

checkStructure();
