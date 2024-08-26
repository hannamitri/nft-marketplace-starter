import SkeletonNewItems from "../SkeletonNewItems";

const SkeletonCatalog = () => {
    return ( 
        <div className="skeleton__explore__container">
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>
            <div className="skeleton__explore__wrap">
              <SkeletonNewItems />
            </div>   
        </div>
     );
}
 
export default SkeletonCatalog;