import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemDetail from "../components/utility/ItemDetail";
import ItemDetailsLoadingState from "../components/utility/ItemDetailsLoadingState";

const ItemDetails = () => {
  let {nftId} = useParams()
  const [itemDetailData, setItemDetailData] = useState([])
  const [loading, isLoading] = useState()

  const getItemData = async () => {
    isLoading(true)
    let {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
    setItemDetailData(data)
    setTimeout(()=> {
      isLoading(false)
    }, 2000)

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=> {
    getItemData()
  }, [])

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {
              !loading ? (<ItemDetail itemDetailData={itemDetailData}/>) : (<ItemDetailsLoadingState/>)
            }
            
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
