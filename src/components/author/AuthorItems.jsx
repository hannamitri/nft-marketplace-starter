import { Link, } from "react-router-dom";


const AuthorItems = ({ data, authorPic }) => {
  if (!data || !data.nftCollection) {
    return null;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {data ? (
            data.nftCollection.map((data, index) => (

            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorPic} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${data.nftId}`}>
                    <img
                      src={data.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${data.nftId}`}>
                    <h4>{data.title}</h4>
                  </Link>
                  <div className="nft__item_price">{data.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{data.likes}</span>
                  </div>
                </div>
              </div>
            </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;