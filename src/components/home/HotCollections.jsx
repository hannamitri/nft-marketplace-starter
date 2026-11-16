// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
// import "./HotCollections.css";

// const HotCollections = () => {
//   const [collections, setCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [startIndex, setStartIndex] = useState(0);

//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const response = await axios.get(
//           "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
//         );

//         console.log(response.data);
//         setCollections(response.data);
//       } catch (err) {
//         setError("Failed to fetch collections.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollections();
//   }, []);

//   if (loading) {
//     return (
//       <section id="section-collections" className="no-bottom">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="text-center">
//                 <h2>Hot Collections</h2>
//                 <div className="small-border bg-color-2"></div>
//               </div>
//             </div>
//             /* Skeleton Loader */
//             {[...Array(4)].map((_, index) => (
//               <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
//                 <div className="nft_coll skeleton">
//                   <div className="collection-banner skeleton-banner"></div>
//                   <div className="collection-avatar skeleton-avatar"></div>
//                   <h3 className="skeleton-text"></h3>
//                   <span className="skeleton-text"></span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <section id="section-collections" className="no-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="text-center">
//               <h2>Hot Collections</h2>
//               <div className="small-border bg-color-2"></div>
//             </div>
//           </div>
//           {collections.slice(startIndex, startIndex + 4).map((collection) => (
//             <div
//               className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
//               key={collection.id}
//             >
//               <div className="nft_coll">
//                 <img
//                   className="collection-banner"
//                   src={collection.nftImage}
//                   alt=""
//                 />
//                 <img
//                   className="collection-avatar"
//                   src={collection.authorImage}
//                   alt=""
//                 />
//                 <h3>{collection.title}</h3>
//                 <span>ERC-{collection.code}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="carousel-buttons">
//         <button
//           onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
//           disabled={startIndex === 0}
//         >
//           &lsaquo;
//         </button>
//         <button
//           onClick={() =>
//             setStartIndex(Math.min(collections.length - 4, startIndex + 1))
//           }
//           disabled={startIndex >= collections.length - 4}
//         >
//           &rsaquo;
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HotCollections;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick"; // Importing the Slider component
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "./HotCollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (err) {
        setError("Failed to fetch collections.");
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            {/* Skeleton Loader */}
            {[...Array(4)].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll skeleton">
                  <div className="collection-banner skeleton-banner"></div>
                  <div className="collection-avatar skeleton-avatar"></div>
                  <h3 className="skeleton-text"></h3>
                  <span className="skeleton-text"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {collections.map((collection) => (
            <div className="nft_coll" key={collection.id}>
              <img
                className="collection-banner"
                src={collection.nftImage}
                alt=""
              />
              <img
                className="collection-avatar"
                src={collection.authorImage}
                alt=""
              />
              <h3>{collection.title}</h3>
              <span>ERC-{collection.code}</span>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HotCollections;
