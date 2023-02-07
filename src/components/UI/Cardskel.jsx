import React from 'react'
import Skeleton from 'react-loading-skeleton'

function Cardskel() {
 
  return (
   
    <div className="card__wrap">
    <div className='card__wrapper'>
      <div className='card__box'> <Skeleton width={300}  height={200} /></div>
      <div className='card__circle'> <Skeleton  circle height={55}  width={55}/></div>
      <div className='card__title'> <Skeleton  width={150} height={20}/></div>
      <div className='card__code'> <Skeleton  width={100} height={20} /></div>
    </div>
    </div>
    
  )
}

export default Cardskel