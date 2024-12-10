import React, { useState } from "react";

const TableComponent = ({ data, uniqueCategories }) => {
  const [showHoverDiv, setShowHoverDiv] = useState(false);

  const fun = (categoryId) => {
    console.log("Category ID:", categoryId);
    // Perform your logic with the categoryId here
  };

  return (
    <div>
      {/* Your Box component or whatever triggers the hover */}
      <div onMouseEnter={() => setShowHoverDiv(true)} onMouseLeave={() => setShowHoverDiv(false)}>
        <button>Hover over me to show table</button>
      </div>

      {showHoverDiv && (
        <div
          onMouseLeave={() => setShowHoverDiv(false)}
          className="hover-div"
          style={{
            position: "absolute",
            background: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          <div className="categories-container" style={{ display: "flex", flexDirection: "column" }}>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
