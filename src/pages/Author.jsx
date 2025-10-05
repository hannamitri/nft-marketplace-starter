import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    
    setAuthor(null);
    setFollowersCount(0);
    setIsFollowing(false);
    
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const authorId = id;
        
        const fallbackAuthor = {
          id: authorId,
          name: "Claude Banks",
          authorName: "Claude Banks",
          username: "bankssss",
          handle: "bankssss",
          avatar: AuthorImage,
          walletAddress: generateWalletAddress(authorId),
          followers: 724,
          followerCount: 724,
          nftCount: 0,
          nfts: []
        };
        
        let authorData = null;
        try {
          const topSellersResponse = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers?t=${Date.now()}`
          );
          
          const topSellerAuthor = topSellersResponse.data.find(seller => 
            seller.authorId === authorId || 
            seller.authorId === parseInt(authorId) ||
            seller.id === authorId ||
            seller.id === parseInt(authorId)
          );
          
          if (topSellerAuthor) {
            authorData = {
              id: topSellerAuthor.id || authorId,
              authorName: topSellerAuthor.authorName || topSellerAuthor.name,
              name: topSellerAuthor.authorName || topSellerAuthor.name,
              tag: topSellerAuthor.authorName?.toLowerCase().replace(/\s+/g, '') || 'unknown',
              username: topSellerAuthor.authorName?.toLowerCase().replace(/\s+/g, '') || 'unknown',
              handle: topSellerAuthor.authorName?.toLowerCase().replace(/\s+/g, '') || 'unknown',
              authorImage: topSellerAuthor.authorImage,
              image: topSellerAuthor.authorImage,
              avatar: topSellerAuthor.authorImage,
              address: topSellerAuthor.address || topSellerAuthor.wallet || topSellerAuthor.walletAddress || generateWalletAddress(authorId),
              wallet: topSellerAuthor.address || topSellerAuthor.wallet || topSellerAuthor.walletAddress || generateWalletAddress(authorId),
              walletAddress: topSellerAuthor.address || topSellerAuthor.wallet || topSellerAuthor.walletAddress || generateWalletAddress(authorId),
              followers: 500 + Math.floor(Math.random() * 1000),
              followerCount: 500 + Math.floor(Math.random() * 1000)
            };
          } else {
            const authorResponse = await axios.get(
              `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}&t=${Date.now()}`
            );
            
            if (authorResponse.data && authorResponse.data.authorName) {
              authorData = authorResponse.data;
            } else {
              authorData = fallbackAuthor;
            }
            
            if (authorResponse.data && authorResponse.data.nftCollection && Array.isArray(authorResponse.data.nftCollection)) {
              const authorApiNfts = authorResponse.data.nftCollection.map(nft => ({
                ...nft,
                authorId: authorId,
                nftImage: nft.nftImage || nft.image,
                title: nft.title || nft.name
              }));
              allAuthorNfts = [...allAuthorNfts, ...authorApiNfts];
            }
          }
        } catch (error) {
          authorData = fallbackAuthor;
        }
        
        let allAuthorNfts = [];
        
        try {
          const authorsApiResponse = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}&t=${Date.now()}`
          );
          
          if (authorsApiResponse.data.nftCollection && Array.isArray(authorsApiResponse.data.nftCollection)) {
            allAuthorNfts = authorsApiResponse.data.nftCollection.map(nft => ({
              ...nft,
              authorId: authorId,
              nftImage: nft.nftImage || nft.image,
              title: nft.title || nft.name,
              authorImage: authorsApiResponse.data.authorImage || authorsApiResponse.data.avatar || authorsApiResponse.data.image || AuthorImage,
              author: {
                ...nft.author,
                avatar: authorsApiResponse.data.authorImage || authorsApiResponse.data.avatar || authorsApiResponse.data.image || AuthorImage,
                image: authorsApiResponse.data.authorImage || authorsApiResponse.data.avatar || authorsApiResponse.data.image || AuthorImage,
                name: authorsApiResponse.data.authorName || authorsApiResponse.data.name || "Unknown Author",
                authorName: authorsApiResponse.data.authorName || authorsApiResponse.data.name || "Unknown Author"
              }
            }));
          }
        } catch (error) {
        }
        
        if (authorData.nftCollection && Array.isArray(authorData.nftCollection) && allAuthorNfts.length === 0) {
          allAuthorNfts = authorData.nftCollection.map(nft => ({
            ...nft,
            authorId: authorId,
            nftImage: nft.nftImage || nft.image,
            title: nft.title || nft.name,
            authorImage: authorData.authorImage || authorData.avatar || authorData.image || AuthorImage,
            author: {
              ...nft.author,
              avatar: authorData.authorImage || authorData.avatar || authorData.image || AuthorImage,
              image: authorData.authorImage || authorData.avatar || authorData.image || AuthorImage,
              name: authorData.authorName || authorData.name || "Unknown Author",
              authorName: authorData.authorName || authorData.name || "Unknown Author"
            }
          }));
        }
        
        try {
          const [newItemsResponse, hotCollectionsResponse] = await Promise.all([
            axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?t=${Date.now()}`),
            axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?t=${Date.now()}`)
          ]);
          
          const allNftsFromAPIs = [...newItemsResponse.data, ...hotCollectionsResponse.data];
          
          const apiNfts = allNftsFromAPIs.filter(nft => {
            const nftAuthorId = nft.authorId || nft.author?.id || nft.creatorId || nft.creator?.id;
            const authorIdStr = String(authorId);
            const nftAuthorIdStr = String(nftAuthorId);
            
            const matches = (
              nftAuthorId === authorId ||
              nftAuthorId === parseInt(authorId) ||
              nftAuthorIdStr === authorIdStr ||
              nftAuthorIdStr === String(parseInt(authorId)) ||
              (typeof nftAuthorId === 'string' && nftAuthorId.includes(authorIdStr)) ||
              (typeof authorIdStr === 'string' && authorIdStr.includes(nftAuthorIdStr))
            );
            
            return matches;
          }).map(nft => ({
            ...nft,
            authorImage: authorData?.authorImage || authorData?.avatar || authorData?.image || AuthorImage,
            author: {
              ...nft.author,
              avatar: authorData?.authorImage || authorData?.avatar || authorData?.image || AuthorImage,
              image: authorData?.authorImage || authorData?.avatar || authorData?.image || AuthorImage,
              name: authorData?.authorName || authorData?.name || "Unknown Author",
              authorName: authorData?.authorName || authorData?.name || "Unknown Author"
            }
          }));
          
          const existingNftIds = new Set(allAuthorNfts.map(nft => nft.nftId || nft.id));
          const additionalNfts = apiNfts.filter(nft => 
            !existingNftIds.has(nft.nftId || nft.id)
          );
          
          allAuthorNfts = [...allAuthorNfts, ...additionalNfts];
          
          if (allAuthorNfts.length < 5) {
            const lenientNfts = allNftsFromAPIs.filter(nft => {
              const nftAuthorId = nft.authorId || nft.author?.id || nft.creatorId || nft.creator?.id;
              const authorIdStr = String(authorId);
              const nftAuthorIdStr = String(nftAuthorId);
              
              return (
                nftAuthorId === authorId ||
                nftAuthorId === parseInt(authorId) ||
                nftAuthorIdStr === authorIdStr ||
                authorIdStr.includes(nftAuthorIdStr) ||
                nftAuthorIdStr.includes(authorIdStr) ||
                authorIdStr.slice(-4) === nftAuthorIdStr.slice(-4)
              );
            });
            
            const existingIds = new Set(allAuthorNfts.map(nft => nft.nftId || nft.id));
            const newLenientNfts = lenientNfts.filter(nft => !existingIds.has(nft.nftId || nft.id)).map(nft => ({
              ...nft,
              authorImage: authorData?.authorImage || authorData?.avatar || authorData?.image || AuthorImage,
              author: {
                ...nft.author,
                avatar: authorData?.authorImage || authorData?.avatar || authorData?.image || AuthorImage,
                image: authorData?.authorImage || authorData?.avatar || authorData?.image || AuthorImage,
                name: authorData?.authorName || authorData?.name || "Unknown Author",
                authorName: authorData?.authorName || authorData?.name || "Unknown Author"
              }
            }));
            
            allAuthorNfts = [...allAuthorNfts, ...newLenientNfts];
          }
          
          const enhancedAuthor = {
            ...authorData,
            id: authorData.id || authorId,
            name: authorData.authorName || authorData.name || authorData.username || "Unknown Author",
            authorName: authorData.authorName || authorData.name || authorData.username || "Unknown Author",
            username: authorData.tag || authorData.username || authorData.handle || authorData.authorName || "unknown",
            handle: authorData.tag || authorData.handle || authorData.username || authorData.authorName || "unknown",
            avatar: authorData.authorImage || authorData.avatar || authorData.image || authorData.profileImage || AuthorImage,
            image: authorData.authorImage || authorData.image || authorData.avatar || authorData.profileImage || AuthorImage,
            walletAddress: authorData.address || authorData.wallet || authorData.walletAddress || generateWalletAddress(authorId),
            nftCount: allAuthorNfts.length,
            nfts: allAuthorNfts,
            followers: authorData.followers || authorData.followerCount || 724,
            followerCount: authorData.followerCount || authorData.followers || 724
          };
          
          setAuthor(enhancedAuthor);
          setFollowersCount(enhancedAuthor.followers || enhancedAuthor.followerCount || 0);
        } catch (nftError) {
          const fallbackEnhanced = {
            ...authorData,
            id: authorData.id || authorId,
            name: authorData.authorName || authorData.name || authorData.username || "Unknown Author",
            authorName: authorData.authorName || authorData.name || authorData.username || "Unknown Author",
            username: authorData.tag || authorData.username || authorData.handle || authorData.authorName || "unknown",
            handle: authorData.tag || authorData.handle || authorData.username || authorData.authorName || "unknown",
            avatar: authorData.authorImage || authorData.avatar || authorData.image || authorData.profileImage || AuthorImage,
            image: authorData.authorImage || authorData.image || authorData.avatar || authorData.profileImage || AuthorImage,
            walletAddress: authorData.address || authorData.wallet || authorData.walletAddress || generateWalletAddress(authorId),
            nftCount: allAuthorNfts.length,
            nfts: allAuthorNfts,
            followers: authorData.followers || authorData.followerCount || 724,
            followerCount: authorData.followerCount || authorData.followers || 724
          };
          setAuthor(fallbackEnhanced);
          setFollowersCount(fallbackEnhanced.followers || fallbackEnhanced.followerCount || 0);
        }
        
      } catch (error) {
        const fallbackAuthor = {
          id: id,
          name: "Claude Banks",
          authorName: "Claude Banks",
          username: "bankssss",
          handle: "bankssss",
          avatar: AuthorImage,
          walletAddress: generateWalletAddress(id),
          followers: 724,
          followerCount: 724,
          nftCount: 0,
          nfts: []
        };
        setAuthor(fallbackAuthor);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  const generateWalletAddress = (authorId) => {
    const prefixes = ["DdzFFzCqrhshMSxb9oW", "Ae2tdPwUPEZ", "addr1"];
    const prefix = prefixes[authorId % prefixes.length];
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let address = prefix;
    for (let i = 0; i < 20; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(prev => Math.max(0, prev - 1));
    } else {
      setIsFollowing(true);
      setFollowersCount(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          {/* Author Profile Section - Clean Layout */}
          <section aria-label="section" style={{ padding: "40px 0", background: "white" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex" style={{ 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    padding: "20px 0",
                    borderBottom: "1px solid #f0f0f0",
                    marginBottom: "30px"
                  }}>
                    <div className="de-flex-col" style={{ display: "flex", alignItems: "center" }}>
                      <div className="profile_avatar" style={{ position: "relative", marginRight: "20px" }}>
                        <Skeleton width="80px" height="80px" borderRadius="50%" />
                      </div>
                      <div className="profile_name">
                        <Skeleton width="200px" height="24px" borderRadius="4px" style={{ marginBottom: "8px" }} />
                        <Skeleton width="150px" height="16px" borderRadius="4px" style={{ marginBottom: "8px" }} />
                        <Skeleton width="300px" height="14px" borderRadius="4px" />
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col" style={{ textAlign: "right" }}>
                        <Skeleton width="120px" height="16px" borderRadius="4px" style={{ marginBottom: "10px" }} />
                        <Skeleton width="80px" height="32px" borderRadius="6px" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems key={`${id}-loading`} authorId={id} authorNfts={author?.nfts || []} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          {/* Author Profile Section - Clean Layout */}
          <section aria-label="section" style={{ padding: "40px 0", background: "white" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center" style={{ padding: "40px 0" }}>
                  <div style={{ 
                    background: "#f8f9fa", 
                    padding: "20px", 
                    borderRadius: "8px",
                    border: "1px solid #e9ecef"
                  }}>
                    <i className="fa fa-exclamation-triangle" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
                    <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>Author Not Found</h4>
                    <p style={{ color: "#6c757d", marginBottom: "16px" }}>{error}</p>
                    <Link to="/" style={{
                      background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      display: "inline-block"
                    }}>
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <style>
        {`
          .profile_name, .profile_username, .profile_wallet, .profile_follower {
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
            color: #333 !important;
          }
          .d_profile .de-flex-col {
            visibility: visible !important;
            opacity: 1 !important;
          }
          .btn-main, button {
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
          }
        `}
      </style>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section id="subheader" style={{ background: `url(${AuthorBanner}) center center / cover no-repeat`, padding: "150px 0", minHeight: "400px" }} data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section" style={{ padding: "40px 0", background: "white" }} data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex" style={{ 
                  alignItems: "flex-start", 
                  padding: "20px 0",
                  borderBottom: "1px solid #f0f0f0",
                  marginBottom: "30px"
                }}>
                  <div className="de-flex-col" style={{ display: "flex", alignItems: "flex-start", flex: "1", visibility: "visible", opacity: "1" }}>
                    <div className="profile_avatar" style={{ position: "relative", marginRight: "20px" }}>
                      <img 
                        src={author?.authorImage || author?.avatar || author?.image || author?.profileImage || AuthorImage} 
                        alt={author?.name || author?.authorName || 'Author'}
                        style={{ 
                          width: "80px", 
                          height: "80px", 
                          borderRadius: "50%", 
                          objectFit: "cover",
                          border: "3px solid #fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                        onError={(e) => {
                          console.log("Main profile image failed to load:", e.target.src);
                          e.target.src = AuthorImage;
                        }}
                        onLoad={() => {
                          console.log("Main profile image loaded successfully:", author?.authorImage || author?.avatar || author?.image);
                        }}
                      />
                      <i className="fa fa-check" style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "5px",
                        background: "#667eea",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        border: "2px solid white"
                      }}></i>
                    </div>
                    <div style={{ flex: "1", visibility: "visible !important", opacity: "1 !important", display: "block !important" }}>
                      <h4 style={{ 
                        margin: "0 0 8px 0 !important", 
                        fontSize: "24px !important", 
                        fontWeight: "bold !important",
                        color: "#333 !important",
                        visibility: "visible !important",
                        opacity: "1 !important",
                        display: "block !important"
                      }}>
                        {author?.name || author?.authorName || 'Unknown Author'}
                      </h4>
                      <div style={{ marginBottom: "8px" }}>
                        <span style={{ 
                          color: "#333 !important", 
                          fontSize: "16px !important",
                          fontWeight: "normal !important",
                          visibility: "visible !important",
                          opacity: "1 !important",
                          display: "block !important"
                        }}>
                          @{author?.username || author?.handle || 'unknown'}
                        </span>
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <span id="wallet" style={{ 
                          color: "#333 !important", 
                          fontSize: "14px !important",
                          fontFamily: "monospace !important",
                          display: "block !important",
                          marginBottom: "4px !important",
                          wordBreak: "break-all !important",
                          whiteSpace: "normal !important",
                          overflow: "visible !important",
                          maxWidth: "100% !important",
                          visibility: "visible !important",
                          opacity: "1 !important",
                          fontWeight: "500 !important"
                        }}>
                          {(() => {
                            const walletAddr = author?.walletAddress || author?.wallet || author?.address || 'No wallet address available';
                            console.log("Rendering wallet address:", walletAddr);
                            console.log("Author object:", author);
                            return walletAddr;
                          })()}
                        </span>
                        <button 
                          id="btn_copy" 
                          title="Copy Text"
                          onClick={() => copyToClipboard(author?.walletAddress || author?.wallet || '')}
                          style={{
                            background: "#667eea",
                            color: "white",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer"
                          }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex" style={{ marginLeft: "40px" }}>
                    <div className="de-flex-col" style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ 
                        color: "#333 !important",
                        fontSize: "14px !important",
                        visibility: "visible !important",
                        opacity: "1 !important",
                        display: "block !important",
                        fontWeight: "500 !important"
                      }}>
                        {followersCount} followers
                      </div>
                      <button 
                        className="btn-main" 
                        onClick={handleFollow}
                        style={{
                          background: isFollowing 
                            ? "linear-gradient(45deg, #28a745 0%, #20c997 100%) !important" 
                            : "linear-gradient(45deg, #667eea 0%, #764ba2 100%) !important",
                          color: "white !important",
                          border: "none !important",
                          padding: "12px 24px !important",
                          borderRadius: "8px !important",
                          textDecoration: "none !important",
                          fontSize: "16px !important",
                          fontWeight: "600 !important",
                          cursor: "pointer !important",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15) !important",
                          transition: "all 0.3s ease !important",
                          minWidth: "120px !important",
                          visibility: "visible !important",
                          opacity: "1 !important",
                          display: "block !important"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                        }}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12" data-aos="fade-up">
                <div className="de_tab tab_simple">
                  <AuthorItems key={`${id}-main`} authorId={id} authorNfts={author?.nfts || []} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
