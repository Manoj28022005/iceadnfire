import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Cards/Card";
import Carousal from "../components/Carousal";

function Home() {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/food-item-names`);
        const items = await response.json();
        setFoodItems(items);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Carousal setSearch={setSearch} />
      <div className="container d-flex flex-wrap justify-content-around gap-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div className="col-md-5 d-flex justify-content-center mb-4" key={index}>
              <Card
                id={item._id}
                title={item.name}
                image={item.img}
                description={item.description}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <div>No items found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
