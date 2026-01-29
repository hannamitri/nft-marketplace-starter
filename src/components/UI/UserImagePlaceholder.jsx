import React from 'react'

// In the event an author or user does not have image data, this placeholder will serve as the image as long as there is an authorName value
const UserImagePlaceholder = ({ authorName, width, height }) => {
    let initials = "";
    
    if (typeof authorName === "string") {
        initials = authorName
            .split(/[ -]/)
            .map((theName) => theName[0].toUpperCase())
            .join("");
    }

  return (
    <div 
    className="author-image-placeholder"
    style={{
      width,
      height,
    }}
    >
        {initials}
    </div>
  )
}

export default UserImagePlaceholder