import React from "react";
import Skeleton from "./Skeleton";

const TopSkeleton = () => {
  return (
    <li>
      <div className="author_list_pp">
        <div to="/author">
          <Skeleton className="lazy pp-author"
          width={50}
          height={50}
          borderRadius={9999}/>
          <i className="fa fa-check"></i>
        </div>
      </div>
      <div className="author_list_info">
        <div to="/author">
        <Skeleton 
        width={120}
        height={16}
        borderRadius={4}
        /></div>
        <span>
            <Skeleton 
            width={35}
            height={12}
            borderRadius={4}/>
        </span>
      </div>
    </li>
  );
};

export default TopSkeleton;
