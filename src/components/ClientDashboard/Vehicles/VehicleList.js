import React from "react";
import EachVehicle from "./EachVehicle.js";

const VehicleList = (props) => {
  return (
    <div>
      {props.vehicles.map((vehicle) => (
        <EachVehicle key={vehicle.carId} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleList;
