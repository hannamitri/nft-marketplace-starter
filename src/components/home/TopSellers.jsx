import React,{ useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const TopSellers = () => {
  const [localNftData, setLocalNftData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const { authorId, id } = useParams();

  useEffect(() => {
    if (localNftData && localNftData.length > 0) {
      setIsLoading(false);
    }
  }, [localNftData]);


useEffect(() => {
  const fetchNFTs = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setLocalNftData(response.data);
    } catch (error) {
      console.error("There was an error fetching the NFT data!", error);
    }
  }
  fetchNFTs();
}, []);

const Skeleton = ({
  width = "auto",
  height = "auto",
  className = "skeleton-avatar",
  isSquare = false,
}) => {
  return (
    <div
      className={className}
      style={{
        width: width,
        height: height,
        borderRadius: isSquare ? "0%" : "50%",
        backgroundColor: "#e0e0e0",
        animation: "pulse 1.5s infinite",
        margin: "0 auto",
      }}
    />
  );
};

const SkeletonNftCard = ({
  imageHeight = "45px",
  titleHeight = "10px",
  titleWidth = "55px",
  imageWidth = "45px",
  ercHeight = "10px",
  ercWidth = "35px",
  imageClass = "skeleton-image",
  titleClass = "skeleton-title",
  ercClass = "skeleton-erc",
}) => {
  return (
    <li>
    <div className="author_list_pp">
    <Skeleton width="45px" height="45px" />
    <div
      className={`${imageClass}`}
      style={{ height: imageHeight,
        width: imageWidth
       }}
    ></div>{" "}
        <img
          className="lazy pp-author"
          src=""
          alt=""
        />
    </div>
    <div className="author_list_info">
      <Skeleton width="55px" height="10px" isSquare={true} />
    <div
      className={`${titleClass}`}
      style={{ height: titleHeight,
        width: titleWidth
       }}
    ></div>{" "}
      <span>
      <Skeleton width="35px" height="10px" isSquare={true} />
    <div
      className={`${ercClass}`}
      style={{ height: ercHeight,
        width: ercWidth
       }}
    ></div>{" "}
      </span>
    </div>
  </li>
  );
}

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


          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonNftCard
                key={index}
                imageHeight = "45px"
                titleHeight = "10px"
                titleWidth = "55px"
                imageWidth = "45px"
                ercHeight = "10px"
                ercWidth = "35px"
                imageClass = "skeleton-image"
                titleClass = "skeleton-title"
                ercClass = "skeleton-erc"
              />
            ))
          ) : (
          <div className="col-md-12">
            <ol className="author_list">
            {localNftData.length > 0 &&
                localNftData.map((nft, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton />
                    <Link to={`/author/${nft.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={nft.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${nft.authorId}`}>{nft.authorName}</Link>
                    <span>{`${nft.price}`} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
