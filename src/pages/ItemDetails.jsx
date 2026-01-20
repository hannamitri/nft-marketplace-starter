import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
const { id } = useParams();
const [item, setItem] = useState(null)

useEffect(() => {
window.scrollTo(0, 0);

async function fetchData() {
const response = await axios.get('/newItems')
const allItems = response.data;
const foundItem = allItems.find((item) => item.id === Number(id));

setItem(foundItem);
}
fetchData();
}, [id]);




return (
<div id="wrapper">
{item ? (
<div className="no-bottom no-top" id="content" key = {item.id}>
<div id="top"></div>
<section aria-label="section" className="mt90 sm-mt-0">
<div className="container">
<div className="row">
<div className="col-md-6 text-center">
  <img
    src={item.nftImage}
    className="img-fluid img-rounded mb-sm-30 nft-image"
    alt=""
  />
  
  </div>


<div className="col-md-6">
  <div className="item_info">
    <h2>{item.title} #{item.code}</h2>

    <div className="item_info_counts">
      <div className="item_info_views">
        <i className="fa fa-eye"></i>
        100
      </div>
      <div className="item_info_like">
        <i className="fa fa-heart"></i>
        {item.likes}
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
            <Link to={`/author/${item.id}`}>
              <img className="lazy" src={item.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${item.id}`}>Monica Lucas</Link>
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
            <Link to={`/author/${item.id}`}>
              <img className="lazy" src={item.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${item.id}`}>Monica Lucas</Link>
          </div>
        </div>
      </div>
      <div className="spacer-40"></div>
      <h6>Price</h6>
      <div className="nft-item-price">
        <img src={EthImage} alt="" />
        <span>{item.price}</span>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</section>
</div>

):( <p>Loading...</p>)
}
</div>

)
};

export default ItemDetails;
