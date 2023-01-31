const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 이름 순 으로 오름차순 정렬이 기본값
module.exports = class FaqType extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },

        updator: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },

        isDelete: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
          defaultValue: false,
        },

        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "FaqType",
        tableName: "faqType",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
