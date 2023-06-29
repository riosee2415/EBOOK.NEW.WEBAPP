const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 강의구매
module.exports = class Lecture extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.INTEGER,
          allowNull: false,
          // 1. 1년,
          // 2. 2년,
          // 3. 3년,
          // 4. 평생,
          // 5. 3달,
          // 6. 태블릿(신규),
          // 7. 태블릿(기존),
        },
        thumbnail: {
          type: DataTypes.STRING(600),
          allowNull: false,
          defaultValue: "https://via.placeholder.com/400x310",
        },
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        subTitle: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        bookTitle: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        installmentText: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        discountPrice: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true,
        },
        bookPrice: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        bookDiscountPrice: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true,
        },
        bookEndDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        bookNotEtc: {
          type: DataTypes.STRING(600), // 구매안함 안내문구
          allowNull: true,
        },
        isBookPay: {
          type: DataTypes.BOOLEAN, // 구매 함 on/off
          defaultValue: false,
          allowNull: false,
        },
        isBookNoPay: {
          type: DataTypes.BOOLEAN, // 구매 안함 on/off
          defaultValue: false,
          allowNull: false,
        },
        installmentText2: {
          type: DataTypes.STRING(600), // 할부 내용
          allowNull: true,
        },
        isHidden: {
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

        sort: {
          type: DataTypes.INTEGER, // 순서
          defaultValue: 1,
          allowNull: false,
        },
      },
      {
        modelName: "Lecture",
        tableName: "lecture",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
