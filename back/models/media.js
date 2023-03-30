const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 강의구매
module.exports = class Media extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        mediaOriginName: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        mediaPath: {
          type: DataTypes.STRING(700),
          allowNull: true,
        },
        duration: {
          type: DataTypes.STRING(300),
          defaultValue: "0",
          allowNull: true,
        },
        sampleMediaOriginName: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        sampleMediaPath: {
          type: DataTypes.STRING(700),
          allowNull: true,
        },
        sampleDuration: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        testId: {
          type: DataTypes.STRING(700),
          allowNull: false,
        },
        isSample: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Media",
        tableName: "media",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
