import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemCard from "../components/UI/ItemCard";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getItem() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setItem(data);
    console.log(data);
    setLoading(false);
  }

  useEffect(() => {
    getItem();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <ItemCard
          creatorId={item.creatorId}
          creatorImg={item.creatorImage}
          creatorName={item.creatorName}
          desc={item.description}
          likes={item.likes}
          nftImg={item.nftImage}
          ownerId={item.ownerId}
          ownerImg={item.ownerImage}
          ownerName={item.ownerName}
          price={item.price}
          tag={item.tag}
          title={item.title}
          views={item.views}
          ethImage={EthImage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ItemDetails;
