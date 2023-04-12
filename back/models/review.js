const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 수강후기
module.exports = class Review extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        title: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false, // 필수
        },
        hit: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        previousUserId: {
          type: DataTypes.STRING(700),
          allowNull: true,
        },
        isOk: {
          type: DataTypes.BOOLEAN, // 관리자 승인 여부 -> 승인시 리스트에서 보임
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        modelName: "Review",
        tableName: "review",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Review.belongsTo(db.User);
  }
};
