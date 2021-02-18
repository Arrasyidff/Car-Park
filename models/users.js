'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Slots, {
        foreignKey: "slot_id",
        targetKey: "id"
      })
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "name cant be empty"
        }
      }
    },
    car_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "car_name cant be empty"
        }
      }
    },
    plats: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "plat cant be empty"
        }
      }
    },
    slot_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};