const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TagConnect extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "TagConnect",
        tableName: "tagConnect",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.TagConnect.belongsTo(db.Tag);
    db.TagConnect.belongsTo(db.Lecture);
  }
};
