// RestaurantDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`https://staging.fastor.in/v1/m/restaurant/${id}`);
        const data = await response.json();
        console.log('Fetched Restaurant Details:', data); // Log the fetched data
        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{restaurant.restaurant_name} Details</h1>
      {restaurant.images?.[0] && (
        <img src={restaurant.images[0].url} alt={restaurant.restaurant_name} />
      )}
      <p>Description: {restaurant.description}</p>
      <p>Address: {restaurant.location?.location_address}</p>
      <p>Cuisine: {restaurant.cuisine_type}</p>
      <p>Price Range: {restaurant.price_range}</p>
      <p>Average Cost for Two: {restaurant.avg_cost_for_two}</p>
      <p>Ratings: {restaurant.ratings}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RestaurantDetails;
