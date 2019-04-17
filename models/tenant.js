module.exports = function(sequelize, DataTypes) {
    var Tenant = sequelize.define("Tenant", {
        real_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rent_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        },
        rent_paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        contact: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: 9
            }
        }

    });

    // Tenant.associate = function(models) {
    //     Tenant.belongsTo(models.User, {
    //         foreignKey: {
    //             name: 'user_id',
    //             allowNull: false
    //         }
    //     });
    // };

    return Tenant;
}