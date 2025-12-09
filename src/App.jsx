import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

const App = () => {
  const [filters, setFilters] = useState([]);

  const categories = [...new Set(data.map(item => item.category))];

  const toggleFilter = (category) => {
    setFilters(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  const handleCardClick = (item) => {
  if (item.connector === false) {
    window.parent.postMessage(
  { openGHL: true, itemName: item.name },
  "*" // or the exact origin of the parent
);

   
  } else {
   
    window.open(item.url, "_blank");
  }
};


  const filteredData =
    filters.length === 0 ? data : data.filter(item => filters.includes(item.category));

  return (
    <div className="filter-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Filters</h3>
        {categories.map(category => (
          <label key={category} className="category">
            <input
              type="checkbox"
              checked={filters.includes(category)}
              onChange={() => toggleFilter(category)}
            />
            {category}
          </label>
        ))}
      </aside>

      {/* Cards */}
      <div className="cards-container">
        {filteredData.map(item => (
          <div
            className="card"
            key={item.name}
            onClick={() => handleCardClick(item)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.name} />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <span className="tag">{item.tag}</span>
          </div>
        ))}
      </div>


    </div>
  );
};

export default App;
