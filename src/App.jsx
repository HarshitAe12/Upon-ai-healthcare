import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";

const App = () => {
  const [filters, setFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);


  const categories = [...new Set(data.map(item => item.category))];

  const toggleFilter = (category) => {
    setFilters(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
useEffect(() => {
  const interval = setInterval(() => {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ height }, "*");
  }, 400);

  return () => clearInterval(interval);
}, []);


  const handleCardClick = (item) => {
    if (item.connector === false) {
      window.parent.postMessage(
        { openGHL: true, itemName: item.name },
        "*"
      );
    } else {
      window.open(item.url, "_blank");
    }
  };

  const filteredData = data.filter(item => {
    const matchesFilter = filters.length === 0 || filters.includes(item.category);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="filter-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Filters</h3>

        {/* Styled Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

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
        {filteredData.length > 0 ? (
          filteredData.slice(0, visibleCount).map(item => (
            <div
              className="card #button-o0UgIxf7i2"
              key={item.name}
              onClick={() => handleCardClick(item)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <span className="tag">{item.tag}</span>
            </div>
          ))
        ) : (
          <p className="no-results">No items found. Try a different search.</p>
        )}
         {visibleCount < filteredData.length && (
    <button className="load-more-btn" onClick={() => setVisibleCount(prev => prev + 20)}>
      Load More
    </button>
  )}
      </div>
    </div>
  );
};

export default App;
