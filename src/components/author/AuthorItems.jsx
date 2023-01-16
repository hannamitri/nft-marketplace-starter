import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NftColl from "../UI/NftColl";

const AuthorItems = ({ data, authId, authImg }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])


  return (
    <div className="de_tab_content">
    <div className="tab-1">
    <div className="row">
      {data?.map((data) => (
      <NftColl
      key={data.id}
      data={data}
      authorId={authId}
      authorImage={authImg}/>
      ))}
      </div>
      </div>
    </div>
  );
};

export default AuthorItems;