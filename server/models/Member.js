module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  });
  return Member;
};
