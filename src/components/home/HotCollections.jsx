import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import AuthorImageFallback from "../../images/author_thumbnail.jpg";
import nftImageFallback from "../../images/nftImage.jpg";

const HOT_COLLECTIONS_URL =
"https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
const [hotCollections, setHotCollections] = useState([]);
const [loading, setLoading] = useState(true);

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

fetch(HOT_COLLECTIONS_URL)
.then((res) => res.json())
.then((data) => {
if (!mounted) return;
setHotCollections(Array.isArray(data) ? data : []);
})
.catch((err) => console.error("hotCollections error:", err))
.finally(() => {
if (!mounted) return;
setLoading(false);
});

return () => {
mounted = false;
};
}, []);

const list = loading ? new Array(6).fill(null) : hotCollections;

return (
<section id="section-collections" className="no-bottom">
<div className="container">
<div className="row">
<div className="col-lg-12">
<div className="text-center">
<h2>Hot Collections</h2>
<div className="small-border bg-color-2" />
</div>
</div>

<div className="col-lg-12">
<Slider {...sliderSettings}>
{list.map((item, index) => {
const isSkeleton = loading || !item;

const id = item?.id ?? `skeleton-${index}`;
const nftId = item?.nftId;
const authorId = item?.authorId;

const nftImage = item?.nftImage || nftImageFallback;
const authorImage = item?.authorImage || AuthorImageFallback;

const title = item?.title || "Hot Collection";
const code = item?.code ?? item?.tag ?? "ERC-192";

const itemTo = nftId ? `/item-details/${nftId}` : null;
const authorTo = authorId ? `/author/${authorId}` : null;

return (
<div key={id}>
<div className="nft_coll">
<div className="nft_wrap">
{isSkeleton ? (
<div className="skeleton skeleton-img" />
) : itemTo ? (
<Link to={itemTo}>
{/* ✅ removed "lazy" class to avoid template lazy CSS hiding images */}
<img src={nftImage} className="img-fluid" alt={title} />
</Link>
) : (
<img src={nftImage} className="img-fluid" alt={title} />
)}
</div>

<div className="nft_coll_pp">
{isSkeleton ? (
<div className="skeleton skeleton-avatar" />
) : authorTo ? (
<Link to={authorTo}>
<img className="pp-coll" src={authorImage} alt="Author" />
</Link>
) : (
<img className="pp-coll" src={authorImage} alt="Author" />
)}
<i className="fa fa-check" />
</div>

<div className="nft_coll_info">
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
<span>{String(code).startsWith("ERC") ? code : `ERC-${code}`}</span>
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

export default HotCollections;
