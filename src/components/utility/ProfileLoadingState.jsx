import React from 'react'
import Skeleton from '../UI/Skeleton'

const ProfileLoadingState = () => {
  return (
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <Skeleton width={150} height={150} borderRadius={"100%"}/>

          <i className="fa fa-check"></i>
          <div className="profile_name">
            <h4>
            <Skeleton width={160} height={30}/>
              <span className="profile_username"><Skeleton width={'100%'} height={30}/></span>
              <span id="wallet" className="profile_wallet">
              <Skeleton width={200} height={30}/>
              </span>
              <Skeleton width={50} height={30}/>
            </h4>
          </div>
        </div>
      </div>
      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <Skeleton className="profile_follower" width={80} height={25}/>
          
          <Skeleton className="btn-main" width={120} height={42}/>
          
        </div>
      </div>
    </div>
  )
}

export default ProfileLoadingState
