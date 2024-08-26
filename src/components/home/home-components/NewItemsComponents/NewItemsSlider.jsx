import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NewItemsCard from "./NewItemsCard";

const NewItemsSlider = ({nfts}) => {
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
                    <NewItemsCard nft = {nft} key = {nft.id}/>
                ))}
        </OwlCarousel>
     );
}
 
export default NewItemsSlider;