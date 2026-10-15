import React from "react";

// Values are passed straight to the explore API (?filter=...),
// so sorting happens on the server instead of in the browser.
const filterOptions = [
  { value: "", label: "Default" },
  { value: "price_low_to_high", label: "Price, Low to High" },
  { value: "price_high_to_low", label: "Price, High to Low" },
  { value: "likes_high_to_low", label: "Most liked" },
];

const ExploreFilter = ({ value, onChange }) => {
  return (
    <div>
      <select
        id="filter-items"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExploreFilter;
