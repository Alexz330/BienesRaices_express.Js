import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Propiedad =  db.define('propiedades',{
    id:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },

    titulo:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    descripcion:{
        tpye: DataTypes.TEXT,
        allowNull:false
    },
    habitaciones:{
        tpye:DataTypes.INTEGER,
        allowNull:false

    },
    estacionamiento:{
        tpye:DataTypes.INTEGER,
        allowNull:false

    },
    wc:{
        tpye:DataTypes.INTEGER,
        allowNull:false

    },

    calle:{
        type:DataTypes.STRING(60),
        allowNull:false,
    },
    lat:{
        tpye:DataTypes.STRING,
        allowNull:false
    },
    lng:{
        type:DataTypes.STRING,
        allowNull:false
    },

    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    puclicado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },


})

export default Propiedad;