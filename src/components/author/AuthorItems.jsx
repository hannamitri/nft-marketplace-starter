import Cards from '../re-useable/Cards';

const AuthorItems = ({ nftCollection, loading }) => {
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
