import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';


function Explore() {
  useEffect(() => {
     // Scroll to top when the component loads
    window.scrollTo(0, 0);
   
       // ✅ Initialize AOS
        AOS.init({
          duration: 2000, // animation duration (ms)
          once: true,     // whether animation should happen only once
          easing: "ease-in-out",
        })
    
          // Optional: refresh AOS if content updates dynamically
        AOS.refresh();
  }, []);

  const [explore, setExplore] = useState([])

  async function FetchExploreData() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
    console.log(data)
    setExplore(data)
  } 

  useEffect(() => {
    FetchExploreData()
  },[])


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

       
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        data-aos="zoom-in">
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
       
       
        <section aria-label="section" data-aos="zoom-in-up">
          <div className="container">
            <div className="row">
             
              <ExploreItems explore={explore} />
             
            </div>
          </div>
        </section>
         
      </div>
    </div>
  );
};

export default Explore;
