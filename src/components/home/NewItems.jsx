import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthorImageFallback from "../../images/author_thumbnail.jpg";
import nftImageFallback from "../../images/nftImage.jpg";

const NEW_ITEMS_URL =
"https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

function formatCountdown(ms) {
if (!Number.isFinite(ms) || ms <= 0) return "0h 0m 0s";

const totalSeconds = Math.floor(ms / 1000);
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

return `${hours}h ${minutes}m ${seconds}s`;
}

const NewItems = () => {
const [newItems, setNewItems] = useState([]);
const [loading, setLoading] = useState(true);


const [now, setNow] = useState(Date.now());

const sliderSettings = useMemo(
() => ({
infinite: true,
speed: 500,
slidesToShow: 4,
slidesToScroll: 1,
arrows: true,
dots: false,
responsive: [
{ breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
{ breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
{ breakpoint: 560, settings: { slidesToShow: 1, slidesToScroll: 1 } },
],
}),
[]
);

useEffect(() => {
let mounted = true;
setLoading(true);

fetch(NEW_ITEMS_URL)
.then((res) => res.json())
.then((data) => {
if (!mounted) return;
setNewItems(Array.isArray(data) ? data : []);
})
.catch((err) => console.error("newItems error:", err))
.finally(() => {
if (!mounted) return;
setLoading(false);
});

return () => {
mounted = false;
};
}, []);


useEffect(() => {
const id = setInterval(() => setNow(Date.now()), 1000);
return () => clearInterval(id);
}, []);

const list = loading ? new Array(7).fill(null) : newItems;

return (
<section id="section-items" className="no-bottom">
<div className="container">
<div className="row">
<div className="col-lg-12">
<div className="text-center">
<h2>New Items</h2>
<div className="small-border bg-color-2" />
</div>
</div>

<div className="col-lg-12">
<Slider {...sliderSettings}>
{list.map((item, index) => {
const isSkeleton = loading || !item;

const id = item?.id ?? `skeleton-${index}`;
const authorId = item?.authorId ?? "";
const nftId = item?.nftId ?? "";

const authorImage = item?.authorImage || AuthorImageFallback;
const nftImage = item?.nftImage || nftImageFallback;

const title = item?.title || "New Item";
const price = item?.price ?? 0;
const likes = item?.likes ?? 0;
const expiryDate = Number(item?.expiryDate);
const hasCountdown =
Number.isFinite(expiryDate) && expiryDate > now;

const countdownMs = expiryDate - now;

const authorTo = authorId ? `/author/${authorId}` : null;
const itemTo = nftId ? `/item-details/${nftId}` : null;

return (
<div key={id}>
<div className={`nft__item ${isSkeleton ? "skeleton-card" : ""}`}>
{/* author */}
<div className="author_list_pp">
{isSkeleton ? (
<div className="skeleton skeleton-avatar" />
) : authorTo ? (
<Link
to={authorTo}
data-bs-toggle="tooltip"
data-bs-placement="top"
title="Creator"
>
<img src={authorImage} alt="Author" />
<i className="fa fa-check" />
</Link>
) : (
<div>
<img src={authorImage} alt="Author" />
<i className="fa fa-check" />
</div>
)}
</div>

{isSkeleton ? (
<div className="skeleton skeleton-countdown" />
) : hasCountdown ? (
<div className="de_countdown">{formatCountdown(countdownMs)}</div>
) : (
<div className="de_countdown" style={{ visibility: "hidden" }}>
0h 0m 0s
</div>
)}

<div className="nft__item_wrap">
<div className="nft__item_extra">
<div className="nft__item_buttons">
<button type="button">Buy Now</button>
<div className="nft__item_share">
<h4>Share</h4>
<a href="#" onClick={(e) => e.preventDefault()}>
<i className="fa fa-facebook fa-lg" />
</a>
<a href="#" onClick={(e) => e.preventDefault()}>
<i className="fa fa-twitter fa-lg" />
</a>
<a href="#" onClick={(e) => e.preventDefault()}>
<i className="fa fa-envelope fa-lg" />
</a>
</div>
</div>
</div>

{isSkeleton ? (
<div className="skeleton skeleton-img" />
) : itemTo ? (
<Link to={itemTo}>

<img
src={nftImage}
className="nft__item_preview"
alt={title}
/>
</Link>
) : (
<img
src={nftImage}
className="nft__item_preview"
alt={title}
/>
)}
</div>

{/* info */}
<div className="nft__item_info">
{isSkeleton ? (
<>
<div className="skeleton skeleton-title" />
<div className="skeleton skeleton-subtitle" />
</>
) : (
<>
{itemTo ? (
<Link to={itemTo}>
<h4>{title}</h4>
</Link>
) : (
<h4>{title}</h4>
)}

<div className="nft__item_price">
{Number(price).toFixed(2)} ETH
</div>

<div className="nft__item_like">
<i className="fa fa-heart" />
<span>{likes}</span>
</div>
</>
)}
</div>
</div>
</div>
);
})}
</Slider>
</div>
</div>
</div>
</section>
);
};

export default NewItems;
