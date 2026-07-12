import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const Carousel = () => {
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(true)

    const options = {
        items: 3,
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
    };
  return (
    <OwlCarousel className='owl-theme' loop margin={4} nav>
        <div className="item">
            <h4>1</h4>
        </div>
        <div className="item">
            <h4>2</h4>
        </div>
        <div className="item">
            <h4>3</h4>
        </div>
        <div className="item">
            <h4>4</h4>
        </div>
        <div className="item">
            <h4>5</h4>
        </div>
        <div className="item">
            <h4>6</h4>
        </div>
    </OwlCarousel>
  )
}

export default Carousel