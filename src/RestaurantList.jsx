// HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
} from "@mui/material";

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
      <AppBar position="static" sx={{ background: "white", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <Toolbar>
          <p style={{color:'grey'}}>Pre Order From </p>
          {/* Add your location symbol or any other icons here */}
          <span role="img" aria-label="Location">
            📍
          </span>
          <p style={{color:'black'}}>Location</p>
        </Toolbar>
      </AppBar>

      <Container>
        <section>
          <h2>Popular Ones</h2>
          <Grid container spacing={2}>
            {restaurants.map((restaurant) => (
              <Grid key={restaurant.restaurant_id} item xs={12} sm={6} md={4}>
                <Card sx={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={restaurant.images[0]?.url}
                    alt={restaurant.restaurant_name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Link to={`/restaurant/${restaurant.restaurant_id}`}>
                      <Typography variant="h6">{restaurant.restaurant_name}</Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      Location: {restaurant.location?.location_address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Cost for Two: {restaurant?.avg_cost_for_two}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
