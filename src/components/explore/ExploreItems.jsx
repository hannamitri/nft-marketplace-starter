import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../home/Countdown";
import Skeleton from "../UI/Skeleton";
import SkeletonItems from "./SkeletonItems";
import AOS from "aos";
import "aos/dist/aos.css"

const ExploreItems = () => {

  const [items,setItems] = useState([])
  const [visible,setVisible] = useState(8)
  const [filterTextValue,updateFilterText] = useState("Default")
  const [newItemList,updateItemList] = useState(items)
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    AOS.init({duration:1800})
    },[])

const getDefaultItems = async () => {
const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
setItems(data)

}

async function filterItems(filter) {
  setLoading(true)
  const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
setItems(data)
setLoading(false)
}



let filteredItemsList = newItemList.filter((item) => {
  
  
  if(filterTextValue ==="price_low_to_high") {
    return filterItems("price_low_to_high")
  }

  if(filterTextValue==="price_high_to_low") {
    return filterItems("price_high_to_low")
  }

  if(filterTextValue==="likes_high_to_low") {
    return filterItems("likes_high_to_low")
  } 

return (
  <div>
    {!loading ? <filteredItemsList /> : <SkeletonItems /> }

  </div>
)

  
})



function onChangeItems (event) {
  filterItems(event.target.value)
}





const loadMore = () => {
  setVisible(visible + 4)
}

useEffect(() => {
  getDefaultItems()
},[])

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <Arrow />,
  prevArrow: <Arrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
        
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style ,display: "block", background: "#CECECE", borderRadius:"60%", right: "1%",width:"30px", height:"30px", textAlign:"center" ,paddingTop:"6px"}}
      onClick={onClick}
    />
  );
}


  return (
    < >
      <div  data-aos="fade-up" >
        <select id="filter-items" defaultValue="" onChange={onChangeItems} >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {
      items.length > 0?
      (items.slice(0,visible).map((item, index) => (
        <div
        data-aos="fade-up"
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div >
            {item?.expiryDate && <Countdown item={item} /> }
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
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item?.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{item?.title}</h4>
              </Link>
              <div className="nft__item_price">{item?.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item?.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))
      ) : (<>
       <SkeletonItems />
       </>)}


      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" 
        onClick={() => {loadMore()}}
        className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
