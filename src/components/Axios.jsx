import axios from 'axios';

async function loadHotCollections() {
  try {
    const res = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
    const data = res.data;
    console.log(data);
    // update your page DOM here
  } catch (err) {
    console.error(err);
  }
}

loadHotCollections();
