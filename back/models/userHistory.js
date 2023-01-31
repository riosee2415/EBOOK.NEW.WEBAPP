const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(10),
          allowNull: false, // 필수
        },
        content: {
          type: DataTypes.STRING(50),
          allowNull: false, // 필수
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "UserHistory",
        tableName: "userHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
