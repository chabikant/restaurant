import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {AppBar} from "@mui/material";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch the list of restaurants
    fetch("https://staging.fastor.in/v1/m/restaurant?city_id=118&&", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  return (
    <div>
      
      <AppBar sx={{height:"50px", color:'Window'}}>
        <p style={{font:'bold', color:""}}>Pre Order From </p>
      </AppBar>

      <section>
        <h2>List of Restaurants</h2>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.restaurant_id}>
              <Link to={`/restaurant/${restaurant.restaurant_id}`}>
                <h3>{restaurant.restaurant_name}</h3>
              </Link>
              <p>Location: {restaurant.location?.location_address}</p>
              <p>Average Cost for Two: {restaurant?.avg_cost_for_two}</p>
              <img
                src={restaurant.images[0]?.url}
                alt={restaurant.restaurant_name}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
