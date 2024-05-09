module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    like_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      sutoIncrement: true,
    },
  });

  Like.associate = (models) => {
    Like.belongsTo(models.Member, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'cascade',
      hooks: true,
    });

    Like.belongsTo(models.Board, {
      foreignKey: 'board_id',
      sourceKey: 'board_id',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  return Like;
};
