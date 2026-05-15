import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { enrichWithAuthorData, topSellersUrl } from "../utils/authorUtils";

const Author = () => {
  const location = useLocation();
  const { id } = useParams();
  const [author, setAuthor] = useState(location.state?.author);
  const [authorItems, setAuthorItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    async function getAuthor() {
      if (location.state?.author) {
        setAuthor(location.state.author);
        return;
      }

      if (!id) {
        return;
      }

      try {
        const response = await axios.get(topSellersUrl);
        const matchingAuthor = response.data.find(seller => String(seller.authorId) === id);

        setAuthor(matchingAuthor);
      } catch (error) {
        console.error("Author API error:", error);
      }
    }

    getAuthor();
  }, [id, location.state]);

  useEffect(() => {
    async function getAuthorItems() {
      const authorId = author?.authorId || id;

      if (!authorId) {
        setItemsLoading(false);
        return;
      }

      try {
        setItemsLoading(true);
        const [newItemsResponse, hotCollectionsResponse, sellersResponse] = await Promise.all([
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"),
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"),
          axios.get(topSellersUrl),
        ]);

        const allItems = enrichWithAuthorData([
          ...newItemsResponse.data,
          ...hotCollectionsResponse.data,
        ], sellersResponse.data);

        setAuthorItems(
          allItems.filter(item => String(item.authorId) === String(authorId))
        );
      } catch (error) {
        console.error("Author items API error:", error);
      } finally {
        setItemsLoading(false);
      }
    }

    getAuthorItems();
  }, [author?.authorId, id]);

  const authorName = author?.authorName || (author?.authorId ? `Author #${author.authorId}` : "Monica Lucas");
  const authorImage = author?.authorImage || AuthorImage;
  const authorUsername = `@${authorName.toLowerCase().replaceAll(" ", "")}`;
  const bannerImage = authorItems[0]?.nftImage || AuthorBanner;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${bannerImage}) center / cover` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">{authorUsername}</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">573 followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} items={authorItems} loading={itemsLoading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
