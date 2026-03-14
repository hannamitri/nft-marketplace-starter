import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImageFallback from "../../images/author_thumbnail.jpg";
import nftImageFallback from "../../images/nftImage.jpg";

const AuthorItems = () => {
const { authorId } = useParams();

const [authorItems, setAuthorItems] = useState([]);
const [loading, setLoading] = useState(true);

const placeholders = useMemo(() => new Array(8).fill(null), []);

useEffect(() => {
let isMounted = true;
setLoading(true);


const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authorItems?authorId=${authorId}`;

fetch(url)
.then((res) => res.json())
.then((data) => {
if (!isMounted) return;
setAuthorItems(Array.isArray(data) ? data : []);
})
.catch((err) => console.error("authorItems error:", err))
.finally(() => {
if (!isMounted) return;
setLoading(false);
});

return () => {
isMounted = false;
};
}, [authorId]);

const listToRender = loading ? placeholders : authorItems;

return (
<div className="de_tab_content">
<div className="tab-1">
<div className="row">
{listToRender.map((item, index) => {
const isPlaceholder = loading || !item;
const itemId = item?.id ?? item?._id ?? "";
const title = item?.title ?? item?.nftName ?? "Pinky Ocean";
const price = item?.price ?? 2.52;
const likes = item?.likes ?? 97;

const authorImage = item?.authorImage ?? AuthorImageFallback;
const nftImage = item?.nftImage ?? item?.image ?? nftImageFallback;

return (
<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={itemId || index}>
<div className="nft__item">
<div className="author_list_pp">
<Link
to={isPlaceholder ? "#" : `/author/${authorId}`}
onClick={(e) => isPlaceholder && e.preventDefault()}
>
<img className="lazy" src={authorImage} alt="" />
<i className="fa fa-check"></i>
</Link>
</div>

<div className="nft__item_wrap">
<div className="nft__item_extra">
<div className="nft__item_buttons">
<button disabled={isPlaceholder}>Buy Now</button>
<div className="nft__item_share">
<h4>Share</h4>
<a href="#" onClick={(e) => e.preventDefault()}>
<i className="fa fa-facebook fa-lg"></i>
</a>
<a href="#" onClick={(e) => e.preventDefault()}>
<i className="fa fa-twitter fa-lg"></i>
</a>
<a href="#" onClick={(e) => e.preventDefault()}>
<i className="fa fa-envelope fa-lg"></i>
</a>
</div>
</div>
</div>

<Link
to={isPlaceholder ? "#" : `/item-details/${itemId}`}
onClick={(e) => isPlaceholder && e.preventDefault()}
>
<img src={nftImage} className="lazy nft__item_preview" alt="" />
</Link>
</div>

<div className="nft__item_info">
<Link
to={isPlaceholder ? "#" : `/item-details/${itemId}`}
onClick={(e) => isPlaceholder && e.preventDefault()}
>
<h4>{title}</h4>
</Link>

<div className="nft__item_price">{Number(price).toFixed(2)} ETH</div>

<div className="nft__item_like">
<i className="fa fa-heart"></i>
<span>{likes}</span>
</div>
</div>
</div>
</div>
);
})}
</div>
</div>
</div>
);
};

export default AuthorItems;
