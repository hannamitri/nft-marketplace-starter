const mockNewItems = [
  {
    id: "item1",
    nftId: "nft1",
    title: "Ocean Breeze",
    nftImage: "https://picsum.photos/300/300?random=1",
    price: 1.5,
    likes: 100,
    authorId: "83937449",  // Updated to match Monica Lucas' ID
    authorImage: "https://i.pravatar.cc/150?img=1",
    expiryDate: new Date(Date.now() + 3600 * 1000 * 4).toISOString(),
  },
  {
    id: "item2",
    nftId: "nft2",
    title: "City Lights",
    nftImage: "https://picsum.photos/300/300?random=2",
    price: 2.3,
    likes: 75,
    authorId: "12345678",  // Updated to match Nicholas Daniels' ID
    authorImage: "https://i.pravatar.cc/150?img=2",
    expiryDate: new Date(Date.now() + 3600 * 1000 * 6).toISOString(),
  },
  {
    id: "item3",
    nftId: "nft3",
    title: "Berry Dreams",
    nftImage: "https://picsum.photos/300/300?random=3",
    price: 1.1,
    likes: 50,
    authorId: "56789012",  // Updated to match Karla Sharp' ID
    authorImage: "https://i.pravatar.cc/150?img=3",
    expiryDate: new Date(Date.now() + 3600 * 1000 * 2).toISOString(),
  },
  {
    id: "item4",
    nftId: "nft4",
    title: "Sunset Mirage",
    nftImage: "https://picsum.photos/300/300?random=4",
    price: 3.7,
    likes: 88,
    authorId: "83937449",  // Updated to match Monica Lucas' ID
    authorImage: "https://i.pravatar.cc/150?img=1",
    expiryDate: new Date(Date.now() + 3600 * 1000 * 8).toISOString(),
  },
];

export default mockNewItems;

  