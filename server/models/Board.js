module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    board_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });

  Board.associate = (models) => {
    Board.hasMany(models.Like, {
      foreignKey: 'board_id',
    });
    Board.hasMany(models.Comment, {
      foreignKey: 'board_id',
    });

    //1:N
    //Member테이블에서 user_num을 외래키로 받아온다
    //CASECADE로 Member의 user_num아 수정/삭제되면 같이 변하도록 함
    Board.belongsTo(models.Member, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return Board;
};
