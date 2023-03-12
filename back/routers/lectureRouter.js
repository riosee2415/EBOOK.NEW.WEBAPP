const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { searchType } = req.body;

  const _searchType = searchType ? parseInt(searchType) : 7;

  const selectQ = `
  SELECT  ROW_NUMBER() OVER(ORDER	BY createdAt ASC)		AS num,
          id,
          type,
          CASE
              WHEN type = 1 THEN  "1년"
              WHEN type = 2 THEN  "2년"
              WHEN type = 3 THEN  "3년"
              WHEN type = 4 THEN  "평생"
              WHEN type = 5 THEN  "3달"
              WHEN type = 6 THEN  "상품"
          END                                           AS viewType,
          thumbnail,
          title,
          subTitle,
          price,
          FORMAT(price, ',')                            AS viewPrice,
          discountPrice,
          FORMAT(discountPrice, ',')                    AS viewDiscountPrice,
          bookPrice,
          FORMAT(bookPrice, ',')                        AS viewBookPrice,
          bookDiscountPrice,
          FORMAT(bookDiscountPrice, ',')                AS viewBookDiscountPrice,
          bookEndDate,
          isHidden,
          createdAt,
          DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
          updatedAt,
          DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
    FROM  lecture
   WHERE  1 = 1
     AND  isDelete = FALSE
          ${_searchType === 7 ? `` : `AND  type = ${_searchType}`}
`;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("상품 리스트를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const insertQ = `
  INSERT INTO lecture
  (
      type,
      title,
      subTitle,
      bookEndDate,
      createdAt,
      updatedAt
  )
  VALUES
  (
      1,
      "임시 제목",
      "임시 부 제목",
      NULL,
      NOW(),
      NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const {
    id,
    type,
    thumbnail,
    title,
    subTitle,
    price,
    discountPrice,
    bookPrice,
    bookDiscountPrice,
    bookEndDate,
    isHidden,
  } = req.body;

  const updateQ = `
  UPDATE  lecture
     SET  type = ${type},
          thumbnail = "${thumbnail}",
          title = "${title}",
          subTitle = ${subTitle ? `"${subTitle}"` : "NULL"},
          price = ${price},
          discountPrice = ${discountPrice ? discountPrice : "NULL"},
          bookPrice = ${bookPrice},
          bookDiscountPrice = ${bookDiscountPrice ? bookDiscountPrice : "NULL"},
          bookEndDate = ${bookEndDate ? `"${bookEndDate}"` : "NULL"},
          isHidden = ${isHidden},
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("상품을 생성할 수 없습니다.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
    UPDATE  lecture
       SET  isDelete = TRUE,
            deletedAt = NOW()
     WHERE  id = ${id}
    `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("상품을 삭제할 수 없습니다.");
  }
});

module.exports = router;
