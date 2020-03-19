module.exports = function(sequelize, DataTypes) {
  var Makes = sequelize.define("Make", {
    name: DataTypes.STRING,
  },{
    timestamps: false
  })
  return Makes;
};
