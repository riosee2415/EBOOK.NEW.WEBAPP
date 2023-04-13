const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { MainBanner } = require("../models");
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
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
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

// const insertQuery2 = `
// INSERT INTO mainBannerHistory (content, title, updator, createdAt, updatedAt) VALUES
// (
//   "우선순위 변경",
//   "${title}",
//   ${req.user.id},
//   now(),
//   now()
// )
// `;

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/list", async (req, res, next) => {
  const { type, useYn } = req.body;

  const _type = type ? parseInt(type) : null;
  const _useYn = useYn ? parseInt(useYn) : 3;

  const selectQ = `
  SELECT  ROW_NUMBER() OVER(ORDER BY sort ASC)		AS num,
          id,
          type,
          CASE
            WHEN type = 1 THEN '메인'
            WHEN type = 2 THEN '큐레이션'
            WHEN type = 3 THEN '수강후기'
            WHEN type = 4 THEN '고객센터'
          END                                     AS viewType,
          useYn,
          sort,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일") AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") AS viewUpdatedAt
    FROM  banner
   WHERE  1 = 1
          ${
            _useYn === 1
              ? `AND  useYn = TRUE`
              : _useYn === 2
              ? `AND  useYn = FALSE`
              : ``
          }
          ${_type ? `AND  type = ${_type}` : ``}
   ORDER  BY  sort ASC 
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { type } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const insertQ = `
  INSERT  INTO  banner
  (
    type,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${type},
    NOW(),
    NOW()
  )
  `;

  const insertQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 생성",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQ);
    await models.sequelize.query(insertQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 생성할 수 없습니다.");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, type, imagePath, useYn } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const updateQ = `
  UPDATE  banner
     SET  type = ${type},
          imagePath = ${imagePath ? `'${imagePath}'` : `NULL`},
          useYn = ${useYn}
   WHERE  id = ${id}
  `;

  const updateQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 수정",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(updateQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 수정할 수 없습니다.");
  }
});

router.post("/sort/update", isAdminCheck, async (req, res, next) => {
  const { id, type, sort } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const updateQ = `
  UPDATE  banner
     SET  sort = ${sort}
   WHERE  id = ${id}
  `;

  const updateQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 순서 변경",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(updateQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 삭제할 수 없습니다.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, type } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const deleteQ = `
  DELETE 
    FROM banner 
   WHERE id = ${id}
  `;

  const deleteQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 삭제",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQ);
    await models.sequelize.query(deleteQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 삭제할 수 없습니다.");
  }
});

router.post("/mobile/list", async (req, res, next) => {
  const { type, useYn } = req.body;

  const _type = type ? parseInt(type) : null;
  const _useYn = useYn ? parseInt(useYn) : 3;

  const selectQ = `
  SELECT  ROW_NUMBER() OVER(ORDER BY sort ASC)		AS num,
          id,
          type,
          CASE
            WHEN type = 1 THEN '메인'
            WHEN type = 2 THEN '큐레이션'
            WHEN type = 3 THEN '수강후기'
            WHEN type = 4 THEN '고객센터'
          END                                     AS viewType,
          useYn,
          sort,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일") AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") AS viewUpdatedAt
    FROM  mobileBanner
   WHERE  1 = 1
          ${
            _useYn === 1
              ? `AND  useYn = TRUE`
              : _useYn === 2
              ? `AND  useYn = FALSE`
              : ``
          }
          ${_type ? `AND  type = ${_type}` : ``}
   ORDER  BY  sort ASC 
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 불러올 수 없습니다.");
  }
});

router.post("/mobile/create", isAdminCheck, async (req, res, next) => {
  const { type } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const insertQ = `
  INSERT  INTO  mobileBanner
  (
    type,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${type},
    NOW(),
    NOW()
  )
  `;

  const insertQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 생성",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQ);
    await models.sequelize.query(insertQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 생성할 수 없습니다.");
  }
});

router.post("/mobile/update", isAdminCheck, async (req, res, next) => {
  const { id, type, imagePath, useYn } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const updateQ = `
  UPDATE  mobileBanner
     SET  type = ${type},
          imagePath = ${imagePath ? `'${imagePath}'` : `NULL`},
          useYn = ${useYn}
   WHERE  id = ${id}
  `;

  const updateQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 수정",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(updateQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 수정할 수 없습니다.");
  }
});

router.post("/mobile/sort/update", isAdminCheck, async (req, res, next) => {
  const { id, type, sort } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const updateQ = `
  UPDATE  mobileBanner
     SET  sort = ${sort}
   WHERE  id = ${id}
  `;

  const updateQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 순서 변경",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(updateQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 삭제할 수 없습니다.");
  }
});

router.post("/mobile/delete", isAdminCheck, async (req, res, next) => {
  const { id, type } = req.body;

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
  ];

  const deleteQ = `
  DELETE 
    FROM mobileBanner 
   WHERE id = ${id}
  `;

  const deleteQ2 = `
  INSERT INTO bannerHistory (content, updator, createdAt, updatedAt) VALUES
  (
    "${typeArr.find((data) => data.type === type).name}유형 베너 삭제",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQ);
    await models.sequelize.query(deleteQ2);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("베너를 삭제할 수 없습니다.");
  }
});

module.exports = router;
