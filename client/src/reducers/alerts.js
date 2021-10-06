/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (alerts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...alerts, action.payload];
    case UPDATE:
      return alerts.map((alert) =>
        alert._id === action.payload._id ? action.payload : alert
      );
    case DELETE:
      return alerts.filter((alert) => alert._id !== action.payload);
    default:
      return alerts;
  }
};
