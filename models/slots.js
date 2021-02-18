'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slots.hasMany(models.Users, {
        foreignKey: "slot_id",
        sourceKey: "id"
      })
    }
  };
  Slots.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "name cant be empty"
        },
        isUppercase: {
          args: true,
          msg: "name must be uppercase"
        }
      }
    },
    quota: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [5],
          msg: "quota must be more than equal 5"
        },
        isInt: {
          args: true,
          msg: "quota must be number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Slots',
  });
  return Slots;
};