import Skeleton from '../UI/Skeleton';

const SkeletonCards = ({ itemsAmount }) => {
  return new Array(itemsAmount).fill(0).map((_, index) => (
    <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={index}>
      <div className='nft__item'>
        <div className='author_list_pp'>
          <Skeleton height={'50px'} width={'50px'} borderRadius={'50%'} />
        </div>
        <div className='de_countdown_skeleton'>
          <Skeleton height={'32px'} width={'110px'} borderRadius={'30px'} />
        </div>

        <div className='nft__item_wrap'>
          <div className='nft__item_extra'>
            <div className='nft__item_buttons'>
              <button>Buy Now</button>
              <div className='nft__item_share'>
                <h4>Share</h4>
                <a href='' target='_blank' rel='noreferrer'>
                  <i className='fa fa-facebook fa-lg'></i>
                </a>
                <a href='' target='_blank' rel='noreferrer'>
                  <i className='fa fa-twitter fa-lg'></i>
                </a>
                <a href=''>
                  <i className='fa fa-envelope fa-lg'></i>
                </a>
              </div>
            </div>
          </div>

          <Skeleton height={'219px'} width={'219px'} borderRadius={'8px'} />
        </div>
        <div className='nft__item_info'>
          <Skeleton height={'1rem'} width={'5rem'} />
          <div className='nft__item_price'>
            <Skeleton height={'1rem'} width={'3rem'} />
          </div>
          <div className='nft__item_like'>
            <i className='fa fa-heart'></i>
            <span>
              <Skeleton height={'.75rem'} width={'1rem'} />
            </span>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default SkeletonCards;
