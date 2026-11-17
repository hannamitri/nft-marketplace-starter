const AUTHORS_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

export const fetchAuthor = async (id, signal) => {
  const url = `${AUTHORS_URL}?${new URLSearchParams({ author: id })}`;
  const response = await fetch(url, { signal });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Author request failed (${response.status})`);
  const body = await response.text();
  if (!body.trim()) return null;
  const author = JSON.parse(body);
  if (
    !author || typeof author !== "object" || Array.isArray(author) ||
    String(author.authorId) !== String(id) ||
    typeof author.authorName !== "string" ||
    typeof author.authorImage !== "string" ||
    !Array.isArray(author.nftCollection)
  ) {
    throw new Error("Invalid author response");
  }
  return author;
};
