import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState} from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Skeleton from "../UI/Skeleton";


const HotCollections = () => {
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)

  async function getData(){
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    setLoading(false)
    setDetails(data)
  }
  useEffect(() => {
    getData()
  }, [])
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
            <Splide options={{
              perPage: 4,
              breakpoints: {
                1400: {
                  perPage: 3,
                },
                995: {
                  perPage: 2,
                },
                770: {
                  perPage: 1,
                }
              },
              type: "loop",
              perMove: 1,
              pagination: false,
              focus: 0,
            }}>
              {new Array(1).fill(0).map((_, index) => (
                (details.map(detail => (
                  
                  <SplideSlide>
                    {loading ? (
                      <Skeleton
                      width="18.5rem"
                      height="300px"
                      borderRadius="20px"
                      />
                    ) : (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                        <div className="nft_coll" style={{width: "18.5rem"}}>
                          <div className="nft_wrap">
                            <Link to={`/item-details/${detail.nftId}`}>
                              <img src={detail.nftImage} className="lazy img-fluid" alt="" />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${detail.authorId}`}>
                              <img className="lazy pp-coll" src={detail.authorImage} alt="" />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>{detail.title}</h4>
                            </Link>
                            <span>ERC-{detail.code}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </SplideSlide>
                )))
              ))}
            </Splide>
        </div>
      </div>
    </section>
  )
};

export default HotCollections;
