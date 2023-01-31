const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class GalleryImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        imagePath: {
          type: DataTypes.STRING(1000), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false,
        },
      },
      {
        modelName: "GalleryImage",
        tableName: "galleryImages",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.GalleryImage.belongsTo(db.Gallery);
  }
};
