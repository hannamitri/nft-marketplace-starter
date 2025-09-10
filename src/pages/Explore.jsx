import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const ItemDetailsInline = ({ item }) => {
  if (!item) return null;
  return (
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
              <h2>{item.title}</h2>
              <div className="item_info_counts">
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {item.views || Math.floor(Math.random() * 200) + 50}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {item.likes}
                </div>
              </div>
              <p>
                {`This unique NFT "${item.title}" is part of an exclusive collection featuring distinctive digital artwork.`}
              </p>
              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      {`Owner ${item.authorId?.toString().slice(-4) || ''}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="de_tab tab_simple">
                <div className="de_tab_content">
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      {`Artist ${item.authorId?.toString().slice(-4) || ''}`}
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <h6>Price</h6>
                <div className="nft-item-price">
                  <span>{item.price} ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Explore = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url(${SubHeader}) top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
        <ExploreItems onItemClick={setSelectedItem} />
            </div>
          </div>
        </section>
      {selectedItem && <ItemDetailsInline item={selectedItem} />}
      </div>
    </div>
  );
}

export default Explore;
