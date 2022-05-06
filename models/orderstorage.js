'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderStorage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderStorage.init({
    id: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    amount_total: DataTypes.INTEGER,
    order_total: DataTypes.INTEGER,
    shippingAddress: DataTypes.STRING,
    orderActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'orderStorage',
  });
  return orderStorage;
};