module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'stores'
  });

  Store.associate = models => {
    Store.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    Store.hasMany(models.Rating, { foreignKey: 'storeId' });
  };

  return Store;
};
