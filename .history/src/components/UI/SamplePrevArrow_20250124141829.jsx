function SamplePrevArrow = (props) => {
    const {onClick } = props;
    return (
      <div
        className='sliderArrow CarL'
        style={{ display: "block" }}
        onClick={onClick}
      >
        ‹
      </div>
    );
  }