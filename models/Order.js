import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstDirection: {
      type: DataTypes.STRING,
    },
    secondDirection: {
      type: DataTypes.STRING,
    },
    district: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    cardNumber: {
      type: DataTypes.STRING,
    },
    nameOnCard: {
      type: DataTypes.STRING,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    expiration: {
      type: DataTypes.STRING,
    },
    shippingMethod: {
      type: DataTypes.STRING,
    },
    ccv: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
