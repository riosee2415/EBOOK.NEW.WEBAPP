const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class LevelTest extends Model {
  static init(sequelize) {
    return super.init(
      {
        number: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          default: 1,
        },

        value: {
          type: DataTypes.TEXT,
          allowNull: false, // 필수
        },

        isHide: {
          type: DataTypes.BOOLEAN,
          allowNull: false, // 필수
          defaultValue: false,
        },
      },
      {
        modelName: "LevelTest",
        tableName: "levelTest",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
