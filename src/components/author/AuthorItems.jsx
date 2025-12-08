import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Card from "../UI/Card";

const AuthorItems = ({authorCollection}) => {

  const collection = authorCollection.nftCollection || []

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          <Card collection={collection} authImage={authorCollection.authorImage} setViewLimit={8}/>
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
