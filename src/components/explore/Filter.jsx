import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {

  return (
    <div>
      <select
        id="filter-items"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="">Default</option>

        <option value="price_low_to_high">
          Price, Low to High
        </option>

        <option value="price_high_to_low">
          Price, High to Low
        </option>

        <option value="likes_high_to_low">
          Most liked
        </option>
      </select>
    </div>
  );
};

export default Filter;
