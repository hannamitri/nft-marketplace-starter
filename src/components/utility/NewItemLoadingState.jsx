import React from "react";
import Skeleton from "../UI/Skeleton";

function NewItemLoadingState() {
  return (
    <Skeleton className="nft__item" width={300} height={440}/>
  );
}

export default NewItemLoadingState;
