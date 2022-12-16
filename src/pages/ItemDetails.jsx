import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import SkeletonItemsDetailsPage from "../components/UI/SkeletonItemDetailsPage";

const ItemDetails = () => {

  const { id } = useParams()
  const baseUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`;
  const [author, setAuthor] = useState([])
  const [loading, setLoading] = useState(true)

  async function getAuthorItem() {
    const { data } = await axios.get(`${baseUrl}`)
    setAuthor(data)
    setLoading(false)
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthorItem()
  }, []);

  return (
    //TEST
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">

            { loading ?
             <SkeletonItemsDetailsPage /> :
              <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={author.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{author.title} #{author.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {author.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {author.likes}
                    </div>
                  </div>
                  <p>
                    {author.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${author.ownerId}`}>
                            <img className="lazy" src={author.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${author.ownerId}`}>
                            {author.ownerName}
                          </Link>
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
                          <Link to={`/author/${author.creatorId}`}>
                            <img className="lazy" src={author.creatorImage} alt=""/>
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${author.creatorId}`}>
                            {author.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{author.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
