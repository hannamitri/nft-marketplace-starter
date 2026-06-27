import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewItem from "../home/NewItem";
import Skeleton from "../UI/Skeleton";

const AuthorItems = () => {
  const [authorItems, setAuthorItems] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();

  useEffect(() => {
    async function getAuthorItems() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      );
      setAuthor(data);
      return data;
    }

    async function load() {
      const results = await getAuthorItems();
      setAuthorItems(results.nftCollection);
      setLoading(false);
    }
    load();
  }, [authorId]);
  

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, i) => (
                <div
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ backgroundSize: "cover", display: "block" }}
                  key={i}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown">
                      <Skeleton width="80px" height="20px" />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton
                        width="20px"
                        height="20px"
                        borderRadius="10px"
                      />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton
                        width="120px"
                        height="20px"
                        style={{ marginBottom: "10px" }}
                      />
                      <div className="nft__item_price">
                        <Skeleton width="80px" height="20px" />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width="30px" height="20px" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : authorItems.map((item) => (
                <NewItem
                  item={item}
                  author={author}
                  style={{
                    display: "block",
                  }}
                  key={item.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
