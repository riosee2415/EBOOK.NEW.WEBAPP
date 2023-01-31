const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class CompanyInfoHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        type: {
          type: DataTypes.STRING(100), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        name: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        value: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "CompanyInfoHistory",
        tableName: "companyInfoHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
