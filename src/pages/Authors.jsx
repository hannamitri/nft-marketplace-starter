import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors"
        );
        console.log(response.data);
        setAuthors(Array.isArray(response.data) ? response.data : response.data.authors || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };
    
    fetchAuthors();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section id="section-collections" className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h2>Authors</h2>
                  <div className="small-border bg-color-2"></div>
                </div>
              </div>
              {loading
                ? new Array(8).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft__item_info">
                          <Skeleton width="100px" height="20px" />
                        </div>
                      </div>
                    </div>
                  ))
                : authors.map((author) => (
                    <div
                      key={author.authorid}
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${author.authorId}`}>
                            <img className="lazy" src={author.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/author/${author.authorId}`}>
                            <h4>{author.authorName}</h4>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Authors;