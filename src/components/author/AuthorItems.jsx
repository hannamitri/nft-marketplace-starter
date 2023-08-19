import React from "react";
import AuthorCards from "../reusable-components/AuthorCards";

const AuthorItems = ({ nftCollection }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
            <AuthorCards usersData={nftCollection} />
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
