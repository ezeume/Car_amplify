module.exports = function (sequelize, DataTypes) {
    var PastSearches = sequelize.define("PastSearch", {
        year: DataTypes.STRING,
        make: DataTypes.STRING,
        model: DataTypes.STRING
    }, {
        timestamps: false
    })
    return PastSearches;
};