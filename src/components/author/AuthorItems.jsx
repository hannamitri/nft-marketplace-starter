import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AuthorItems = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

        const data = res.data?.data || res.data || [];

       
        const foundAuthor = data.find(
          (seller) => String(seller.authorId) === String(id)
        );

        setAuthor(foundAuthor);

      
        const filtered = data.filter(
          (item) => String(item.authorId) === String(id)
        );

        setNfts(filtered);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!author) return <div>No author found</div>;

  return (
    <div className="de_tab_content">
      
      
      <div className="text-center mb-4">
        <img
          className="pp-author"
          src={author.authorImage}
          alt={author.authorName}
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <h2>{author.authorName}</h2>
        <p>{author.price} ETH</p>
      </div>

      
      <div className="row">
        {nfts.map((item) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6"
            key={item.id}
          >
            <div className="nft__item">
              <div className="nft__item_info">
                <h4>{item.authorName}</h4>
                <div>{item.price} ETH</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AuthorItems;