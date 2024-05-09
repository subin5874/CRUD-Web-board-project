module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    board_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });

  Board.associate = (models) => {
    Board.hasMany(models.Comment, {
      foreignKey: 'board_id',
      onDelete: 'cascade',
    });
    Board.hasMany(models.Like, {
      foreignKey: 'board_id',
      onDelete: 'cascade',
    });
    Board.belongsTo(models.Member, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  return Board;
};
