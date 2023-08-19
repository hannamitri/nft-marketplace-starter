import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const TopSellers = ({ topSellersUsersData, topSellersLoading }) => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up" data-aos-duration="1000">
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="">
            <ol
              className="author_list"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              {topSellersLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <div className="nft__topSellers--container" key={index}>
                      <div className="nft__topSellers--info">
                        <div className="skeleton-box nft__img--skeleton nft__topSellers--position"></div>
                        <figure className="check--skeleton nft__topSellers--checkmark--container">
                          <i className="fa fa-check fa-check--skeleton nft__topSellers--checkmark--position"></i>
                        </figure>
                        <div className="skeleton nft__name-skeleton skeleton-box"></div>
                        <div className="nft__topSellers--cost--container">
                          <div className="skeleton nft__id--skeleton skeleton-box"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : topSellersUsersData &&
                  topSellersUsersData.map((user, index) => (
                    <div className="newItems--author--container" key={index}>
                      <li>
                        <div className="author_list_pp">
                          <Link to={`/author/${user.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={user.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${user.authorId}`}>
                            Monica Lucas
                          </Link>
                          <span>{user.price} ETH</span>
                        </div>
                      </li>
                    </div>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
