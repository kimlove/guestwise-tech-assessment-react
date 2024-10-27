import React from "react";
import { Button } from "react-bootstrap";

type SortOptionsProps = {
  sortBy: "default" | "name" | "rating";
  onSortChange: (sortType: "default" | "name" | "rating") => void;
};

export const SortOptions: React.FC<SortOptionsProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="d-flex align-items-center gap-1 mb-2">
      Sort By:
      {["default", "name", "rating"].map((type) => (
        <Button
          key={type}
          variant="link"
          onClick={() => onSortChange(type as "default" | "name" | "rating")}
          className={sortBy === type ? "text-primary font-weight-bold" : ""}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default SortOptions;
