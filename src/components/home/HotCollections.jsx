import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ItemDetails from "../../pages/ItemDetails";
import Carousel from "./Carousel";
// const HotCollections = () => {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
  //     .then(response => {
  //       // Handle the successful response
  //       console.log(`wetlkntngwerb ajks.fnwejklsbfnerwejklrsfnmdoipaeklwjnrfmdoiweakr.hsfgneljrst,.fndipoejklw4fniuwe,.`)
  //       setData(response.data)
  //     })
  //     .catch(error => {
  //       // Handle the error
  //       console.error(`the error is ${error}`);
  //     });
  //   }, [])

const HotCollections = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then(response => {
        // Handle the successful response
        console.log(response.data)
        setData(response.data)
      })
      .catch(error => {
        // Handle the error
        console.error(`the error is ${error}`);
      });
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
          <Carousel></Carousel>
          {/* {data.map((element, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${element.nftId}`}>
                    <img src={element.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={element.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{element.title}</h4>
                  </Link>
                  <span>ERC-{element.code}</span>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;


                  {/* <Link to={{ pathname: `/item-details/${element.nftId}`, state: { data: element } }}></Link> */}
