const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        userId: {
          type: DataTypes.STRING(300),
          allowNull: false, // 필수
          // unique: true, // 고유한 값
        },
        username: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },

        password: {
          type: DataTypes.STRING(600),
          allowNull: false, // 필수
        },

        birth: {
          type: DataTypes.STRING(300),
          allowNull: false, // 필수
        },
        keyword: {
          type: DataTypes.STRING(300),
          allowNull: true, // 필수
        },

        gender: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: false, // 필수
        },

        zoneCode: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: false, // 필수
        },

        address: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: false, // 필수
        },

        detailAddress: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: false, // 필수
        },

        tel: {
          type: DataTypes.STRING(300),
          defaultValue: "-",
          allowNull: true, // 필수
        },
        mobile: {
          type: DataTypes.STRING(500),
          defaultValue: "-",
          allowNull: true, // 필수
        },
        email: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
          defaultValue: "-",
        },

        level: {
          // 사용자 권한 [1 : 일반회원, 2 : 비어있음, 3: 운영자, 4: 최고관리자, 5: 개발사]
          type: DataTypes.INTEGER,
          allowNull: false, //
          defaultValue: 1,
        },

        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null,
        },

        terms: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },

        consulting: {
          type: DataTypes.TEXT, // 삼담
          defaultValue: null,
          allowNull: true,
        },

        // 관리자 메뉴 권환 제어
        menuRight1: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight2: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight3: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight4: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight5: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight6: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight7: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight8: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight9: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight10: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight11: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight12: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isExit: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        exitedAt: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },

        isAgreement1: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        isAgreement2: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        isAgreement3: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        isAgreement4: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        userTypeAd: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },

        adType: {
          type: DataTypes.STRING(10),
          allowNull: false,
          defaultValue: "1",
        },

        previousId: {
          type: DataTypes.STRING(700),
          allowNull: true,
        },

        previousCreatedAt: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },

        previousUpdatedAt: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
