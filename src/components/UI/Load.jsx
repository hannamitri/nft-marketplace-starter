import { useState } from "react";

const Load = (nbItem) => {
  const [numberItemsPagination, setNumberItemsPagination] = useState(nbItem);

  const loadItems = (arrayLength) => {
    const numberItems =
      numberItemsPagination + nbItem < arrayLength
        ? numberItemsPagination + nbItem
        : arrayLength;
    setNumberItemsPagination(numberItems);
  };

  

  return {
    numberItemsPagination,
    loadItems,
  };
};

export default Load;