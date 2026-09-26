import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ItemDetails = () => {
  const params = useParams();
  const id = params.nftId || params.id || params.itemId;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) {
      setLoading(false);
      return;
    }

    const loadItem = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        setItem({
          id: data.id || id,
          title: data.title ?? `NFT Item #${id}`,
          description: data.description ?? "No description provided.",
          tag: data.tag ?? null,
          image: data.nftImage,
          views: data.views ?? 0,
          likes: data.likes ?? 0,
          price: data.price ?? "—",
          expiry: data.expiryDate ?? null,

          // API Key Fixes: ownerName and creatorName
          ownerName: data.ownerName ?? "Unknown Owner",
          ownerImage: data.ownerImage,
          ownerId: data.ownerId ?? null,

          creatorName: data.creatorName ?? "Unknown Creator",
          creatorImage: data.creatorImage,
          creatorId: data.creatorId ?? null,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "100px 20px" }}>
        <div className="row">
          <div className="col-md-6 text-center">
            <div
              className="skeleton-box"
              style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            ></div>
          </div>
          <div className="col-md-6">
            <div
              className="skeleton-box"
              style={{ width: "60%", height: "30px", marginBottom: "20px" }}
            ></div>
            <div
              className="skeleton-box"
              style={{ width: "40%", height: "20px", marginBottom: "20px" }}
            ></div>
            <div
              className="skeleton-box"
              style={{ width: "100%", height: "80px", marginBottom: "30px" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container text-center" style={{ padding: "100px 20px" }}>
        <h3>Item details could not be loaded.</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "100px 20px", minHeight: "60vh" }}>
      <div className="container">
        <div className="row">
          {/* LEFT IMAGE */}
          <div className="col-md-6 text-center">
            <img
              src={item.image}
              alt={item.title}
              className="img-fluid img-rounded"
              style={{ maxHeight: "400px", borderRadius: "10px" }}
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="col-md-6">
            <h2>{item.title}</h2>

            <div className="mb-3">
              <span className="mr-3">👁 {item.views} Views</span>
              <span>❤️ {item.likes} Likes</span>
            </div>

            <p>{item.description}</p>

            {/* OWNER */}
            <div className="my-3">
              <h6>Owner</h6>
              <div className="d-flex align-items-center">
                <img
                  src={item.ownerImage}
                  alt={item.ownerName}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <Link to={`/author/${item.ownerId || ""}`}>
                  {item.ownerName}
                </Link>
              </div>
            </div>

            {/* CREATOR */}
            <div className="my-3">
              <h6>Creator</h6>
              <div className="d-flex align-items-center">
                <img
                  src={item.creatorImage}
                  alt={item.creatorName}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <Link to={`/author/${item.creatorId || ""}`}>
                  {item.creatorName}
                </Link>
              </div>
            </div>

            {/* PRICE */}
            <div className="mt-4">
              <h6>Price</h6>
              <h4>{item.price} ETH</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;




