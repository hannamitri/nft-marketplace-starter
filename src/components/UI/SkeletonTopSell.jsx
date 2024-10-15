import React from 'react'

const SkeletonTopSell = ({ width, height, borderRadius }) => {
  return (
    <>{new Array(12).fill(0).map((topSell, index) => (
        <li key={index}>
          <div className="author_list_pp">
            
              <div
                className=" skeleton-box"
                style={{width:"40px", height:"40px", borderRadius:"100%"}}
                src={topSell.authorImage}
                alt=""
              />
              <i className="fa fa-check"></i>
            
          </div>
          <div className="author_list_info">
            <div className='skeleton-box' style={{width:"60px", height:"20px"}}>{topSell.authorName}</div>
            <span className='skeleton-box' style={{width:"40px", height:"15px"}}>{topSell.price}</span>
          </div>
        </li>
      ))}</>
  )
}

export default SkeletonTopSell