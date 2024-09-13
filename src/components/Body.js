import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  //State variable - Super powerful variable
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  // When ever state varaible updates react reconsilation cycle mean re-render the components
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.602684957622195&lng=77.10603218525648&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    console.log(json);
    // not good way so use opetional chaining
    //optional chaining
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  // conditional rendering like a card before rendering
  //   if (listofRestaurants.length == 0) {
  //     return <Shimmer />;
  //   }
  //Normal JS Variable
  //   let listofRestaurants = null;
  //   let listofRestaurants2 = [
  //     {
  //       info: {
  //         id: "754799",
  //         name: "KFC",
  //         cloudinaryImageId: "f44bc9708c514cd2dd6ae0d8b4677214",

  //         costForTwo: "₹250 for two",
  //         cuisines: ["Pizzas", "Pastas", "Italian", "Desserts", "Beverages"],
  //         avgRating: 3.9,

  //         sla: {
  //           deliveryTime: 30,
  //           lastMileTravel: 3,
  //           serviceability: "SERVICEABLE",
  //           slaString: "25-30 mins",
  //           lastMileTravelString: "3.0 km",
  //           iconType: "ICON_TYPE_EMPTY",
  //         },
  //       },
  //     },
  //     {
  //       info: {
  //         id: "754798",
  //         name: "Dominos",
  //         cloudinaryImageId: "f44bc9708c514cd2dd6ae0d8b4677214",

  //         costForTwo: "₹250 for two",
  //         cuisines: ["Pizzas", "Pastas", "Italian", "Desserts", "Beverages"],
  //         avgRating: 4.7,

  //         sla: {
  //           deliveryTime: 30,
  //           lastMileTravel: 3,
  //           serviceability: "SERVICEABLE",
  //           slaString: "25-30 mins",
  //           lastMileTravelString: "3.0 km",
  //           iconType: "ICON_TYPE_EMPTY",
  //         },
  //       },
  //     },
  //     {
  //       info: {
  //         id: "754799",
  //         name: "MCD",
  //         cloudinaryImageId: "f44bc9708c514cd2dd6ae0d8b4677214",

  //         costForTwo: "₹250 for two",
  //         cuisines: ["Pizzas", "Pastas", "Italian", "Desserts", "Beverages"],
  //         avgRating: 4.1,

  //         sla: {
  //           deliveryTime: 30,
  //           lastMileTravel: 3,
  //           serviceability: "SERVICEABLE",
  //           slaString: "25-30 mins",
  //           lastMileTravelString: "3.0 km",
  //           iconType: "ICON_TYPE_EMPTY",
  //         },
  //       },
  //     },
  //   ];

  return listofRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div classsName="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //filter the restaurants card and update the ui
              //Search
              console.log(searchText);

              const filteredRestaurant = listofRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            //Filter logic buddy
            const filteredList = listofRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurants(filteredList);
            // console.log(listofRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default Body;
