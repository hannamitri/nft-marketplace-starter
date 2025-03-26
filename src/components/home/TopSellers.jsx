import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from '../UI/Skeleton'


const TopSellers = () => {
    const [loading, setLoading] = useState([])
    const [data, setData] = useState([])
  useEffect(()=> {
    async function fetchTopSellers() {
      try {
        setLoading(true);
          const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
          console.log(response.data)
          setData(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
      setLoading(false);
  }

  fetchTopSellers();
  }, [])
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading ?  
             <ol className="author_list">
             {new Array(12).fill(0).map((_, index) => (
               <li key={index}>
                 <div className="author_list_pp">
                   <Link to={``}>
                   <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                     <i className="fa fa-check"></i>
                   </Link>
                 </div>
                 <div className="author_list_info">
                   <Link to={``}><Skeleton width="100px" height="20px" /></Link>
                   <span><Skeleton width="40px" height="20px" /></span>
                 </div>
               </li>
             ))}
           </ol>
            
            :

            <ol className="author_list">
              {data.map((card) => (
                <li key={card.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${card.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={card.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${card.authorId}`}>{card.authorName}</Link>
                    <span>{card.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
