import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';


const TopSellers = () => {

  AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

  const [getdata, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function GetData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setGetData(data);
      setLoading(false);
    }
    GetData();
  }, []);

  if (loading) {
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
              <div className="col-md-12">
            <ol className="author_list">
            {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className=" Container-gray">
                    <Link to="/author">
                      <div
                        className="lazy pp-author gray-background-image"
                        src={AuthorImage}
                        alt=""
                      ></div>
                      <i className="fa fa-check"></i>
                    </Link>
                  
                  <div className="author_list_info gray-background-nameauthor">
                    <Link to="/author"></Link>
                    <span></span>
                  </div></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
            </div>
          </div>
      </section>
    );
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2  data-aos="fade-up" >Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {getdata.map((elem) => (
                <li data-aos="fade-up" key={elem.id}>
                  <div   className="author_list_pp">
                    <Link to={`/authors/${elem.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={elem.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/authors/${elem.authorId}`}>{elem.authorName}</Link>
                    <span>{elem.price}</span>
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
