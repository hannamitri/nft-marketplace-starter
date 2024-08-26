import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';
import SkeletonNewItems from '../SkeletonNewItems';

const SkeletonAuthor = () => {
    return ( 
        <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <Skeleton circle width={150} height={150}/>

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                            <Skeleton width={150}/>
                          <span className="profile_username"><Skeleton width={90}/></span>
                          <span id="wallet" className="profile_wallet">
                            <Skeleton width = {200}/>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                        <div className="profile_follower"><Skeleton width={160} height={42}/></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                </div>
              </div>
            </div>
          </div>
     );
}
 
export default SkeletonAuthor;