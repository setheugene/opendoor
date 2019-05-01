module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        message_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        admin_status: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
        },

    });


    Message.associate = function(models) {
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Message;
};