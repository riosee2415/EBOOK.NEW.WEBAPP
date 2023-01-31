const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Logo extends Model {
  static init(sequelize) {
    return super.init(
      {
        // H, F
        typeOf: {
          type: DataTypes.STRING(300),
          allowNull: false, // 필수
        },
        imageURL: {
          type: DataTypes.STRING(500),
          allowNull: false, // 필수
        },
        updateor: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "Logo",
        tableName: "logo",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
