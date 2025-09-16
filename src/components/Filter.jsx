import React from "react";
import { useSearchParams } from "react-router-dom";

const FILTER_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_low_to_high", label: "Price, Low -> High" },
  { value: "price_high_to_low", label: "Price, High -> Low" },
  { value: "likes_high_to_low", label: "Most Liked" },
];
const Filter = ({
  paramName = "filter",
  className = "",
  id = "filter_items",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get(paramName) || "";

  const handleChange = (e) => {
    const v = e.target.value;
    if (v) searchParams.set(paramName, v);
    else searchParams.delete(paramName);
    setSearchParams(searchParams);
  };

  return (
    <select
      id={id}
      className={className}
      value={current}
      onChange={handleChange}
    >
      {FILTER_OPTIONS.map(({ value, label }) => (
        <option key={value || "default"} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Filter;
