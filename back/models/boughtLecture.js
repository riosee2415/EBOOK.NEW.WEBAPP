const DataTypes = require("sequelize");
const { Model } = DataTypes;

//결제내역
module.exports = class BoughtLecture extends Model {
  static init(sequelize) {
    return super.init(
      {
        mobile: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        receiver: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        zoneCode: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        payType: {
          type: DataTypes.STRING(200), // 구매유형
          allowNull: false,
        },
        pay: {
          type: DataTypes.INTEGER, // 수강권 금액
          allowNull: false,
        },
        lectureType: {
          type: DataTypes.INTEGER, // 수강권 유형
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(200), // 입금자명
          allowNull: false,
        },
        recentlyTurn: {
          type: DataTypes.INTEGER, // 마지막으로 본영상
          allowNull: true,
        },
        recentlyTime: {
          type: DataTypes.STRING(300), // 마지막으로 본영상의 시간
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
        impUid: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        merchantUid: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        isPay: {
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
        isBuyBook: {
          type: DataTypes.BOOLEAN, // 교재 구매
          defaultValue: false,
          allowNull: false,
        },
        bookPrice: {
          type: DataTypes.INTEGER, // 교재가격
          defaultValue: 0,
          allowNull: false,
        },

        previousUserId: {
          type: DataTypes.STRING(700),
          allowNull: true,
        },

        etc: {
          type: DataTypes.TEXT, // 비고란
          allowNull: true,
        },

        isPause: {
          type: DataTypes.BOOLEAN, // 일시정지
          defaultValue: false,
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
    db.BoughtLecture.belongsTo(db.Lecture, { as: "lecture" });
  }
};
