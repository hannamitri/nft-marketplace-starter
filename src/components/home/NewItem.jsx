import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"

function NewItem({ item }) {
  let timeLeft;
  let cancelId;
  const [secondsText, setSecondsText] = useState();
  const [minutesText, setMinutesText] = useState();
  const [hoursText, setHoursText] = useState();

  useEffect(() => {
    start();
    return () => { cancelAnimationFrame(cancelId) }
  }, [])

  function start() {
    cancelId = requestAnimationFrame(update)
  }

  function update() {
    timeLeft = (item.expiryDate - Date.now());
    let seconds = Math.floor(timeLeft / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    if(timeLeft < 0) {
      cancelAnimationFrame(cancelId);
      return;
    }

    setSecondsText(seconds % 60);
    setMinutesText(minutes % 60);
    setHoursText(hours);
    
    cancelId = requestAnimationFrame(update)
  }

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {
        secondsText > 0 && (
          <div className="de_countdown">{hoursText}h {minutesText}m {secondsText}s</div>
        )
      }
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt=""
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price.toFixed(2)} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  )
}
export default NewItem