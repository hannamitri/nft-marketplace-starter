import React from 'react'
import "../../css/styles/slider-arrows.css"

const HotCollectionsPrev = ({ onClick }) => {
  return (
    <div className="nft-arrow nft-prev" onClick={onClick}>
        <i className="fa fa-angle-left"></i>
    </div>
  )
}

export default HotCollectionsPrev