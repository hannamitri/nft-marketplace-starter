import React from 'react';
import NFTCard from '../UI/NFTCard';
import Skeleton from '../UI/Skeleton';

const AuthorItems = ({ items, authorImage, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row g-4">
          {items && items.length > 0 ? (
            items.map((nft) => {
              // Normalize the item object so NFTCard gets all the required fields
              const nftData = {
                ...nft,
                authorImage: authorImage,
                authorId: authorId || nft.authorId,
                nftId: nft.nftId || nft.id,
              };

              return (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nftData.nftId || nft.id}>
                  <NFTCard item={nftData} isCollection={false} />
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center text-muted py-4">
              <p>No items available for this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;