import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopSellers } from "../../API/nftAPI";
import AOS from "aos";


const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTopSellers();
        setSellers(data);
        AOS.refresh();
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  return (
    <section id="section-popular">
      <div className="container">
        <div className="text-center">
          <h2>Top Sellers</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <ol className="author_list">
          {sellers.map((seller) => (
            <li key={seller.id}>
              <div className="author_list_pp">
  <Link to={`/author/${seller.authorId}`}>
    <img
      src={seller.authorImage}
      alt={seller.authorName}
    />
    <i className="fa fa-check"></i>
  </Link>
</div>

              <div className="author_list_info">
                <Link to={`/author/${seller.authorId}`}>
                  {seller.authorName}
                </Link>
                <span>{seller.price} ETH</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default TopSellers;