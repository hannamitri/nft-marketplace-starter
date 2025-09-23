import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";
import NftImageFallback from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await res.json();
        if (isMounted) setItems(Array.isArray(data) ? data : []);
      } catch {
        if (isMounted) setItems([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const item = useMemo(
    () => items.find((x) => String(x?.nftId) === String(id)),
    [items, id]
  );

  const coverSrc = item?.nftImage || NftImageFallback;
  const avatarSrc = item?.authorImage || AuthorImageFallback;
  const title = item?.title ? `${item.title} #${id}` : `Rainbow Style #${id}`;
  const authorId = item?.authorId || id;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={coverSrc}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item?.views ?? 100}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item?.likes ?? 74}
                    </div>
                  </div>

                  <p>
                    {item?.description ||
                      "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${authorId}`}>
                            <img className="lazy" src={avatarSrc} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${authorId}`}>{item?.author || "Monica Lucas"}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${authorId}`}>
                            <img className="lazy" src={avatarSrc} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${authorId}`}>{item?.author || "Monica Lucas"}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item?.price ?? 1.85}</span>
                    </div>
                  </div>

                  {loading && (
                    <div style={{ opacity: 0.6, fontSize: 14 }}>Loading…</div>
                  )}
                  {!loading && !item && (
                    <div style={{ opacity: 0.8, fontSize: 14 }}>
                      Item not found for id {id}.
                    </div>
                  )}
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

