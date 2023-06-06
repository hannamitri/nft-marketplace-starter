import React, { useEffect, useState } from "react";
import axios from "axios";
import TopSeller from "../utility/TopSeller";


const TopSellers = () => {
  const [data, setData] = useState([])

  async function getSellersData() {
    let {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setData(data)
  }

  useEffect(()=> {
    getSellersData()
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
              {data.map((seller) => 
                <TopSeller seller={seller} key={seller.id}/>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
