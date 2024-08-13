import { useState } from "react";

const LoadMore = (nbItem) => {
  const [numberItemsPagination, setNumberItemsPagination] = useState(nbItem);

  const loadMoreItems = (arrayLength) => {
    const numberItems =
      numberItemsPagination + nbItem < arrayLength
        ? numberItemsPagination + nbItem
        : arrayLength;
    setNumberItemsPagination(numberItems);
  };



  return {
    numberItemsPagination,
    loadMoreItems,
  };
};

export default LoadMore;