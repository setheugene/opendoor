module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Message, {
            onDelete: "cascade"
        });
    };

    return User;
}