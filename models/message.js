module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        message_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

    });


    Message.associate = function(models) {
        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        });
    };

    return Message;
};