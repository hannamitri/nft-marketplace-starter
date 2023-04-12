import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/HotCollections.css"

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    ImgAndItemsdata()
  }, []);

  const { authorId } = useParams()

  // const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState([])

  let url = [
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?authorId=${authorId}`,
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?authorId=${authorId}`
  ]
  const request = url.map((url) => axios.get(url))


  function ImgAndItemsdata() {
    axios.all(request).then((response) => {
      response.forEach((resp) => {
        const {data} = resp
        setInfo(data)
        console.log(data)
      })
    })
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
                {
                  info.map(info => (
                    new Array(1).slice(0,2).fill(1).map((_,index) => (
              <div className="col-md-6 text-center">
                <img
                  src={info.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                  >
                </img>
                <div className="item_info">
                  <h2>{info.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      74
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
                          <Link to="/author">
                            <img className="lazy" src={info.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Monica Lucas</Link>
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
                          <Link to="/author">
                            <img className="lazy" src={info.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Monica Lucas</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{info.price}</span>
                    </div>
                  </div>
                </div>
              </div>
                  ))
                ))
              }
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
