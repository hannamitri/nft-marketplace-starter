import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import SkeletonSeller from '../SkeletonSeller'

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true;

    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
    .then((res) => {
      if (mounted) {
        setSellers(res.data);
        setLoading(false)
      }
    })
    .catch((err) => {
      console.error('Error fetching data', err);
      setLoading(false)
    });

  return () => (mounted = false)
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
            <ol className="author_list">
              {loading 
              ? new Array(12).fill(0).map((_, i) => <SkeletonSeller key={i} />)
              : sellers.map((item) => (
                <li key={item.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt={item.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
