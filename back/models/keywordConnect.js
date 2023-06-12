const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KeywordConnect extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "KeywordConnect",
        tableName: "keywordConnect",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.KeywordConnect.belongsTo(db.Keyword);
    db.KeywordConnect.belongsTo(db.User);
  }
};
