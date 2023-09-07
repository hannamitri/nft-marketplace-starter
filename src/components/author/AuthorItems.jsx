import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAuthor } from "../../api/author";
import NftCardAuthor from "../UI/NftCardAuthor";

const AuthorItems = () => {
  const { id } = useParams();
  const idNumber = parseInt(id, 10);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collections, setCollection] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const items = await getAuthor(idNumber);
      setLoading(true);
      setCollection(items.nftCollection);
      setItems(items);
    }
    setTimeout(() => {
      setLoading(false);
    }, 350);
    fetchData();
  }, [idNumber]);


  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {collections.map((collection) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={collection.id}
            >
              <NftCardAuthor
                item={items}
                loading={loading}
                collection={collection}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
