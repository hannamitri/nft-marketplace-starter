import Card from "../Card";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ authorData }) => {
  const skeletonLoading = new Array(8).fill(0).map((_, index) => (
    <div
      key={index}
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <Skeleton width="100%" height="400px" />
      </div>
    </div>
  ));

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorData
            ? authorData.nftCollection.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  responsiveStyling={"col-lg-3 col-md-6 col-sm-6 col-xs-12"}
                  authorImage={authorData.authorImage}
                />
              ))
            : skeletonLoading}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
