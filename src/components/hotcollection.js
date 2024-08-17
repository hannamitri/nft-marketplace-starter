// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import OwlCarousel from 'react-owl-carousel'; // Ensure this import is correct
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css'; // Ensure you have these styles imported
// import Skeleton from './UI/Skeleton';

// const HotCollection = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // Added loading state

//   useEffect(() => {
//     axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
//       .then(res => {
//         setData(res.data);
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch(err => {
//         console.error("Error fetching data:", err);
//         setError(err);
//         setLoading(false); // Set loading to false even if there's an error
//       });
//   }, []);

//   const carouselOptions = {
//     loop: true,
//     margin: 10,
//     nav: true,
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 2
//       },
//       1000: {
//         items: 4
//       }
//     }
//   };

//   if (error) {
//     return <div>Error loading data. Please try again later.</div>;
//   }

//   return (
//     <section id="section-collections" className="no-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="text-center">
//               <h2 data-aos="fade-in">Hot Collections</h2>
//               <div className="small-border bg-color-2"></div>
//             </div>
//           </div>
//           <OwlCarousel className='owl-theme' {...carouselOptions}>
//             {loading ? (
//               Array.from({ length: 4 }).map((_, index) => ( // Placeholder while loading
//                 <div className="" key={index}>
//                   <div className="nft_coll">
//                     <div className="nft_wrap">
//                       <Skeleton width={282} height={270} />
//                     </div>
//                     <div className="nft_coll_pp">
//                       <Skeleton width={50} height={50} borderRadius={99} />
//                       <i className="fa fa-check"></i>
//                     </div>
//                     <div className="nft_coll_info">
//                       <h4>
//                         <Skeleton height={20} width="40%" />
//                       </h4>
//                       <span>
//                         <Skeleton height={20} width="20%" />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               data.map((collections, index) => (
//                 <div className="p-2" key={index}>
//                   <div className="nft_coll" data-aos="fade-in">
//                     <div className="nft_wrap">
//                       <Link to={`/item-details/${collections.nftId}`}>
//                         <img
//                           src={collections.nftImage}
//                           className="lazy img-fluid"
//                           alt={collections.title} // Corrected alt attribute
//                         />
//                       </Link>
//                     </div>
//                     <div className="nft_coll_pp">
//                       <Link to={`/author/${collections.authorId}`}>
//                         <img
//                           className="lazy pp-coll"
//                           src={collections.authorImage}
//                           alt={collections.authorName} // Corrected alt attribute
//                         />
//                       </Link>
//                       <i className="fa fa-check"></i>
//                     </div>
//                     <div className="nft_coll_info">
//                       <Link to="/explore">
//                         <h4>{collections.title}</h4>
//                       </Link>
//                       <span>ERC-{collections.code}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </OwlCarousel>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HotCollection;
