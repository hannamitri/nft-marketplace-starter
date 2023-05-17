import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";

const Explore = () => {



  const [expo , setExpo] = useState()




  
  
  
  useEffect(() => {
    const newExplore =  axios.get(`${`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`}`).then((response)=> {
      setExpo(response.data)
    })
    
    console.log(expo)
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems explore={expo} setExplore={setExpo} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
