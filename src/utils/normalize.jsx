import React from "react";
//this deals with the issue of the API calling variables ownerId and creatorId versus the routing at authorId.
//It is only called in ItemDetails because that's the only deviation from authorId

export function normalize(item) {
  return {
    ...item,
    authorId: item.authorId ?? item.ownerId ?? item.creatorId ?? null,
  };
}
