import { Link } from 'react-router-dom';
import CountDown from '../home/CountDown';

const Cards = ({ items, cardType }) => {
  return items.map((item, index) => (
    <div
      className={
        cardType === 'explore' ? 'col-lg-3 col-md-6 col-sm-6 col-xs-12' : null
      }
      key={index}
      style={{ display: 'block', backgroundSize: 'cover' }}
    >
      <div className='nft__item'>
        <div className='author_list_pp'>
          <Link
            to={`/author/${item.authorId}`}
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            title='Creator: Monica Lucas'
          >
            <img className='lazy' src={item.authorImage} alt='' />
            <i className='fa fa-check'></i>
          </Link>
        </div>
        {item.expiryDate ? <CountDown expiryDate={item.expiryDate} /> : null}

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

          <Link to={`/item-details/${item.nftId}`}>
            <img
              src={item.nftImage}
              className='lazy nft__item_preview'
              alt=''
            />
          </Link>
        </div>
        <div className='nft__item_info'>
          <Link to={`/item-details/${item.nftId}`}>
            <h4>{item.title}</h4>
          </Link>
          <div className='nft__item_price'>{item.price} ETH</div>
          <div className='nft__item_like'>
            <i className='fa fa-heart'></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default Cards;
