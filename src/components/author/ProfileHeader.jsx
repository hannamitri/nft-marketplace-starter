import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileHeader = ({ image, name, tag, address, isLoading }) => (
  <div className="de-flex-col">
    <div className="profile_avatar">
      {isLoading ? (
        <>
          <Skeleton circle height={150} width={150} />
          <i className="fa fa-check"></i>
        </>
      ) : (
        <>
          <img src={image} alt="" />
          <i className="fa fa-check"></i>
        </>
      )}
      <div className="profile_name">
        <h4 className="profile_header">
          {isLoading ? (
            <>
              <Skeleton height={39} width={241} />
              <span className="profile_username">
                <Skeleton height={31} width={200} />
              </span>
              <span id="wallet" className="profile_wallet">
                <Skeleton height={31} width={200} />
              </span>
              <button id="btn_copy" title="Copy Text">
                <Skeleton height={14} width={31} />
              </button>
            </>
          ) : (
            <>
              {name}
              <span className="profile_username">{tag}</span>
              <span id="wallet" className="profile_wallet">
                {address}
              </span>
              <button id="btn_copy" title="Copy Text">
                Copy
              </button>
            </>
          )}
        </h4>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
