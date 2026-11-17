import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NFTCarousel from '../UI/NFTCarousel';
import Skeleton from '../UI/Skeleton';

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
        );
        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setCollections(dataArray);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  return (
    <section className="w-100 py-5 my-2">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row w-100 m-0">
          
          <div className="col-12 text-center mb-4">
            <h2 className="section-title">Hot Collections</h2>
          </div>

          {loading ? (
            <div className="row g-4 w-100 m-0">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card h-100 shadow-sm border-light rounded-4 p-3 d-flex flex-column justify-content-between">
                    <Skeleton width="100%" height="200px" borderRadius="rounded-4" />
                    <div className="py-3 text-center w-100">
                      <Skeleton width="75%" height="18px" className="mb-2 mx-auto" />
                      <Skeleton width="50%" height="14px" className="mx-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-12 px-0">
              <NFTCarousel items={collections.slice(0, 8)} isCollection={true} />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HotCollections;