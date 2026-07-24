import React from "react";
import NFT from '../home/NFT'

const AuthorItems = (props) => {
  
  const skeleton = new Array(8).fill(0);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          
          {props.author?.nftCollection.length > 0 ?
          props.author.nftCollection.map((item) => {
            return (
              <div data-aos="fade" data-aos-delay="100" data-aos-duration="1000" className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
                <NFT loading={false} authorId={props.author.authorId} 
                authorImage={props.author.authorImage} expiryDate={item.expiryDate} 
                nftId={item.nftId} nftImage={item.nftImage} price={item.price} likes={item.likes} title={item.title} />
              </div>
          )})
          :
          skeleton.map((_, index) => {
            return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <NFT key={index} loading={true} />
            </div>
            )
          })
          }
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
