const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { Popup } = require("../models");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

const router = express.Router();

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

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, "uploads");
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname); // 확장자 추출 (.png)
//       const basename = path.basename(file.originalname, ext);

//       done(null, basename + "_" + new Date().getTime() + ext);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 2024 }, // 20MB
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.get("/get", async (req, res, next) => {
  const selectQ = `
  SELECT	ROW_NUMBER() OVER()			AS num,
          id,
          title,
          imagePath,
          useYn,
          link,
          linkUseYn,
          sort,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
          createdAt,
          updatedAt 
    FROM	popups
   ORDER	BY	sort ASC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("데이터를 불러올 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/sort/update", isAdminCheck, async (req, res, next) => {
  const { id, title, nextFlag } = req.body;

  const updateQ = `
    UPDATE  popups
       SET  sort = ${nextFlag},
            updatedAt = now()
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO popupHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "우선순위 변경",
    "${title}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("팝업 우선순위를 변경할 수 없습니다.");
  }
});

router.get("/viewer", async (req, res, next) => {
  try {
    const popups = await Popup.findAll({
      where: { useYn: true },
    });

    return res.status(200).json(popups);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("데이터를 불러올 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const insertQ = `
  INSERT INTO popups (title, imagePath, useYn, link, linkUseYn, sort, createdAt, updatedAt) VALUES 
  (
    "임시 팝업",
    "https://via.placeholder.com/250x400?text=please%20upload%20your%20image",
    0,
    "NOT LINK",
    0,
    1,
    now(),
    now()
  )
   
`;

  const insertQuery2 = `
    INSERT INTO popupHistory (content, title, updator, createdAt, updatedAt) VALUES 
    (
      "데이터 생성",
      "임시 팝업",
      ${req.user.id},
      now(),
      now()
    )
  `;

  try {
    await models.sequelize.query(insertQ);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("팝업 이미지를 수정할 수 없습니다.");
  }
});

router.post("/image/update", isAdminCheck, async (req, res, next) => {
  const { id, imagePath, title } = req.body;

  const updateQ = `
  UPDATE  popups
     SET  imagePath = "${imagePath}",
          updatedAt = now()
   WHERE  id = ${id}
`;

  const insertQuery2 = `
    INSERT INTO popupHistory (content, title, updator, createdAt, updatedAt) VALUES 
    (
      "이미지 수정",
      "${title}",
      ${req.user.id},
      now(),
      now()
    )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("팝업 이미지를 수정할 수 없습니다.");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, title, link } = req.body;

  const updateQ = `
    UPDATE  popups
       SET  title = "${title}",
            link = "${link}",
            updatedAt = now()
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO popupHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "기본정보 수정",
    "${title}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("팝업 정보를 수정할 수 없습니다.");
  }
});

router.post("/useUpdate", isAdminCheck, async (req, res, next) => {
  const { id, nextFlag, title, type } = req.body;

  try {
    let updateQ = `
  UPDATE  popups
     SET  updatedAt = now()    
`;

    switch (parseInt(type)) {
      case 1: // 팝업 사용여부
        updateQ += `, useYn = ${nextFlag}
              WHERE  id = ${id}`;
        break;

      case 2: // 링크 사용여부
        updateQ += `, linkUseYn = ${nextFlag}
              WHERE  id = ${id}`;
        break;

      default:
        break;
    }

    const insertQuery2 = `
    INSERT INTO popupHistory (content, title, updator, createdAt, updatedAt) VALUES 
    (
      "사용여부 변경",
      "${title}",
      ${req.user.id},
      now(),
      now()
    )
    `;

    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(403).send("처리할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, title } = req.body;

  const deleteQ = `
    DELETE  FROM  popups
     WHERE  id = ${id};
  `;

  const insertQuery2 = `
  INSERT INTO popupHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 삭제",
    "${title}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(403).send("처리할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.title,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	popupHistory		A
     INNER
      JOIN	users 			  B
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
