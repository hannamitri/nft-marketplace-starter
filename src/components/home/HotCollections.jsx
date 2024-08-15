import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from '../UI/Skeleton'

const HotCollections = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotCollections()
  }, [])

  async function fetchHotCollections() {
    try {
      const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
      setCollection(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    items: 4,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton height={200} width={"100%"}/>
                  </div>
                  <div className="nft_coll_pp">
                  <Skeleton height={50} width={50} borderRadius={100}/>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton height={20} width={100}/>
                  </div>
                   <Skeleton height={20} width={60}/>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel {...options}>
              {collection.map((data, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap" style={{ height: '100%' }}>
                      <Link to={`/item-details/${data.nftId}`}>
                        <img
                          src={data.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt={data.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${data.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={data.authorImage || AuthorImage}
                          alt={data.authorName}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{data.title}</h4>
                      </Link>
                      <span>ERC-{data.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
