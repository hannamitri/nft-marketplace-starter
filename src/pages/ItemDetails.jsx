import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading,setLoading] = useState(true)
  const [getdata,setgetdata] = useState([])
  const { id } = useParams();
  
  useEffect(()=>{
    async function GetData(){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
    setgetdata(data)
    setLoading(false)
  }
  GetData()
  },[id])

  if(loading){
    return(
    <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                <div className="gray" style={{height:"40rem",width:"32rem"}}></div>
                  
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                  <div className="gray-background-nameauthor" style={{ marginBottom: "1rem",width:"20rem",height:"2rem" }}></div>
  
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                      
                      </div>
                    </div>
                    <div className="gray-background-nameauthor" style={{marginBottom:"0.6rem",width:"20rem",height:"1rem" }}></div>
                    <div className="gray-background-nameauthor" style={{marginBottom:"0.6rem",width:"20rem",height:"1rem" }}></div>
                    <div className="gray-background-nameauthor" style={{marginBottom:"0.6rem",width:"10rem",height:"1rem" }}></div>

                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                          <div className="gray-background-nameauthor" style={{width:"3rem",height:"3rem",borderRadius:"50%" }}></div>
                          </div>
                          <div className="author_list_info">
                          <div className="gray-background-nameauthor" style={{width:"8rem",height:"1rem"}}></div>
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
                          <div className="gray-background-nameauthor" style={{width:"3rem",height:"3rem",borderRadius:"50%" }}></div>
                          </div>
                          <div className="author_list_info">
                          <div className="gray-background-nameauthor" style={{width:"8rem",height:"1rem"}}></div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    
    ) 
  }

  console.log(getdata)
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={getdata.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{getdata.title} #{getdata.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {getdata.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {getdata.likes}
                    </div>
                  </div>
                  <p>
                   {getdata.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/authors/${getdata.ownerId}`}>
                            <img className="lazy" src={getdata.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/authors/${getdata.ownerId}`}>{getdata.ownerName}</Link>
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
                          <Link to={`/authors/${getdata.creatorId}`}>
                            <img className="lazy" src={getdata.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/authors/${getdata.creatorId}`}>{getdata.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{getdata.price}</span>
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
