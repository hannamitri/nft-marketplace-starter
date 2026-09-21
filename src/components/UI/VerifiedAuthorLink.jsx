import React from "react";
import { Link } from "react-router-dom";

const VerifiedAuthorLink = ({
  authorId,
  image,
  alt,
  title,
  imageClassName = "lazy",
  linkClassName,
  children,
}) => (
  <Link
    to={`/${authorId}/author`}
    title={title}
    className={linkClassName}
  >
    <img className={imageClassName} src={image} alt={alt} />
    <i className="fa fa-check" aria-hidden="true"></i>
    {children}
  </Link>
);

export default VerifiedAuthorLink;
