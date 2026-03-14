import React from "react";
import NftCard from "../UI/NftCard";
import { useParams } from "react-router-dom";

const AuthorItems = ({ data, authorImage }) => {
  const { authId } = useParams();
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!data
            ? new Array(8).fill(0).map((_, id) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={id}>
                  <NftCard data={null} />
                </div>
              ))
            : data.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <NftCard data={item} authorImage={authorImage} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
