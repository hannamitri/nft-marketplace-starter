import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorInfo from "../components/author/AuthorInfo";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAuthor() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setLoading(false);
  }

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <AuthorInfo
                address={author.address}
                authImg={author.authorImage}
                authName={author.authorName}
                followers={author.followers}
                tag={author.tag}
                loading={loading}
              />

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nfts={author.nftCollection}
                    authImg={author.authorImage}
                    loading={loading}
                  />
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
