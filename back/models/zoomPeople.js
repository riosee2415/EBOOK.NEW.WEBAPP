const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 이름 순 으로 오름차순 정렬이 기본값
module.exports = class ZoomPeople extends Model {
  static init(sequelize) {
    return super.init(
      {
        isCompleted: {
          // 요일
          type: DataTypes.BOOLEAN,
          allowNull: false, // 필수
          defaultValue: false,
        },
      },
      {
        modelName: "ZoomPeople",
        tableName: "zoomPeople",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    ZoomPeople.belongsTo(db.User);
    ZoomPeople.belongsTo(db.ZoomLecture);
  }
};
