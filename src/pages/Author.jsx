import React, {useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  },[id])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {loading ? (
          <Skeleton width='100%' height='360px'/>
        ) : (
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ 
            background: `url(${data.nftCollection[0].nftImage}) top`,
            backgroundSize: 'cover',
        }}
        ></section>
        )}


        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width='150px' height='150px' borderRadius='50%'/>

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width='100%' height='47px'/>
                            <span className="profile_username"><Skeleton width='100%' height='31px'/></span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width='200px' height='31px'/>
                            </span>

                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width='100px' height='26px'/>
                        <Skeleton width='123px' height='42px' borderRadius='4px'/>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={data.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {data.authorName}
                          <span className="profile_username">@{data.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {data.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy 
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{data.followers} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {loading ? (
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {new Array(8).fill(0).map((_, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                              <div className="nft__item">
                                <div className="author_list_pp">
                                  <div>
                                    <Skeleton width='50px' height='50px' borderRadius='50%'/>
                                    <i className="fa fa-check"></i>
                                  </div>
                                </div>
                                <div className="nft__item_wrap">
                                  <div className="nft__item_extra">
                                    <div className="nft__item_buttons">
                                      <button>Buy Now</button>
                                      <div className="nft__item_share">
                                        <h4>Share</h4>
                                        <a href="" target="_blank" rel="noreferrer">
                                          <i className="fa fa-facebook fa-lg"></i>
                                        </a>
                                        <a href="" target="_blank" rel="noreferrer">
                                          <i className="fa fa-twitter fa-lg"></i>
                                        </a>
                                        <a href="">
                                          <i className="fa fa-envelope fa-lg"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                    <Skeleton width='100%' height='100%' />
                                </div>
                                <div className="nft__item_info">
                                  <Skeleton width='100%' height='16px' />
                                  <Skeleton width='100%' height='16px' />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <AuthorItems data={data}/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
