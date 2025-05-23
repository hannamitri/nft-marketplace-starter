import React, {useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import {useParams} from "react-router-dom";
import axios from "axios";
import AuthorSkeleton from "../components/UI/AuthorSkeleton";


const Author = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const [authorHTML, setAuthorHTML] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        async function renderAuthor() {
            try {
                const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
                setAuthorHTML(data);
            } catch (error) {
                console.log("Error in function renderAuthor.", error);
            } finally {
                setIsLoading(false);
            }
        }

        renderAuthor();
    }, [id]);

    const toggleFollow = () => {
        setAuthorHTML(prevState => {
            const newFollowerCount = isFollowing ? prevState.followers - 1 : prevState.followers + 1;
            return {
                ...prevState,
                followers: newFollowerCount
            };
        });
        setIsFollowing(prev => !prev);
    };

    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section
                    id="profile_banner"
                    aria-label="section"
                    className="text-light"
                    style={{background: `url(${AuthorBanner}) top`}}>
                </section>


                {isLoading ? (

                    <AuthorSkeleton/>

                ) : (

                    <section aria-label="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d_profile de-flex">
                                        <div className="de-flex-col">
                                            <div className="profile_avatar">
                                                <img src={authorHTML.authorImage} alt=""/>
                                                <i className="fa fa-check"></i>
                                                <div className="profile_name">
                                                    <h4>
                                                        {authorHTML.authorName}
                                                        <span className="profile_username">@{authorHTML.tag}</span>
                                                        <span id="wallet" className="profile_wallet">
                                                            {authorHTML.address}
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
                                                <div className="profile_follower">{authorHTML.followers} followers</div>
                                                <button onClick={toggleFollow} className="btn-main">
                                                    {isFollowing ? "Unfollow" : "Follow"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="de_tab tab_simple">
                                        <AuthorItems/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Author;