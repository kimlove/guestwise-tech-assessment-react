type RestaurantDetails = {
  address: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  contactEmail: string;
};

export type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
  cuisine: string;
  rating: number;
  details: RestaurantDetails;
};
