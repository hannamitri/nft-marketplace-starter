import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";


const TopSellers = () => {
 const [sellers, setSellers] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)


 useEffect(() => { async function Free (){
  try { 
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
  setSellers(data)
  } catch (error) {
    setError ("Failed to load TopSellers, try again next time :)")
  } finally {
    setLoading(false)
  }
 }
 Free();
},[]);
 
 
 
 
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
            <ol className="author_list">
            {loading ? Array.from({length:12})
            .map((_,index) => (
              <li key={index}>
                <Skeleton
                      circle
                      height={50}
                      width={50}
                      style={{ margin: "auto" }}
                    />
                    
                 <div className="author_list_info">
                        <Skeleton width={100} height={15} />
                        <Skeleton width={60} height={15} style={{ marginTop: "5px" }} />
                      </div>
                      </li>
              
            ) ) :
            Array.isArray(sellers) && sellers.slice(0,12).map((item) =>
                <li key={item.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
