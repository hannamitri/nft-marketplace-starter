import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useParams } from 'react-router-dom';
import axios from "axios";

const AuthorItems = ({profile}) => {
  const [getdata,setGetData] = useState([])
  const [loading,setLoading] = useState(true)

  const { id } = useParams();
  
  useEffect(()=>{
     async function GetData(id){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setGetData(data.nftCollection)
    setLoading(false)
  }
  GetData(id)
},[id])

if(loading)
  return(
  <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
  {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="gray" style={{height:"3rem",width:"3rem",borderRadius:"50%",marginBottom:"2rem"}}></div>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                    </div>
                  </div>
                  
                    <div  className="gray" alt=""></div>
                </div>
                <div className="nft__item_info">
                  <div className="gray-background-nameauthor" style={{ marginBottom: "1rem" }}></div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}

</div>
</div>
</div>
)

console.log(getdata)

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        
          {getdata.map((elem) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={profile} alt="" />
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
                  <Link to={`/item-details/${elem.nftId}`}>
                    <img
                      src={elem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${elem.nftId}`}>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
