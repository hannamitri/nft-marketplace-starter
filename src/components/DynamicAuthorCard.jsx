import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAuthorById } from "../services/api";

const DynamicAuthorCard = ({
  className,
  authorId,
  "data-bs-toggle": bsToggle = "tooltip",
  "data-bs-placement": bsPlacement = "top",
}) => {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    async function loadAuthor() {
      const data = await fetchAuthorById(authorId);
      if (data) {
        setAuthorData(data);
      }
    }
    if (authorId) {
      loadAuthor();
    }
  }, [authorId]);

  return (
    <Link
      to={`/author/${authorId}`}
      data-bs-toggle={bsToggle}
      data-bs-placement={bsPlacement}
      title={`Creator: ${authorData && authorData.authorName}`}
    >
      <img
        className={className}
        src={authorData ? authorData.authorImage : ""}
        alt={authorData ? authorData.authorName : "Author"}
      />
      <i className="fa fa-check"></i>
    </Link>
  );
};

export default DynamicAuthorCard;
