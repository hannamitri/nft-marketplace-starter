import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EthImage from "../images/ethereum.svg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";
import nftImageFallback from "../images/nftImage.jpg";

const ItemDetails = () => {
const { itemId } = useParams();
const [item, setItem] = useState(null);
const [loading, setLoading] = useState(true);

const isPlaceholder = useMemo(() => loading || !itemId, [loading, itemId]);

useEffect(() => {
window.scrollTo(0, 0);
}, [itemId]);

useEffect(() => {
let mounted = true;

if (!itemId) {
setItem(null);
setLoading(false);
return;
}

setLoading(true);

const url =
"https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=" +
encodeURIComponent(itemId);

fetch(url)
.then((res) => res.json())
.then((data) => {
if (!mounted) return;
setItem(data && typeof data === "object" ? data : null);
})
.catch((err) => console.error("itemDetails error:", err))
.finally(() => {
if (!mounted) return;
setLoading(false);
});

return () => {
mounted = false;
};
}, [itemId]);

// ---- Base fields (dynamic) ----
const title = item?.title || "NFT Item";
const description = item?.description || "";
const likes = item?.likes ?? 0;
const views = item?.views ?? 0;

const image =
item?.nftImage ||
item?.image ||
item?.imageUrl ||
item?.img ||
nftImageFallback;

// ---- Price (dynamic) ----
// supports: price, currentPrice, amount, etc.
const rawPrice =
item?.price ?? item?.currentPrice ?? item?.amount ?? item?.listingPrice ?? 0;
const priceNumber = Number(rawPrice);
const priceDisplay = Number.isFinite(priceNumber) ? priceNumber.toFixed(2) : "0.00";

// ---- Owner (dynamic) ----
// supports nested shapes:
// item.owner.{id,name,image} OR ownerId/ownerName/ownerImage
const ownerId =
item?.ownerId ?? item?.owner?.id ?? item?.owner?.ownerId ?? item?.owner?.authorId ?? "";
const ownerName =
item?.ownerName ?? item?.owner?.name ?? item?.owner?.ownerName ?? "Unknown";
const ownerImage =
item?.ownerImage ?? item?.owner?.image ?? item?.owner?.ownerImage ?? AuthorImageFallback;

// ---- Creator (dynamic) ----
// supports nested shapes:
// item.creator.{id,name,image} OR creatorId/creatorName/creatorImage
// fallback to author if API only returns author fields
const creatorId =
item?.creatorId ??
item?.creator?.id ??
item?.creator?.creatorId ??
item?.authorId ??
item?.author?.authorId ??
"";
const creatorName =
item?.creatorName ??
item?.creator?.name ??
item?.authorName ??
item?.author?.name ??
"Unknown";
const creatorImage =
item?.creatorImage ??
item?.creator?.image ??
item?.authorImage ??
item?.author?.image ??
AuthorImageFallback;

const safeLink = (to) => (isPlaceholder || !to ? "#" : to);

return (
<div id="wrapper">
<div className="no-bottom no-top" id="content">
<div id="top" />

<section aria-label="section" className="mt90 sm-mt-0">
<div className="container">
<div className="row">
<div className="col-md-6 text-center">
{/* ✅ removed "lazy" class */}
<img src={image} className="img-fluid img-rounded mb-sm-30 nft-image" alt={title} />
{isPlaceholder && (
<div style={{ marginTop: 12, opacity: 0.7 }}>
Loading item details…
</div>
)}
</div>

<div className="col-md-6">
<div className="item_info">
<h2>{title}</h2>

<div className="item_info_counts">
<div className="item_info_views">
<i className="fa fa-eye" /> {views}
</div>
<div className="item_info_like">
<i className="fa fa-heart" /> {likes}
</div>
</div>

<p>{description}</p>

{/* OWNER (dynamic) */}
<div className="d-flex flex-row">
<div className="mr40">
<h6>Owner</h6>
<div className="item_author">
<div className="author_list_pp">
<Link
to={safeLink(ownerId ? `/author/${ownerId}` : "")}
onClick={(e) => (isPlaceholder || !ownerId) && e.preventDefault()}
>
<img src={ownerImage} alt={ownerName} />
<i className="fa fa-check" />
</Link>
</div>

<div className="author_list_info">
<Link
to={safeLink(ownerId ? `/author/${ownerId}` : "")}
onClick={(e) => (isPlaceholder || !ownerId) && e.preventDefault()}
>
{ownerName}
</Link>
</div>
</div>
</div>
</div>

<div className="de_tab tab_simple">
<div className="de_tab_content">
{/* CREATOR (dynamic) */}
<h6>Creator</h6>
<div className="item_author">
<div className="author_list_pp">
<Link
to={safeLink(creatorId ? `/author/${creatorId}` : "")}
onClick={(e) => (isPlaceholder || !creatorId) && e.preventDefault()}
>
<img src={creatorImage} alt={creatorName} />
<i className="fa fa-check" />
</Link>
</div>

<div className="author_list_info">
<Link
to={safeLink(creatorId ? `/author/${creatorId}` : "")}
onClick={(e) => (isPlaceholder || !creatorId) && e.preventDefault()}
>
{creatorName}
</Link>
</div>
</div>

<div className="spacer-40" />

{/* PRICE (dynamic) */}
<h6>Price</h6>
<div className="nft-item-price">
<img src={EthImage} alt="ETH" />
<span>{priceDisplay}</span>
</div>
</div>

{!loading && itemId && !item && (
<div style={{ marginTop: 12, color: "#c00" }}>
Couldn’t load item #{itemId}. Check the endpoint or itemId.
</div>
)}
</div>
</div>
</div>

</div>
</div>
</section>
</div>
</div>
);
};

export default ItemDetails;
