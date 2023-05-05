import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useState } from "react";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";            
const ItemDetails = () => {
  const  {nftId} = useParams()

  const [items,setItems] = useState([])
  const getItems = async () => {
   const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
  setItems(data)
 console.log(data)
 }
 useEffect(() => {
   getItems()
   
 })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
          {Object.keys(items).length > 0 ? (

            <div className="row "  >
        

              <div className="col-md-6 text-center" >
                <img
                  src={items.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
           </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{items.title} #{items?.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {items.likes}
                    </div>
                  </div>
                  <p>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${items?.ownerId}`}>
                            <img className="lazy" src={items.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${items?.ownerId}`}>{items.ownerName}</Link>
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
                          <Link to={`/author/${items?.creatorId}`}>
                            <img className="lazy" src={items.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${items?.creatorId}`}>{items.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>{items.price}</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{items.price}</span>
                    </div>
                  </div>
                </div>
              
               

              </div>
  
            </div> 
            ) : (
              <>
             <div className="row "  >
        

        <div className="col-md-6 text-center" >
        
     <Skeleton  width="100%" height="400px" borderRadius={5} backgroundColor="#ECECEC"  />
   
    
     </div>
        <div className="col-md-6">
          <div className="item_info ">
          <Skeleton height="40px" width="250px" backgroundColor="#ECECEC" marginTop="15px"/>
<div className="d-flex mt-4 ">
  <div className="mr-4">
<Skeleton width="40px" height="30px" backgroundColor="#ECECEC"/></div>
          <Skeleton width="40px" height="30px" backgroundColor="#ECECEC" />
</div>
        
            <p>
            <Skeleton height="70px" width="320px" backgroundColor="#ECECEC" marginTop="20px"/>

            </p>
            <div className="d-flex flex-row">
              <div className="mr40">
                <div className="item_author">
                  <div className="author_list_pp">
                    <Link to="/author">
                    <Skeleton height="50px" width="50px" backgroundColor="#ECECEC" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                   <Skeleton height="17px" width="120px"  backgroundColor="#ECECEC"/>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="de_tab tab_simple">
              <div className="de_tab_content">
                <div className="item_author">
                  <div className="author_list_pp">
                    <Link to="/author">
                    <Skeleton height="50px" width="50px" backgroundColor="#ECECEC" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                  <Skeleton height="16px" width="120px"  backgroundColor="#ECECEC"/>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>
              <Skeleton width="100px" height="15px" backgroundColor="#ECECEC" />
              <div className="nft-item-price">

              </div>
            </div>
          </div>
        
         

        </div>

      </div>
              </>
              )}
           </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
