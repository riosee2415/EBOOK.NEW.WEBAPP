const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { Logo } = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

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

const router = express.Router();

router.get("/get", async (req, res, next) => {
  const selectQuery = `
    SELECT	id,
            typeOf,
            imageURL,
            updateor,
            DATE_FORMAT(createdAt, "%Y.%m.%d")	AS  createdAt,
            DATE_FORMAT(updatedAt, "%Y.%m.%d")	AS	updatedAt 
      FROM 	logo
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("로고정보를 조회할 수 없습니다.");
  }
});

router.post(
  "/imageHeader",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const selectQuery = `
      SELECT  id
        FROM  logo
       WHERE  typeOf = "H"
    `;

    const updateQuery = `
      UPDATE  logo
         SET  imageURL  = "${req.file.location}",
              updatedAt = NOW(),
              updateor = ${req.user.id}
       WHERE  typeOf = "H"
    `;

    const insertQuery = `
      INSERT INTO logo (typeOf, imageURL, createdAt, updatedAt) VALUES (
        "H",
        "${req.file.location}",
        now(),
        now()
      );
    `;

    try {
      const exResult = await models.sequelize.query(selectQuery);

      if (exResult[0].length > 0) {
        await models.sequelize.query(updateQuery);
      } else {
        await models.sequelize.query(insertQuery);
      }

      const afterInsertQuery = `
      INSERT INTO logoHistory (typeOf, updator, createdAt, updatedAt) VALUES (
          "HEADER",
          ${req.user.id},
          now(),
          now()
        );
      `;

      await models.sequelize.query(afterInsertQuery);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("로고이미지를 변경할 수 없습니다.");
    }
  }
);

router.post(
  "/imageFooter",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const selectQuery = `
    SELECT  id
      FROM  logo
     WHERE  typeOf = "F"
  `;

    const updateQuery = `
    UPDATE  logo
       SET  imageURL  = "${req.file.location}",
            updatedAt = NOW(),
            updateor = ${req.user.id}
     WHERE  typeOf = "F"
  `;

    const insertQuery = `
    INSERT INTO logo (typeOf, imageURL, createdAt, updatedAt) VALUES (
      "F",
      "${req.file.location}",
      now(),
      now()
    );
  `;

    try {
      const exResult = await models.sequelize.query(selectQuery);

      if (exResult[0].length > 0) {
        await models.sequelize.query(updateQuery);
      } else {
        await models.sequelize.query(insertQuery);
      }

      const afterInsertQuery = `
      INSERT INTO logoHistory (typeOf, updator, createdAt, updatedAt) VALUES (
          "FOOTER",
          ${req.user.id},
          now(),
          now()
        );
      `;

      await models.sequelize.query(afterInsertQuery);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("로고이미지를 변경할 수 없습니다.");
    }
  }
);

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.typeOf,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	logoHistory		A
     INNER
      JOIN	users 			B
        ON	A.updator = B.id
     WHERE  1=1
      ${
        _datePick
          ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
          : ""
      }
     ORDER  BY  A.createdAt  DESC
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

module.exports = router;
