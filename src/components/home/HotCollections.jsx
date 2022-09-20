import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
  

const HotCollections = () => {


  const [data, setData] = useState([])

   useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    .then(response => {
    console.log(response.data)
      setData([...response.data])})
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
          {/* {new Array(4).fill(0).map((_, index) => ( */ data.map((data, index) => ( 
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                {/* <div>{JSON.stringify(data)}</div> */}
                {/* {data.map((item) => <div>{item.title</div>               )} */}
                <div></div>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={data.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={data.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{data.title}</h4>
                  </Link>
                  <span>{data.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <button onClick={getHotcollections}>testing</button> */}
      </div>
    </section>
  );
};

export default HotCollections;
