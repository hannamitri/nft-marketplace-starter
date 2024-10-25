import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import NFTCard from "../UI/NFTCard";
import SkeletonNFTCard from "../UI/SkeletonNFTCard";

const AuthorItems = ({data, loading}) => {

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (new Array(8).fill(0).map((_, index) => (
            <SkeletonNFTCard index={index} key={index} inSlider={false} />
          ))): (data.nftCollection.map((item, index) => (

            <NFTCard 
            key={index}
            authorId={data.authorId} 
            authorImage={data.authorImage} 
            expiryDate={undefined} 
            nftId={item.nftId} 
            nftImage={item.nftImage} 
            title={item.title} 
            price={item.price} 
            likes={item.likes} 
            index={index} 
            inSlider={false} />
          )))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
