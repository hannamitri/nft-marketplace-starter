import { Link } from "react-router-dom";

const AuthorLink = ({ id, children }) => {
  const isValid =
    id &&
    String(id).toLowerCase() !== "undefined" &&
    !isNaN(Number(id));

  if (!isValid) {
    console.warn("🚨 AuthorLink received invalid authorId:", id);
    return <span className="author-link-fallback">{children}</span>;
  }

  return <Link to={`/author/${id}`} className="author-link">{children}</Link>;
};

export default AuthorLink;
