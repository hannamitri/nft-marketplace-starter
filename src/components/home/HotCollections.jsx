import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";


const HotCollections = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections()
  {
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    setUsers(response.data);
    setLoading(false);
  }

  useEffect(()=> {
    fetchHotCollections();
  }, [])

  const PrevButton = (props) => {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        Previous
      </button>
    );
  };
  
  const NextButton = (props) => {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        Next
      </button>
    );
  };


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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

          {
            loading ? (
              <>
                {new Array(4).fill(0).map((_, index) => {
                  return (
                    <div className="skeliton_card" key={index}>
                      <div className="skeliton_nft_coll">
                        <div className="skeliton_nft_wrap">
                          <Link to="/item-details">
                            <div></div>
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <div className="skeliton_circle"></div>
                          </Link>
                          <i className="fa fa-check skeliton_check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <div className="skeliton_row1"></div>
                          </Link>
                          <div className="skeliton_row2"></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
              </>
            ) : (
              <>
                <Slider {...settings}>
                  {users.map((user, index) => (
                    <div className="card" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img src={user.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${user.authorId}`}>
                            <img className="lazy pp-coll" src={user.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{user.title}</h4>
                          </Link>
                          <span>{user.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            )
          }

        </div>
      </div>
    </section>
  );
};

export default HotCollections;
