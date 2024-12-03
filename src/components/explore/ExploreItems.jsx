import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'

const ExploreItems = () => {

  const [getdata, setgetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [LoadMore, setLoadMore] = useState(8);
  const [Display, setDisplay] = useState(true);
  const [newgetdata, setNewGetData] = useState([]);
  const [value,setValue] = useState("")

  useEffect(() => {
    if(value === "price_low_to_high" || value === "price_high_to_low" || value === "likes_high_to_low"){
    async function GetData(){
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`);
      setgetData(data);
      setLoading(false);
      console.log(value)
      console.log(getdata)
    }
    GetData()
  } 
  else{
      async function GetData() {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
      setgetData(data);
      setLoading(false);
      console.log("default")
     
    }
    GetData();
    }
    
  }, [value]);

  useEffect(() => {
    setNewGetData([]);
    setLoadMore(8);
    setDisplay(true);
    setLoading(true)
  }, [value]);


    function ChangeValue(e){
    setValue(e)
  }


  useEffect(() => {
      setNewGetData((prevData) => {
          const newData = [...prevData, ...getdata.slice(prevData.length, LoadMore)];
        console.log(newData)
        console.log(LoadMore)
        return newData;
      });
    
   
  }, [getdata,LoadMore]);



  function ClickLoadMore() {
    setLoadMore((number) => number + 4);
    if (LoadMore >= getdata.length - 4) {
      setDisplay(false);
    }
  }

  if (loading) {
    return (
      <div className="Container-gray">
        {new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                </Link>
              </div>
              <div className="de_countdown">5h 30m 32s</div>

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
                <Link to="/item-details">
                  <div className="gray" alt=""></div>
                </Link>

              </div>
              <div className="gray-background-nameauthor" style={{ marginBottom: "1rem" }}></div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <div style={{ backgroundColor: "#E9E9E9", width: "3rem", height: "1rem" }}></div>
                </Link>
                <div className="nft__item_price"></div>
                <div className="nft__item_like">
                  <div style={{ backgroundColor: "#E9E9E9", width: "1rem", height: "1rem" }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        <select onChange={(event) => ChangeValue(event.target.value)} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {newgetdata.map((elem) => (
        <div
          key={elem.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={elem.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">5h 30m 32s</div>

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
              <Link to="/item-details">
                <img src={elem.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{elem.title}</h4>
              </Link>
              <div className="nft__item_price">{elem.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{elem.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {Display && <div className="col-md-12 text-center">
        <button onClick={ClickLoadMore} id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>}
    </>
  );
};

export default ExploreItems;
