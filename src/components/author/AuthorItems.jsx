import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ author }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {author.nftCollection.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <NftCard item={{ ...nft, authorImage: author.authorImage, authorId: author.authorId }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
