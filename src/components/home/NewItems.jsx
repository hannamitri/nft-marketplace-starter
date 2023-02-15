import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from "axios";
import NewItem from "./NewItem";
import NewItemSkeleton from "./NewItemSkeleton";


const NewItems = () => {

  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
      console.log(data)
      setNewItems(data);
    }
    getData();
  }, [])


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {
            newItems.length ? 
            (
              <OwlCarousel
                margin={10} 
                loop
                nav={true}
                responsive={{
                  0: {
                    items: 1
                  },
                  480: {
                    items: 2
                  },
                  1000: {
                    items: 3
                  },
                  1200: {
                    items: 4
                  }
                }}
              >
                {
                  newItems.map((item) => (
                    <NewItem item={item}  key={item.id} />
                  ))
                }
              </OwlCarousel>
            )
            :
            (
              <>
                <OwlCarousel
                margin={10} 
                  loop
                  nav={true}
                  responsive={{
                    0: {
                      items: 1
                    },
                    480: {
                      items: 2
                    },
                    1000: {
                      items: 3
                    },
                    1200: {
                      items: 4
                    }
                  }}
              >
              {
                    new Array(6).fill(0).map((_, index) => (
                      <NewItemSkeleton key={index} />
                    ))
                  }
              </OwlCarousel>
              </>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
