import { Link } from 'react-router-dom';
import AuthorImage from '../../images/author_thumbnail.jpg';
import nftImage from '../../images/nftImage.jpg';
import Cards from '../re-useable/Cards';

const AuthorItems = ({ nftCollection }) => {
  return (
    <div className='de_tab_content'>
      <div className='tab-1'>
        <div className='row'>
          <Cards items={nftCollection} cardType='explore' />
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
