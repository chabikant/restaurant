
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    // Fetch additional details for the selected restaurant using the restaurantId
    fetch(`https://staging.fastor.in/v1/m/restaurant/details?res_id=${restaurantId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Log the API response
        setRestaurantDetails(data);
      })
      .catch((error) => console.error("Error fetching restaurant details:", error));
  }, [restaurantId]);

  if (!restaurantDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Restaurant Details</h2>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={restaurantDetails.featured_image}
          alt={restaurantDetails.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6">{restaurantDetails.name}</Typography>
          <Typography variant="body2">Location: {restaurantDetails.location?.address}</Typography>
          <Typography variant="body2">Cuisine: {restaurantDetails.cuisines}</Typography>
          <Typography variant="body2">Average Cost for Two: {restaurantDetails.average_cost_for_two}</Typography>
          {/* Add more details as needed */}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDetails;



