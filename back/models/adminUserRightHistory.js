const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class AdminUserRightHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        returnId: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
        memo: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "AdminUserRightHistory",
        tableName: "adminUserRightHistorys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
