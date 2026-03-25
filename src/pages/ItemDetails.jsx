import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";

const ItemDetails = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItem = async () => {
      try {
        let url = "";

        if (type === "new") {
          url =
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
        } else if (type === "explore") {
          url =
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        } else {
          url =
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
        }

        const response = await fetch(url);
        const data = await response.json();

        const selectedItem = data.find(
          (item) => String(item.id) === String(id)
        );

        setItem(selectedItem || null);
      } catch (error) {
        console.log("DETAIL PAGE ERROR:", error);
      }
    };

    fetchItem();
  }, [type, id]);

  if (!item) {
    return <div className="container pt-5 mt-5">Loading...</div>;
  }

  const detailNumber =
    type === "new"
      ? [173, 495, 942, 129, 334, 221, 567][item.id - 1] || item.id
      : type === "hot"
      ? [194, 661, 164, 112, 68, 316][item.id - 1] || item.id
      : item.id;

  const ownerName =
    type === "new"
      ? [
          "Monica Lucas",
          "Kayla Brown",
          "Steven Doe",
          "Chris Cole",
          "Mia Lopez",
          "Anna Smith",
          "Leo Park",
        ][item.id - 1] || "Collection Owner"
      : type === "hot"
      ? [
          "Monica Lucas",
          "Gayle Hicks",
          "Jimmy Wright",
          "Anna Smith",
          "Chris Cole",
          "Mia Lopez",
        ][item.id - 1] || "Collection Owner"
      : item.title;

  const creatorName =
    type === "new"
      ? [
          "Nicholas Daniels",
          "Jimmy Wright",
          "Gayle Hicks",
          "Chris Cole",
          "Mia Lopez",
          "Anna Smith",
          "Leo Park",
        ][item.id - 1] || "Collection Creator"
      : type === "hot"
      ? [
          "Monica Lucas",
          "Jimmy Wright",
          "Gayle Hicks",
          "Anna Smith",
          "Chris Cole",
          "Mia Lopez",
        ][item.id - 1] || "Collection Creator"
      : item.title;

  const views =
    type === "new"
      ? [450, 120, 886, 310, 220, 540, 199][item.id - 1] || 100
      : type === "hot"
      ? [100, 886, 452, 321, 210, 543][item.id - 1] || 100
      : (item.likes || 70) + 30;

  const likes = item.likes || 74;
  const price = item.price || "1.85";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {item.title} #{detailNumber}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>

                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={item.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={item.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{creatorName}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;