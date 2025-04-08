async function listOfRestaurantsJS() {
    const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.6183666&lng=85.0999572&is-seo-homepage-enabled=true"
    );
    
    const jsonData = await response.json();

    const restaurantArray = jsonData?.data?.cards?.[1].card?.card?.gridElements?.infoWithStyle?.restaurants;
    console.log(restaurantArray);
    return Array.isArray(restaurantArray) ? restaurantArray : [];
}

export default listOfRestaurantsJS;