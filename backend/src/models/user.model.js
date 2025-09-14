module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: true }
  }, {
    tableName: 'users'
  });

  User.associate = models => {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    User.hasMany(models.Rating, { foreignKey: 'userId' });
  };

  return User;
};
