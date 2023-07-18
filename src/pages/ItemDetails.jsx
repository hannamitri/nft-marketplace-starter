import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
const ItemDetails = (props) => {
  const { nftId } = useParams();
  console.log(nftId)
 
  const [data, setData] = useState([]);
  let [fin, setFin] = useState(null);
  useEffect(() => {
    console.log("PLEASE DO THIS FOR ME")
  }, [])
  

  
  console.log("BIG REVEAL TIMEEEE")
  console.log(data)

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={fin.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{fin.title} #194</h2>

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
                            <img className="lazy" src={AuthorImage} alt="" />
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
                            <img className="lazy" src={fin.authorImage} alt="" />
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
                      <span>1.85</span>
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




  // useEffect(() => {
  //     async function fetchData () {
  //       console.log("run or no")
  //       await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
  //       .then(response => {
  //         // Handle the successful response
  //         console.log(`victory`)
  //         setData(response.data)
  //       })
  //       .catch(error => {
  //         // Handle the error
  //         console.error(`the error is ${error}`);
  //       });
  //     }
  //     fetchData();
  //   }, [])
  //   console.log("BIG REVEAL")
  //   console.log(data);

      // useEffect(() => {
    //   // Filter the data and update 'fin' when 'data' changes
    //   if (data.length > 0) {
    //     let filteredData = data.filter(element => element.nftId == nftId);
    //     setFin(filteredData[0]);
    //   }
    // }, [data, nftId]);
  
    // Render loading state or actual content based on whether 'fin' is null or not
    // if (!fin) {
    //   return <div>Loading...</div>;
    // }
    // fin = data.filter(element => element.nftId == nftId);
    // fin = fin[0];
    // console.log(fin);

     // useEffect(() => {
  //   console.log("HELELELLEL EL")
  //   window.scrollTo(0, 0);
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     console.log("run or no")
  //     try {
  //       const response = await axios.get(
  //         "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
  //       );
  //       console.log("victory")
  //       setData(response.data);
  //     } catch (error) {
  //       // Handle the error
  //       console.error("the error is", error);
  //     }
  //   }
  //   fetchData();
  // }, []);