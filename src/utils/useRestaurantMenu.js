import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.6183666&lng=85.0999572&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const response = await data.json();
        setResInfo(response?.data);

      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();

  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;