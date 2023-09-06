import { getHotCollections } from "./hotcollections";
import { getNewItems } from "./newitems";

export async function getCombinedCollections() {
    try {
      
      const hotCollections = await getHotCollections();
      
     
      const newCollections = await getNewItems();
  
      
      return [...hotCollections, ...newCollections];
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }