import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItemsSkeleton = () => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="skeleton-box" style={{ width: '100%', height: '200px', borderRadius: '8px' }}></div>
                </div>
                <div className="nft__item_info">
                  <div className="skeleton-box" style={{ width: '80%', height: '20px', marginBottom: '8px' }}></div>
                  <div className="skeleton-box" style={{ width: '60px', height: '16px', marginBottom: '8px' }}></div>
                  <div className="skeleton-box" style={{ width: '40px', height: '14px' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Generate varied, realistic NFT data
const generateMockNFTItems = (authorId, authorImage) => {
  const nftTitles = [
    "Cosmic Dreams",
    "Digital Harmony", 
    "Neon Nights",
    "Abstract Reality",
    "Future Visions",
    "Cyberpunk Dreams",
    "Ethereal Beauty",
    "Quantum Chaos",
    "Digital Serenity",
    "Neon Genesis",
    "Abstract Mind",
    "Future Forward",
    "Digital Dreams",
    "Cosmic Journey",
    "Neon Lights",
    "Abstract Soul"
  ];

  const nftStyles = [
    "abstract", "cyberpunk", "cosmic", "neon", "digital", "futuristic", "ethereal", "geometric"
  ];

  const priceRanges = [
    { min: 0.5, max: 1.5 },
    { min: 1.5, max: 3.0 },
    { min: 3.0, max: 5.0 },
    { min: 5.0, max: 8.0 }
  ];

  const likeRanges = [
    { min: 50, max: 150 },
    { min: 150, max: 300 },
    { min: 300, max: 500 },
    { min: 500, max: 800 }
  ];

  // Generate varied images using different approaches
  const generateImageUrl = (index, style) => {
    // Use different image generation strategies for variety
    const strategies = [
      // Strategy 1: Use Picsum for random images with different seeds
      `https://picsum.photos/400/400?random=${authorId}${index}`,
      // Strategy 2: Use Unsplash for themed images
      `https://source.unsplash.com/400x400/?${style},art&sig=${authorId}${index}`,
      // Strategy 3: Use different color schemes with placeholder
      `https://via.placeholder.com/400x400/${getRandomColor()}/FFFFFF?text=${style.toUpperCase()}`,
      // Strategy 4: Use geometric patterns
      `https://dummyimage.com/400x400/${getRandomColor()}/${getRandomColor()}&text=${style}`,
      // Strategy 5: Use abstract art generators with blur
      `https://picsum.photos/400/400?random=${authorId}${index + 100}&blur=1`,
      // Strategy 6: Use different aspect ratios for variety
      `https://source.unsplash.com/400x400/?digital,${style}&sig=${authorId}${index + 200}`,
      // Strategy 7: Use more specific art styles
      `https://source.unsplash.com/400x400/?${style},painting&sig=${authorId}${index + 300}`,
      // Strategy 8: Use color-based patterns
      `https://via.placeholder.com/400x400/${getRandomColor()}/${getRandomColor()}&text=ART`
    ];
    
    return strategies[index % strategies.length];
  };

  const getRandomColor = () => {
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD', '98D8C8', 'F7DC6F', 'A8E6CF', 'FF8B94', 'FFD3B6', 'FFAAA5', 'B8E6B8', 'FFB6C1', '87CEEB', 'DDA0DD'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const generateRandomPrice = () => {
    const range = priceRanges[Math.floor(Math.random() * priceRanges.length)];
    return (Math.random() * (range.max - range.min) + range.min).toFixed(2);
  };

  const generateRandomLikes = () => {
    const range = likeRanges[Math.floor(Math.random() * likeRanges.length)];
    return Math.floor(Math.random() * (range.max - range.min) + range.min);
  };

  // Generate 8-12 varied NFT items
  const itemCount = 8 + Math.floor(Math.random() * 4);
  const items = [];

  for (let i = 0; i < itemCount; i++) {
    const style = nftStyles[Math.floor(Math.random() * nftStyles.length)];
    const title = nftTitles[Math.floor(Math.random() * nftTitles.length)];
    
    items.push({
      id: i + 1,
      title: `${title} #${String(i + 1).padStart(3, '0')}`,
      price: generateRandomPrice(),
      likes: generateRandomLikes(),
      image: generateImageUrl(i, style),
      authorImage: authorImage || AuthorImage, // Use the provided authorImage or fallback
      style: style,
      description: `A unique ${style} digital artwork created by the artist.`
    });
  }

  return items;
};

const AuthorItems = ({ authorId, authorImage }) => {
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        setLoading(true);
        
        // If no authorId is provided, show skeleton
        if (!authorId) {
          setLoading(true);
          return;
        }
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate varied, realistic mock data
        const mockItems = generateMockNFTItems(authorId, authorImage);
        
        setAuthorItems(mockItems);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching author items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [authorId, authorImage]);

  const handleImageError = (e) => {
    // Fallback to a different image if the generated one fails
    const fallbackImages = [
      'https://picsum.photos/400/400?random=1',
      'https://via.placeholder.com/400x400/6366f1/FFFFFF?text=NFT',
      'https://source.unsplash.com/400x400/?digital,art',
      'https://dummyimage.com/400x400/4ECDC4/FFFFFF&text=ART',
      nftImage
    ];
    
    const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    e.target.src = randomFallback;
  };

  // Show skeleton if loading or no authorId provided
  if (loading || !authorId) {
    return <AuthorItemsSkeleton />;
  }

  if (error) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="text-center">
            <p>Error loading author items: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorItems.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to="/item-details" 
                    state={{ 
                      nftData: {
                        id: item.id,
                        title: item.title,
                        description: 'doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                        image: item.image,
                        author: {
                          name: item.authorName || 'Unknown Author',
                          image: item.authorImage
                        },
                        owner: {
                          name: item.authorName || 'Unknown Owner',
                          image: item.authorImage
                        },
                        price: item.price,
                        views: '100',
                        likes: item.likes
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      className="lazy nft__item_preview"
                      alt={item.title}
                      onError={handleImageError}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link 
                    to="/item-details" 
                    state={{ 
                      nftData: {
                        id: item.id,
                        title: item.title,
                        description: 'doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                        image: item.image,
                        author: {
                          name: item.authorName || 'Unknown Author',
                          image: item.authorImage
                        },
                        owner: {
                          name: item.authorName || 'Unknown Owner',
                          image: item.authorImage
                        },
                        price: item.price,
                        views: '100',
                        likes: item.likes
                      }
                    }}
                  >
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
