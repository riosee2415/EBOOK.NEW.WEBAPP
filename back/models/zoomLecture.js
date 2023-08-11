const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 이름 순 으로 오름차순 정렬이 기본값
module.exports = class ZoomLecture extends Model {
  static init(sequelize) {
    return super.init(
      {
        days: {
          // 요일
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },

        startTime: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },

        endTime: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },

        levelValue: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },

        terms: {
          type: DataTypes.STRING(500),
          allowNull: false, // 필수
        },

        tName: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },

        price: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
        },

        isEnd: {
          type: DataTypes.BOOLEAN,
          allowNull: false, // 필수
          defaultValue: false,
        },

        zoomRink: {
          type: DataTypes.TEXT,
          allowNull: false, // 필수
        },
      },
      {
        modelName: "ZoomLecture",
        tableName: "zoomLecture",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
