import React from "react";

const arrowBaseStyle = {
    display: "block",
    background: "transparent",
    zIndex: 2,
    fontSize: "32px", 
    width: "50px",
    height: "50px",
    lineHeight: "45px",
    textAlign: "center", 
};

export const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...arrowBaseStyle,
                right: "10px",
                borderRadius: "50%",
                border: "1px solid black",
                background: "white",
            }}
            onClick={onClick}
        />
    );
};

export const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...arrowBaseStyle,
                left: "10px",
                borderRadius: "50%",
                border: "1px solid black",
                background: "white",

            }}
            onClick={onClick}
        />
    );
};
