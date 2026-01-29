import React from 'react'
import { Link } from 'react-router-dom'

const BrowseByCategoryCard = ({ delay, icon, title }) => {
  return (
    <div
        data-aos="fade-left" 
        data-aos-delay={delay} 
        className="col-md-2 col-sm-4 col-6 mb-sm-30">
        <Link to="/explore" className="icon-box style-2 rounded">
            <i className={icon}></i>
            <span>{title}</span>
        </Link>
  </div>
  )
}

export default BrowseByCategoryCard