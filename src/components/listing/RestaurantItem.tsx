import React from "react";
import { ListGroup } from "react-bootstrap";
import { Restaurant } from "../../types/restaurants";

type RestaurantItemProps = {
  restaurant: Restaurant;
  isSelected: boolean;
  onSelect: () => void;
};

export const RestaurantItem: React.FC<RestaurantItemProps> = ({
  restaurant,
  isSelected,
  onSelect,
}) => {
  return (
    <ListGroup.Item action onClick={onSelect}>
      <div className="d-flex align-items-start justify-content-between">
        <h5 style={isSelected ? { fontWeight: "bold" } : undefined}>
          {restaurant.name}
        </h5>
        <div className="d-flex gap-1 align-items-center small text-muted">
          {restaurant.rating}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 260 245"
          >
            <path d="m56,237 74-228 74,228L10,96h240" />
          </svg>
        </div>
      </div>
      <p>{restaurant.shortDescription}</p>
    </ListGroup.Item>
  );
};

export default RestaurantItem;
