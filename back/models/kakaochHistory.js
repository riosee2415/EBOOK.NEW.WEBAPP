const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KakaochHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
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
        modelName: "KakaochHistory",
        tableName: "kakaochHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
