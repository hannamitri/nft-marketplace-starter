// Debug script to see NFT data and author matching
const axios = require('axios');

async function debugNFTs() {
  try {
    console.log('=== DEBUGGING NFT DATA ===');
    
    // Test with the author ID from the screenshot
    const authorId = "83937449"; // Monica Lucas
    
    // Fetch all APIs
    const [newItemsResponse, hotCollectionsResponse, topSellersResponse] = await Promise.all([
      axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'),
      axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'),
      axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
    ]);
    
    console.log('\n1. TOP SELLERS DATA:');
    const author = topSellersResponse.data.find(seller => seller.authorId == authorId);
    if (author) {
      console.log('Found author:', {
        id: author.id,
        authorId: author.authorId,
        authorName: author.authorName
      });
    } else {
      console.log('Author not found in TopSellers');
    }
    
    console.log('\n2. NEW ITEMS API:');
    console.log(`Total new items: ${newItemsResponse.data.length}`);
    
    // Check what author IDs exist in newItems
    const newItemsAuthorIds = [...new Set(newItemsResponse.data.map(item => item.authorId))];
    console.log('Unique author IDs in newItems:', newItemsAuthorIds.slice(0, 10));
    
    // Find NFTs for our author
    const newItemsForAuthor = newItemsResponse.data.filter(item => 
      item.authorId == authorId || item.authorId === parseInt(authorId)
    );
    console.log(`NFTs for author ${authorId} in newItems: ${newItemsForAuthor.length}`);
    newItemsForAuthor.forEach((nft, i) => {
      console.log(`  ${i+1}. ${nft.title} (ID: ${nft.authorId})`);
    });
    
    console.log('\n3. HOT COLLECTIONS API:');
    console.log(`Total hot collections: ${hotCollectionsResponse.data.length}`);
    
    // Check what author IDs exist in hotCollections
    const hotCollectionsAuthorIds = [...new Set(hotCollectionsResponse.data.map(item => item.authorId))];
    console.log('Unique author IDs in hotCollections:', hotCollectionsAuthorIds.slice(0, 10));
    
    // Find NFTs for our author
    const hotCollectionsForAuthor = hotCollectionsResponse.data.filter(item => 
      item.authorId == authorId || item.authorId === parseInt(authorId)
    );
    console.log(`NFTs for author ${authorId} in hotCollections: ${hotCollectionsForAuthor.length}`);
    hotCollectionsForAuthor.forEach((nft, i) => {
      console.log(`  ${i+1}. ${nft.title} (ID: ${nft.authorId})`);
    });
    
    console.log('\n4. COMBINED RESULTS:');
    const totalNFTs = newItemsForAuthor.length + hotCollectionsForAuthor.length;
    console.log(`Total NFTs found for author ${authorId}: ${totalNFTs}`);
    
    // Check if there are any similar author IDs
    console.log('\n5. SIMILAR AUTHOR IDs:');
    const allAuthorIds = [...new Set([...newItemsAuthorIds, ...hotCollectionsAuthorIds])];
    const similarIds = allAuthorIds.filter(id => 
      String(id).includes(String(authorId).slice(-4)) || 
      String(authorId).includes(String(id).slice(-4))
    );
    console.log('Similar author IDs found:', similarIds);
    
  } catch (error) {
    console.error('Debug error:', error.message);
  }
}

debugNFTs();
