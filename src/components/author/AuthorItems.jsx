// import React from "react";
// import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";

// const AuthorItems = () => {
//   return (
//     <div className="de_tab_content">
//       <div className="tab-1">
//         <div className="row">
//           {new Array(8).fill(0).map((_, index) => (
//             <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
//               <div className="nft__item">
//                 <div className="author_list_pp">
//                   <Link to="">
//                     <img className="lazy" src={AuthorImage} alt="" />
//                     <i className="fa fa-check"></i>
//                   </Link>
//                 </div>
//                 <div className="nft__item_wrap">
//                   <div className="nft__item_extra">
//                     <div className="nft__item_buttons">
//                       <button>Buy Now</button>
//                       <div className="nft__item_share">
//                         <h4>Share</h4>
//                         <a href="" target="_blank" rel="noreferrer">
//                           <i className="fa fa-facebook fa-lg"></i>
//                         </a>
//                         <a href="" target="_blank" rel="noreferrer">
//                           <i className="fa fa-twitter fa-lg"></i>
//                         </a>
//                         <a href="">
//                           <i className="fa fa-envelope fa-lg"></i>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                   <Link to="/item-details">
//                     <img
//                       src={nftImage}
//                       className="lazy nft__item_preview"
//                       alt=""
//                     />
//                   </Link>
//                 </div>
//                 <div className="nft__item_info">
//                   <Link to="/item-details">
//                     <h4>Pinky Ocean</h4>
//                   </Link>
//                   <div className="nft__item_price">2.52 ETH</div>
//                   <div className="nft__item_like">
//                     <i className="fa fa-heart"></i>
//                     <span>97</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthorItems;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          (`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
        );
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <p>Loading authors...</p>;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authors.map((author) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={author.authorId}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${author.id}`}>
                    <img
                      className="lazy"
                      src={author.authorImage}
                      alt={author.authorName}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <Link to={`/author/${author.id}`}>
                    <img
                      src={author.nftCollection[0]?.nftImage}
                      className="lazy nft__item_preview"
                      alt={author.nftCollection[0]?.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/author/${author.id}`}>
                    <h4>{author.nftCollection[0]?.title}</h4>
                  </Link>

                  <div className="nft__item_price">
                    {author.nftCollection[0]?.price} ETH
                  </div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{author.nftCollection[0]?.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
