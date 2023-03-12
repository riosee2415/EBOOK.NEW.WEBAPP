const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BannerHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.STRING(100), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true, // 필수
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
        },
      },
      {
        modelName: "BannerHistory",
        tableName: "bannerHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
