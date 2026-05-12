import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { nftId }  = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    axios 
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [nftId]);

 if (!loading && !item) {
  return <div className="text-center mt-90">Item not found</div>;
}

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width={100} height={100} borderRadius={8} className="aspect-sqaure" />
                ) : (
                    <img
                      src={item?.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{loading ? <Skeleton width={300} height={40} /> : item.title}</h2>
                  
                  <div className="item_info_counts">
                    {loading ? (
                      <Skeleton width={150} height={25} />
                    ) : (
                    <>
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item?.likes}
                    </div>
                    </>
                    )}
                  </div>
                  {loading ? (
                    <Skeleton width={100} height={20} />
                  ) : (
                    <>
                      <p>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                    </>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width={50} height={50} borderRadius={50} />
                          ) : (
                            <Link to={`/author/${item?.authorId}`}>
                            <img className="lazy" src={item?.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                          )}
                        </div>
                        {loading ? (
                          <Skeleton width={100} height={20} />
                        ) : (
                          <>
                            <div className="author_list_info">
                              <Link to="/author">Monica Lucas</Link>
                            </div>
                          </>
                        )}                      
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width={50} height={50} borderRadius={50} />
                          ) : (
                            <>
                              <Link to="/author">
                                <img className="lazy" src={item?.authorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>  
                            </>
                            )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={100} height={20} />
                          ) : (
                            <> 
                              <Link to="/author">Monica Lucas</Link>  
                            </>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width={100} height={30} />
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{item?.price}</span>
                        </>
                      )}
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
