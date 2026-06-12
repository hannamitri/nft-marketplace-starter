import React from 'react'
import { Link } from "react-router-dom";


const Seller = ({ index, authorName, authorImage, authorId, price }) => {

    return (
    <li key={index}>
        <div className="author_list_pp">
        <Link to={`/author/${authorId}`}>
            <img
            className="lazy pp-author"
            src={authorImage}
            alt={authorImage}
            />
            <i className="fa fa-check"></i>
        </Link>
        </div>
        <div className="author_list_info">
        <Link to={`/author/${authorId}`}>{authorName}</Link>
        <span>{price} ETH</span>
        </div>
    </li>
  )
}

export default Seller