const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 베너
module.exports = class Banner extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.INTEGER,
          // 1. main
          // 2. curriculum
          // 3. review
          // 4. service-center
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
        imagePath: {
          type: DataTypes.STRING(700),
          allowNull: true,
        },
        mobileImagePath: {
          type: DataTypes.STRING(700),
          allowNull: true,
        },
      },

      {
        modelName: "Banner",
        tableName: "banner",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }

  static associate(db) {}
};
