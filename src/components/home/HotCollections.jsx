import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


const HotCollections = () => {
  const [posts, setPosts] = useState([]);

  async function fetchHotCollectionData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    setPosts(data);
  }

  useEffect(() => {
    fetchHotCollectionData();
  }, [])

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 10,
    },
  })

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
          <div ref={sliderRef} className="keen-slider">
            {posts.map((post) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide" key={post.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/` + post.nftId}>
                      <img src={post.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={post.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{post.title}</h4>
                    </Link>
                    <span>ERC-{post.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
