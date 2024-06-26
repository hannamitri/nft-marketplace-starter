import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  async function fetchData() {
    const { data } =
      await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}
    `);
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  });

  function authorSkeleton() {
    return (
      <div className="author-skel-wrapper">
        <div className="author-skel-wrap">
          <Skeleton height={150} width={150} borderRadius={100} />
          <div className="author-skel-info">
            <Skeleton height={30} width={200} />
            <Skeleton height={16} width={100} />
            <Skeleton height={20} width={230} />
          </div>
        </div>
        <Skeleton height={50} width={130} borderRadius={10} />
      </div>
    );
  }

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
              <div className="col-md-12">
                {loading ? (
                  authorSkeleton()
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={data.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {data.authorName}
                            <span className="profile_username">
                              @{data.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {data.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      {data.followers ? (
                        <Followers followers={data.followers} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    data={data.nftCollection}
                    authorImage={data.authorImage}
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

function Followers({ followers }) {
  const [fol, setFol] = useState(followers);
  const [clicked, setClicked] = useState(false);

  function incrementFollower() {
    setFol(followers + 1);
    setClicked(true);
  }

  function decrementFollower() {
    setFol(followers);
    setClicked(false);
  }

  return (
    <div className="de-flex-col">
      <div className="profile_follower">{fol} followers</div>
      {clicked ? (
        <Link to="#" className="btn-main" onClick={() => decrementFollower()}>
          Unfollow
        </Link>
      ) : (
        <Link to="#" className="btn-main" onClick={() => incrementFollower()}>
          Follow
        </Link>
      )}
    </div>
  );
}
