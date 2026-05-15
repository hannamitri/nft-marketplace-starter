export const topSellersUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

export function enrichWithAuthorData(items, sellers) {
  const sellersByAuthorId = sellers.reduce((authorMap, seller) => {
    authorMap[seller.authorId] = seller;
    return authorMap;
  }, {});

  return items.map(item => {
    const matchingSeller = sellersByAuthorId[item.authorId];

    if (!matchingSeller) {
      return item;
    }

    return {
      ...item,
      authorName: matchingSeller.authorName,
      authorImage: matchingSeller.authorImage,
    };
  });
}
