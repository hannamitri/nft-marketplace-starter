import React from "react"
import "./skeletonloader.css"

const skeleton = () => {
    return (
        <div className= "skeleton-loader">
            <div className="skeleton-title"></div>
            <div className="skeleton-content"></div>
            <div className="skeleton-image"></div>
            
        </div>
    )
}

export default skeleton