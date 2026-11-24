import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchTopSellers() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        if (!response.ok) {
          throw new Error("Failed to fetch top sellers");
        }
        const data = await response.json();
        console.log("Fetched top sellers:", data);
        if (!Array.isArray(data)) {
          throw new Error("Unexpected API response")
        }
        if (active) {
          setSellers(data);
        }
      } catch (err) {
        console.error("Error fetching top sellers:", err);
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    fetchTopSellers();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                Array.from({ length: 12 }).map((_, index) => 
                <Skeleton key={index} />)
              ) : error ? (
                <li>{error}</li>
              ) : sellers.length === 0 ? (
                <li>No sellers found.</li>
              ) : (
              sellers.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))
            )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
