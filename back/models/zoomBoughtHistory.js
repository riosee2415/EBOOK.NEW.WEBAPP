const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 이름 순 으로 오름차순 정렬이 기본값
module.exports = class ZoomBoughtHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        impUid: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        merchantUid: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        payment: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        payType: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        isPay: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        modelName: "ZoomBoughtHistory",
        tableName: "zoomBoughtHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    ZoomBoughtHistory.belongsTo(db.User);
    ZoomBoughtHistory.belongsTo(db.ZoomLecture);
  }
};
