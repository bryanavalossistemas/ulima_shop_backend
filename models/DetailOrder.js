import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const DetailOrder = sequelize.define(
  "DetailOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
