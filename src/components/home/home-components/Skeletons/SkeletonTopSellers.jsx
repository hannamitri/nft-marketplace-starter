import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonTopSellers = () => {
    return ( 
            <>
              {
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp skeleton_author_list_pp">
                        <Skeleton circle width={50} height={50} />
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info skeleton_author_list_info">
                      <Skeleton width={80}/>
                      <Skeleton width={55}/>
                    </div>
                  </li>

                ))
              }
            </>
     );
}
 
export default SkeletonTopSellers;