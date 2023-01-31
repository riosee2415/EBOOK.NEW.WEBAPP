const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class MainBanner extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true, // 필수
        },
        titleUseYn: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
          defaultValue: false,
        },
        content: {
          type: DataTypes.STRING(1000),
          allowNull: true, // 필수
        },
        contentUseYn: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
          defaultValue: false,
        },
        link: {
          type: DataTypes.STRING(300),
          allowNull: true, // 필수
        },
        linkUseYn: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
          defaultValue: false,
        },
        imageURL: {
          type: DataTypes.STRING(1000),
          allowNull: false, // 필수
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 1,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
        },
      },
      {
        modelName: "MainBanner",
        tableName: "mainBanners",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
