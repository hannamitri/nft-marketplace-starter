import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PageSkeleton = () => {
  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-6">
          <Skeleton height={500} />
        </div>

        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <br />
          <Skeleton height={25} width={150} />
          <br />
          <Skeleton count={5} />
          <br />
          <Skeleton height={40} width={120} />
        </div>

      </div>
    </div>
  );
};

export default PageSkeleton;