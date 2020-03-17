module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define("Car", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Car;
};
