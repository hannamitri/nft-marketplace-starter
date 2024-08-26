import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

 const HotCollectionsSlider = ({nfts}) => {
    const options = {
        items:4,
        loop:true,
        margin:12,
        nav:true,
        dots:false,
        responsive: {
            0: {
                items:1
            },
            480:{
                items:2
            }, 
            900:{
                items:3
            },
            1200:{
                items:4
            }

        }
    }
    return ( 
    <OwlCarousel className='owl-theme' {...options}>
        {
            nfts.map((nft) => (
                <div className="nft_coll" key={nft.id}>
                    <div className="nft_wrap">
                        <Link to={`/item-details/${nft.nftId}`}>
                        <img src={nft.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                    </div>
                    <div className="nft_coll_pp">
                        <Link to={`/author/${nft.authorId}`}>
                        <img className="lazy pp-coll" src={nft.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <Link to="/explore">
                        <h4>{nft.title}</h4>
                        </Link>
                        <span>ERC-{nft.code}</span>
                    </div>
                </div>
            ))
        }
    </OwlCarousel>
    );
}
 
export default HotCollectionsSlider;
