import axios from "axios";

const authorUrlAuthor =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=";

export async function fetchAuthorById(authorId) {
  if (!authorId) return null;
  
  try {
    const { data } = await axios.get(`${authorUrlAuthor}${authorId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching author with ID ${authorId}:`, error);
    return null;
  }
}