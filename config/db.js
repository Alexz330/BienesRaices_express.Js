import Sequelize from "sequelize";
import dotenv from "dotenv"
dotenv.config({path:".env"})

const db = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS ?? "",
  {
    host: process.env.BD_HOST,
    port: 3307,
    dialect: "mysql",
    difine: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 1000,
    },
    operatorAliases: false,
  }
);

export default db;
