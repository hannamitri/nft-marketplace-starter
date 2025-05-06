const mockAuthors = [
    {
      id: "83937449",
      name: "Monica Lucas",
      image: "https://i.pravatar.cc/150?img=1",
      bio: "Monica Lucas is a digital artist creating stunning visual experiences.",
      items: [
        {
          id: "item1",
          nftId: "nft1",
          title: "Ocean Breeze",
          nftImage: "https://picsum.photos/300/300?random=1",
          price: 1.5,
          likes: 100,
          expiryDate: new Date(Date.now() + 3600 * 1000 * 4).toISOString(),
        },
      ],
    },
    {
      id: "12345678",
      name: "Nicholas Daniels",
      image: "https://i.pravatar.cc/150?img=2",
      bio: "Nicholas Daniels creates futuristic designs using cutting-edge tools.",
      items: [
        {
          id: "item2",
          nftId: "nft2",
          title: "City Lights",
          nftImage: "https://picsum.photos/300/300?random=2",
          price: 2.3,
          likes: 75,
          expiryDate: new Date(Date.now() + 3600 * 1000 * 6).toISOString(),
        },
      ],
    },
    {
      id: "56789012",
      name: "Karla Sharp",
      image: "https://i.pravatar.cc/150?img=3",
      bio: "Karla Sharp specializes in abstract and geometric art forms.",
      items: [
        {
          id: "item3",
          nftId: "nft3",
          title: "Berry Dreams",
          nftImage: "https://picsum.photos/300/300?random=3",
          price: 1.1,
          likes: 50,
          expiryDate: new Date(Date.now() + 3600 * 1000 * 2).toISOString(),
        },
      ],
    },
    {
      id: "98765432",
      name: "Franklin Greer",
      image: "https://i.pravatar.cc/150?img=4",
      bio: "Franklin Greer explores surreal landscapes and dreamlike themes.",
      items: [
        {
          id: "item4",
          nftId: "nft4",
          title: "Sunset Mirage",
          nftImage: "https://picsum.photos/300/300?random=4",
          price: 3.7,
          likes: 88,
          expiryDate: new Date(Date.now() + 3600 * 1000 * 8).toISOString(),
        },
      ],
    },
  ];
  
  export default mockAuthors;
  
  
  
  
  