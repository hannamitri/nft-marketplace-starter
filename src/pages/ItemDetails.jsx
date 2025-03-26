import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";


const ItemDetails = () => {
  const [unit, setUnit] = useState([])
  const {nftId} = useParams()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect (()=> {
    async function items () {
      try {
const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
setUnit(data)
    }
    catch(error) {
      console.error('data not here :)', error)
    }
    finally {
      setLoading(false)
    }

    }
    items()
  },[nftId])

  return (
    
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? ( <Skeleton height={500} width={500}/> ) : ( <img
                  src={unit.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                 {loading ? (<Skeleton width={350} height={50}/>) : (<h2>{unit.title} #{unit.tag}</h2>)}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? (<Skeleton width={20}/>)
                       : unit.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? (<Skeleton width={20}/> ) 
                      : unit.likes}
                    </div>
                  </div>
                  <p>
                    { loading ? (<Skeleton count ={3}/> )
                     : unit.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/ ${unit.ownerId}`}>
                             {loading ? (<Skeleton circle height={50} width={50} style={{margin : 'auto'}}/>) 
                             : <img className="lazy" src={unit.ownerImage} alt="" />}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/ ${unit.ownerId}`}>{ loading ? (<Skeleton width={100}/>) : unit.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/ ${unit.creatorId}`}>
                           {loading ? (<Skeleton circle height={50} width={50} style={{margin:'auto'}}/>) 
                           : <img className="lazy" src={unit.creatorImage} alt="" />}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/ ${unit.creatorId}`}>{loading ? (<Skeleton width={100}/>) 
                          : unit.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{ loading ? (<Skeleton width={70}/>) : unit.price}</span>
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
};

export default ItemDetails;
