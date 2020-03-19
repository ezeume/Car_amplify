module.exports = function(sequelize, DataTypes) {
    var Models = sequelize.define("Model", {
      name: DataTypes.STRING,
      makeId: DataTypes.INTEGER
    },{
      timestamps: false
    })
    return Models;
  };