import React from 'react'

const Loadingstate = ({array}) => {
  return(<>
     {new Array(array).fill(0).map((element, index) => (
              <div className="wrapper" key={index}>
                          <div className="nft_coll  ">
                            <div className="nft_wrap skelton-box">   
                            </div>
                            <div className="pp-skelly">
                            <div className=" skelton-pp">
                              _
                            </div>
                              <i className="fa fa-check"></i>
                              </div>
                            <div className="nft_coll_info ">
                            
                              <div className="skelton-title"></div>
                              <span className="skelton-code"></span>
                            </div>
                          </div>
                        </div>
                        
                        ))}
 </>      )                 
}

export default Loadingstate
