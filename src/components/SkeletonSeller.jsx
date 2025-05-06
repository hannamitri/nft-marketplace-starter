import React from 'react'

const SkeletonSeller = () => {
  return (
    <li className='skeleton-seller'>
        <div className='author_list_pp'>
            <div className='skeleton-circle' />
        </div>
        <div className='author_list_info'>
            <div className='skeleton-text short' />
            <div className='skeleton-text tiny' />
        </div>
    </li>
  )
}

export default SkeletonSeller
