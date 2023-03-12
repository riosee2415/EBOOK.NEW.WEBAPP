const DataTypes = require("sequelize");
const { Model } = DataTypes;

//결제내역
module.exports = class BoughtLecture extends Model {
  static init(sequelize) {
    return super.init(
      {
        mobile: {
          type: DataTypes.STRING(30),
          defaultValue: "-",
          allowNull: false,
        },
        receiver: {
          type: DataTypes.STRING(200),
          defaultValue: "-",
          allowNull: false,
        },
        zoneCode: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: false,
        },
        payType: {
          type: DataTypes.STRING(200),
          defaultValue: "-",
          allowNull: false,
        },
        pay: {
          type: DataTypes.STRING(200),
          defaultValue: "-",
          allowNull: false,
        },
        lectureType: {
          type: DataTypes.STRING(200),
          defaultValue: "-",
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(200),
          defaultValue: "-",
          allowNull: false,
        },
        recentlyTurn: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        recentlyTime: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        boughtDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        completeFilePath: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        importKey: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        isPay: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        isComplate: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        isBuyBook: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        bookPrice: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        modelName: "BoughtLecture",
        tableName: "boughtLecture",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtLecture.belongsTo(db.User, { as: "user" });
    db.BoughtLecture.belongsTo(db.Lecture, { as: "lectureId" });
  }
};
