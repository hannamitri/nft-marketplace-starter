import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";


const AuthorItems = () => {
const [text,setText]=useState([])
const {id} = useParams()
const [authorData, setAuthorData] = useState([]);
const [loading, setLoading] = useState(true)

useEffect(()=>{
  async function Items (){
    try { const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setText(data.nftCollection)
    setAuthorData(data);
   } catch (error) {
    console.error('cant fetch data')(error)
   } finally {
    setLoading(false)
   }
  }
  Items()
},[])

if (!text || !authorData) return <div></div>;
  
return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          { 
          loading ? Array.from ({length : 8}).map ((_,index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton circle height={50} width={50}/>
              </div>
              <div className="nft__item_wrap">
                <Skeleton height={200} width={250} />
                </div>
              
              
                <div className="nft__item_info">
                <Skeleton  width={100} />
                <Skeleton  width={50} />
                </div>
          </div>
          </div>
         ))  :
          Array.isArray(text) && text.slice(0, 8).map((random) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={random.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorData.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
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
                  <Link to={`/item-details/ ${random.nftId}`}>
                    <img
                      src={random.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/ ${random.nftId}`}>
                    <h4>{random.title}</h4>
                  </Link>
                  <div className="nft__item_price">{random.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{random.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
