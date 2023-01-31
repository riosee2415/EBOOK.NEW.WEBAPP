const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Kakaoch extends Model {
  static init(sequelize) {
    return super.init(
      {
        useYn: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
        },
        imageURL: {
          type: DataTypes.STRING(700),
          allowNull: false, // 필수
        },
        URL: {
          type: DataTypes.STRING(300),
          allowNull: false, // 필수
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "Kakaoch",
        tableName: "kakaoch",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
