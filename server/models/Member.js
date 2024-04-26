module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    user_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
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

  Member.associate = (models) => {
    //Board테이블에 외래키로 user_num을 준다
    Member.hasMany(models.Board, {
      foreignKey: 'user_id',
    });
    //Like 1:1
    Member.hasOne(models.Like, {
      foreignKey: 'user_id',
    });
    //Comment 1:N
    Member.hasMany(models.Comment, {
      foreignKey: 'user_id',
    });
  };

  return Member;
};
