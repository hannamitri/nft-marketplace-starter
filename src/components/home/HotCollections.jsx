import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";


const HotCollections = () => {


  const [data, setData]  = useState()


useEffect(() => {
  
  const hotData =  axios.get(`${`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`}`).then((response) => {
    setData(response.data)
  })

  
},[])

  

console.log(data)




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
          {/* {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={AuthorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <span>ERC-192</span>
                </div>
              </div>
            </div>
          ))} */}

           {data?.map((items) => { 
            
            return (

              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={items?.id}>
             <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={items.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={items.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{items.title}</h4>
                  </Link>
                  <span>ERC-{items.code}</span>
                </div>
              </div>
            </div>
            )
            })
}
        </div>
      </div>
    </section>
    );
};


export default HotCollections;
