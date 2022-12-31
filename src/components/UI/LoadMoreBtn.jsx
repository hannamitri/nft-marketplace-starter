import React from 'react';
import { Link } from 'react-router-dom';

const LoadMoreBtn = ({loadMore}) => {
    return (
        <>
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
        </>
    );
}

export default LoadMoreBtn;