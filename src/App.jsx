import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterMobileNumber from "./EnterMobileNumber";
import RestaurantList from "./RestaurantList";
import RestaurantDetails from "./RestaurantDetails";
// import RestaurantList from "./RestaurantList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterMobileNumber />} />
        <Route path="/login" element={<EnterMobileNumber />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
