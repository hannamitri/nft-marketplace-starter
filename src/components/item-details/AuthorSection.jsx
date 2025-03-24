import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AuthorSection = ({ title, image, name, id, isLoading }) => (
  <>
    <h6>{title}</h6>
    <div className="item_author">
      <div className="author_list_pp">
        {isLoading ? (
          <>
            <Skeleton circle width={50} height={50} />
            <i className="fa fa-check"></i>
          </>
        ) : (
          <Link to={`/author/${id}`}>
            <img className="lazy" src={image} alt={name} />
            <i className="fa fa-check"></i>
          </Link>
        )}
      </div>
      <div className="author_list_info">
        {isLoading ? (
          <Skeleton width={100} />
        ) : (
          <Link to={`/author/${id}`}>{name}</Link>
        )}
      </div>
    </div>
  </>
);

export default AuthorSection;
