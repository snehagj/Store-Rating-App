module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    score: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT }
  }, {
    tableName: 'ratings'
  });

  Rating.associate = models => {
    Rating.belongsTo(models.User, { foreignKey: 'userId' });
    Rating.belongsTo(models.Store, { foreignKey: 'storeId' });
  };

  return Rating;
};
