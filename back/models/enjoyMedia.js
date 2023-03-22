const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class EnjoyMedia extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "EnjoyMedia",
        tableName: "enjoyMedia",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.EnjoyMedia.belongsTo(db.User);
    db.EnjoyMedia.belongsTo(db.Media);
  }
};
