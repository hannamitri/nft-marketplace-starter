import React from "react";
import Card from "../UI/Card";

const AuthorItems = ({data, authorId, authorImage}) => {
    return (
        <div className="de_tab_content">
            <div className="tab-1">
                <div className="row">
                    {data ? data.map(item => (
                        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={item.id}>
                            <Card
                                expiryDate={item?.expiryDate}
                                authorId={authorId}
                                authorImage={authorImage}
                                nftId={item?.nftId}
                                nftImage={item?.nftImage}
                                title={item?.title}
                                price={item?.price}
                                likes={item?.likes}
                            />
                        </div>
                    )) : Array.from({length: 8}).map((_, idx) => (
                        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={idx}>
                            <Card skeleton/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthorItems;
