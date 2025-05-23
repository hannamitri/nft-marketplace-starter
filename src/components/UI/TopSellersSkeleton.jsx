import React from 'react'
import {Link} from "react-router-dom";

const TopSellersSkeleton = () => {
    return (
        <ol className="author_list">
            {new Array(12).fill(0).map((_, i) => (
                <li key={i}>
                    <div className="author_list_pp skeleton">
                        <div className="lazy pp-author skeleton"/>
                        <i className="fa fa-check"/>
                    </div>
                    <div className="author_list_info">
                        <Link to={`/author/placeholder`} className="skeleton skeleton-text"/>
                        <span className="skeleton skeleton-text"/>
                        <span className="skeleton skeleton-text"/>
                    </div>
                </li>
            ))}
        </ol>
    )
}
export default TopSellersSkeleton
