module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Member, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'cascade',
      hooks: true,
    });
    Comment.belongsTo(models.Board, {
      foreignKey: 'board_id',
      sourceKey: 'board_id',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  return Comment;
};
