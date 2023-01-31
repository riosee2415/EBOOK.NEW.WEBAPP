const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class SnsInfo extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(100),
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
        link: {
          type: DataTypes.STRING(500),
          allowNull: false, // 필수
        },
        useYn: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 1,
        },
      },
      {
        modelName: "SnsInfo",
        tableName: "snsInfo",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
