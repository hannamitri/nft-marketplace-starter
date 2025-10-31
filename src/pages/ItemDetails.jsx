import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonAll from "../components/UI/SkeletonAll"; // ✅ Import adaptive skeleton
import AOS from 'aos';
import 'aos/dist/aos.css';

function ItemDetails() {
  
  const { nftId } = useParams(); // get nftId from the URL
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ add loading state

  async function fetchItem() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
    console.log(data);
    setItem(data);
    setTimeout(() => setLoading(false) ,200);
    
  }

  useEffect(() => {
    window.scrollTo(0, 0);
      // ✅ Initialize AOS
            AOS.init({
              duration: 2000, // animation duration (ms)
              once: true,     // whether animation should happen only once
              easing: "ease-in-out",
            })
        
              // Optional: refresh AOS if content updates dynamically
            AOS.refresh();
    fetchItem();
  }, [nftId]);

  // ✅ Skeleton loading layout
  if (loading) {
    return (
      <div id="wrapper" data-aos="zoom-in">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row align-items-start">

                {/* ✅ Left skeleton column (image placeholder) */}
                <div className="col-md-6 text-center">  
                      <SkeletonAll type="card" /> 
                </div>

                {/* ✅ Right skeleton column (text placeholders) */}
                <div className="col-md-6">
                  <div className="item_info">
                       {/* Title */}
                    <div className="mb-3">
                        <SkeletonAll type="title" />
                      </div>
                      {/* Views + Likes */}
                     <div className="d-flex gap-3 mb-4">
                        <SkeletonAll type="small" />
                        <SkeletonAll type="small" />
                      </div>
                      {/* Description */}
                       <div className="mb-4">
                        <SkeletonAll type="text" />
                      </div>

                       {/* Owner */}
                      <div className="mb-4">
                        <SkeletonAll type="Owner&Creator" />
                      </div>

                        {/* Creator */}
                      <div className="mb-4">
                        <SkeletonAll type="Owner&Creator" />
                      </div>

                     {/* Price */}
                      <div className="mt-3">
                        <SkeletonAll type="price" />
                      </div>
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
    <div id="wrapper" data-aos="zoom-in">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* Left image */}
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>

              {/* Right details */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {item.title} #{item.tag}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  {/* Owner */}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img
                              className="lazy"
                              src={item.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>
                            {item.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>

                  {/* Creator */}
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img
                              className="lazy"
                              src={item.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {/* ✅ Also link title properly */}
                          <Link to={`/author/${item.creatorId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>

                    {/* Price */}
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ItemDetails;
