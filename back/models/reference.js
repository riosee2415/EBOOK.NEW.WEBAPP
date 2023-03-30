const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Reference extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        title: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        file: {
          type: DataTypes.STRING(2000), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true,
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
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "Reference",
        tableName: "reference",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
