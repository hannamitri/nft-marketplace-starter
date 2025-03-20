import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import collectionsData from "../../api/api.json";
import authorData from "../../api/authorApi.json";
import itemsData from "../../api/itemsDetailsApi.json";
import Carousel from "../shared/Carousel";
import Skeleton from "../UI/Skeleton";

const HotCollectionSkeleton = () => (
  <div className="skeleton-slide">
    <Skeleton type="image" className="skeleton-image" />
    <Skeleton
      type="avatar"
      className="skeleton-circle"
      style={{
        marginTop: "-20px",
        position: "relative",
        zIndex: 1,
        border: "2px solid white",
      }}
    />
    <Skeleton
      type="title"
      className="skeleton-title"
      style={{ marginTop: "10px" }}
    />
    <Skeleton
      type="subtitle"
      className="skeleton-subtitle"
      style={{ marginTop: "8px" }}
    />
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const collectionItemsMap = itemsData.reduce((acc, item) => {
      const matchingCollection = collectionsData.find(
        collection => 
          item.title.toLowerCase().includes(collection.title.toLowerCase()) ||
          collection.title.toLowerCase().includes(item.title.toLowerCase()) ||
          (item.title.split(" ").some(word => 
            collection.title.toLowerCase().includes(word.toLowerCase()) && 
            word.length > 3))
      );
      
      if (matchingCollection) {
        acc[matchingCollection.title] = item.id;
      }
      return acc;
    }, {});

    const mappedCollections = collectionsData.slice(0, 6).map((collection) => {
      const authorMatch = authorData.find((author) => {
        return author.authorId === collection.authorId;
      });

      if (collectionItemsMap[collection.title]) {
        return {
          ...collection,
          mappedAuthorId: authorMatch ? authorMatch.id : null,
          relatedItemId: collectionItemsMap[collection.title],
        };
      }

      const relatedItem = itemsData.find((item) => {
        return (
          item.ownerId === collection.authorId ||
          item.creatorId === collection.authorId
        );
      });

      const similarNameItem = !relatedItem ? itemsData.find(item => {
        const collectionWords = collection.title.toLowerCase().split(" ");
        const itemWords = item.title.toLowerCase().split(" ");
        return collectionWords.some(word => 
          itemWords.includes(word) && word.length > 3
        );
      }) : null;

      return {
        ...collection,
        mappedAuthorId: authorMatch ? authorMatch.id : null,
        relatedItemId: relatedItem ? relatedItem.id : (similarNameItem ? similarNameItem.id : null),
      };
    });

    setCollections(mappedCollections);
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel skeletonItem={HotCollectionSkeleton}>
            {collections.map((collection, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={collection.id}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link
                      to={`/item-details/${collection.relatedItemId || collection.id}`}
                    >
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link
                      to={`/author/${collection.mappedAuthorId || collection.authorId}`}
                    >
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/item-details/${collection.relatedItemId || collection.id}`}>
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
