import React from 'react'
import SkeletonCard from './SkeletonCard'

const SkeletonGrid = ({ count = 8}) => {
  return (
    <>
    {new Array(count).fill(0).map((_, i) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key= {i}>
            <SkeletonCard />
        </div>
    ))}
      
    </>
  )
}

export default SkeletonGrid
