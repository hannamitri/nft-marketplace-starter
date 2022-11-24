import React, {useState, useEffect, Component} from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import LoadingPlaceHolder from './LoadingPlaceHolder'
import { width } from "@mui/system";

const HotCollections = (props) => {

  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState()

  async function getHotCollection() {
   
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setLoading(true);
    setCollection(data)
    setLoading(false);
  }
  
  useEffect(() => {
    getHotCollection();
  }, [])


  const state = {
    responsive: {
      0: {
        items: 1,
      },
      577: {
        items: 2,
      },
      770: {
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


          

          {!loading ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={state.responsive}
            >
              {new Array(4).fill(0).map((_, index) => (

              <div key={index}>
              
              <div className="nft_coll" key={index}>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    {<LoadingPlaceHolder extraStyles={{height:'100%'}}/>}
                    
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                  {<LoadingPlaceHolder extraStyles={{height:'50px', width:'50px', borderRadius:'50%'}}/>}
                  </Link> 
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                  {<LoadingPlaceHolder extraStyles={{height:'15px', width:'100px', marginBottom: '16px', marginTop: '50px', borderRadius: '10px', marginLeft:'auto',  marginRight:'auto' }}/>}
                  </Link>
                  {<LoadingPlaceHolder extraStyles={{height:'15px', width:'80px', marginBottom: '16px', marginTop: '10px', borderRadius: '10px', marginLeft:'auto',  marginRight:'auto' }}/>}
                  </div>
              </div>
              
            </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={state.responsive}
            >
              {collection.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      
                      <Link to={`/author/${item.authorId}`} state={{ authorId: item.authorId }}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
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
