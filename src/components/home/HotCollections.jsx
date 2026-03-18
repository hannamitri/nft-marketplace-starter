import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import { getHotCollections } from "../../API/nftAPI";
import AOS from "aos";



const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {



    const loadData = async () => {
      try {
        const data = await getHotCollections();


        setCollections(data || []);
        AOS.refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const options = {
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    responsive: {
  0: {
    items: 1
  },
  576: {
    items: 1
  },
  768: {
    items: 2
  },
  992: {
    items: 3
  },
  1200: {
    items: 4
  }
}
  };

  if (loading) return <div style={{ padding: 80 }}>Loading...</div>;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <OwlCarousel className="owl-theme" {...options}>
          {collections.map((item) => (
            <div className="item" 
            key={item.id}
            data-aos="zoom-in"
            >

              <div className="nft_coll">

                <div
  className="nft_wrap"
  style={{
    backgroundImage: `url(${item.nftImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  <Link
    to={`/item/${item.nftId}`}
    style={{
      display: "block",
      width: "100%",
      height: "100%",
      cursor: "pointer"
    }}
  >
    <span className="nft_coll_hover" />
  </Link>
</div>

                <div className="nft_coll_pp">
  <Link to={`/author/${item.authorId}`}>
    <img
      className="pp-coll"
      src={item.authorImage}
      alt={item.authorName}
    />
    <i className="fa fa-check"></i>
  </Link>
</div>

                <div className="nft_coll_info">
  <h4>{item.title}</h4>
  <span>ERC-{item.code}</span>
</div>

              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default HotCollections;