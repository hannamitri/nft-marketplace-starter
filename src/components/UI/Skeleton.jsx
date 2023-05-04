import React from "react";
import "../../css/styles/Skeleton.css"
const Skeleton = ({ width, height, borderRadius , backgroundColor, marginTop,}) => {
 
  return (
   <div>
  
 <div className='loading'
      style={{
        width,
        height,
        borderRadius,
        backgroundColor,
        marginTop,
    
      }}

    >

    </div>
   </div>

    
   
  );
};

 

export default Skeleton;
