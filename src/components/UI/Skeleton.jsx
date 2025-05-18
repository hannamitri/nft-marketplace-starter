
const Skeleton = ({ height, width }) => {
  return (
    <div
      className="skeleton"
      style={{
        height: height || "100px",
        width: width || "100%",
      }}
    ></div>
  );
};
export default Skeleton;
