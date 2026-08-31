import React, { useContext, useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { DataContext } from "../components/context/DataContext";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { author, setAuthor, loading } = useContext(DataContext);

    const [followTag, setFollowTag] = useState(false);

    function handleFollow() {
        setAuthor((prev) => ({
            ...prev,
            followers: prev.followers + (followTag ? -1 : 1),
        }));
        setFollowTag((prev) => !prev);
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
                                <div className="d_profile de-flex">
                                    <div className="de-flex-col">
                                        <Skeleton loading={loading}>
                                            <div className="profile_avatar">
                                                <img
                                                    src={author.authorImage}
                                                    alt=""
                                                />

                                                <i className="fa fa-check"></i>
                                                <div className="profile_name">
                                                    <h4>
                                                        {author.authorName}
                                                        <span className="profile_username">
                                                            @{author.tag}
                                                        </span>
                                                        <span
                                                            id="wallet"
                                                            className="profile_wallet"
                                                        >
                                                            {author.address}
                                                        </span>
                                                        <button
                                                            id="btn_copy"
                                                            title="Copy Text"
                                                        >
                                                            Copy
                                                        </button>
                                                    </h4>
                                                </div>
                                            </div>{" "}
                                        </Skeleton>
                                    </div>
                                    <div className="profile_follow de-flex">
                                        <Skeleton loading={loading}>
                                            <div className="de-flex-col">
                                                <div className="profile_follower">
                                                    {author.followers} followers
                                                </div>
                                                <button
                                                    className="btn-main"
                                                    onClick={handleFollow}
                                                >
                                                    {followTag
                                                        ? "Unfollow"
                                                        : "Follow"}
                                                </button>
                                            </div>
                                        </Skeleton>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="de_tab tab_simple">
                                    <Skeleton loading={loading}>
                                        <AuthorItems />
                                    </Skeleton>
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
