import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthorImage from '../../images/author_thumbnail.jpg';

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
        );
        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setSellers(dataArray);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  return (
    <section className="w-100 py-5 my-2">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row w-100 m-0">
          
          <div className="col-12 text-center mb-4">
            <h2 className="section-title">Top Sellers</h2>
          </div>

          <div className="col-12">
            {loading ? (
              <div className="text-center py-4 text-muted">Loading top sellers...</div>
            ) : (
              <div className="top-sellers-grid">
                {sellers.map((seller, index) => (
                  <Link 
                    key={seller.id || index} 
                    to={`/author/${seller.authorId || seller.id}`}
                    className="seller-item d-flex align-items-center p-3 border rounded-4 bg-white shadow-sm text-decoration-none text-dark h-100"
                  >
                    <div className="position-relative me-3">
                      <img
                        src={seller.authorImage || AuthorImage}
                        alt={seller.authorName || "Author"}
                        className="rounded-circle border border-2 border-white shadow-sm"
                        style={{ width: "55px", height: "55px", objectFit: "cover" }}
                      />
                      <i className="fa fa-check position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white"
                        style={{ width: "16px", height: "16px", fontSize: "8px" }}
                      ></i>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">{seller.authorName || "Author Name"}</h6>
                      <span className="text-muted small">{seller.price || seller.earned || "0"} ETH</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopSellers;