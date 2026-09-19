import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadItem = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        
        if (!res.ok) throw new Error("Network response was not ok");
        
        const data = await res.json();
        
        setItem({
          title: data.title || `NFT Item #${id}`,
          description: data.description || "No description provided.",
          image: data.nftImage || data.image,
          views: data.views ?? 0,
          likes: data.likes ?? 0,
          price: data.price ?? "—",
          ownerName: data.ownerName || data.owner || "Unknown Owner",
          ownerImage: data.ownerImage,
          ownerId: data.ownerId,
          creatorName: data.creatorName || data.creator || "Unknown Creator",
          creatorImage: data.creatorImage,
          creatorId: data.creatorId,
        });
      } catch (err) {
        console.error("Fetch error, using fallback item:", err);
        // Fallback so the screen never hangs on a spinner
        setItem({
          title: `Pinky Girl #${id}`,
          description: "Created by District-8, this exclusive item is part of the Ultraverse NFT collection.",
          image: "https://via.placeholder.com/400",
          views: 100,
          likes: 25,
          price: "2.5",
          ownerName: "Monica Lucas",
          ownerImage: "https://via.placeholder.com/50",
          ownerId: "1",
          creatorName: "District-8",
          creatorImage: "https://via.placeholder.com/50",
          creatorId: "2",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadItem();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "100px 20px", textCenter: "center", minHeight: "50vh" }}>
        <h2>Loading Item #{id}...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "100px 20px", minHeight: "60vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={item?.image}
              alt={item?.title}
              className="img-fluid img-rounded"
              style={{ maxHeight: "400px", borderRadius: "10px" }}
            />
          </div>

          <div className="col-md-6">
            <h2>{item?.title}</h2>
            <div className="mb-3">
              <span className="mr-3">👁 {item?.views} Views</span>
              <span>❤️ {item?.likes} Likes</span>
            </div>
            <p>{item?.description}</p>

            <div className="my-3">
              <h6>Owner</h6>
              <div className="d-flex align-items-center">
                <img
                  src={item?.ownerImage}
                  alt={item?.ownerName}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                />
                <Link to={`/author/${item?.ownerId || ''}`}>{item?.ownerName}</Link>
              </div>
            </div>

            <div className="my-3">
              <h6>Creator</h6>
              <div className="d-flex align-items-center">
                <img
                  src={item?.creatorImage}
                  alt={item?.creatorName}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                />
                <Link to={`/author/${item?.creatorId || ''}`}>{item?.creatorName}</Link>
              </div>
            </div>

            <div className="mt-4">
              <h6>Price</h6>
              <h4>{item?.price} ETH</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;


