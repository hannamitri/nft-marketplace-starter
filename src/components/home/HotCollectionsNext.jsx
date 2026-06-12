import React from 'react'
import "../../css/styles/slider-arrows.css"

const HotCollectionsNext = ({ onClick }) => {
  return (
    <div className="nft-arrow nft-next" onClick={onClick}>
        <i className="fa fa-angle-right"></i>
    </div>
  )
}

export default HotCollectionsNext