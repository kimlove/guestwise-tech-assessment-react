export const getRestaurants = async () => {
  try {
    const response = await fetch("http://localhost:3001/restaurants");
    return response.json();
  } catch (error) {
    console.error("Failed to fetch restaurants", error);
    return null;
  }
};

export const getRestaurantDetails = async (id: number) => {
  const response = await fetch(`http://localhost:3001/restaurants/${id}`);
  return response.json();
};
