const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { CompanyInfo } = require("../models");
const models = require("../models");

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

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

router.get("/list", async (req, res, next) => {
  const selectQuery = `
    SELECT  id,
            name,
            value,
            sort,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일") AS  createdAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") AS  updatedAt
      FROM  companyInfo
     ORDER  BY  sort  ASC
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("사업자정보를 불러올 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { name, value } = req.body;

  console.log(name, value);

  const insertQuery = `
    INSERT INTO companyInfo (name, value, updator, createdAt, updatedAt) VALUES 
    (
      "${name}",
      "${value}",
      ${req.user.id},
      now(),
      now()
    )
  `;

  const insertQuery2 = `
  INSERT INTO companyInfoHistory (type, name, value, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 추가",
    "${name}",
    "${value}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("새로운 사업자 정보를 추가할 수 없습니다.");
  }
});

router.post("/sort/update", isAdminCheck, async (req, res, next) => {
  const { id, nextSort, name, value } = req.body;

  const updateQuery = `
    UPDATE  companyInfo
       SET  sort = ${nextSort},
            updator = ${req.user.id}
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO companyInfoHistory (type, name, value, updator, createdAt, updatedAt) VALUES 
  (
    "우선순위 변경",
    "${name}",
    "${value}",
    ${req.user.id},
    now(),
    now()
  )
  `;
  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("사업자정보의 우선순위를 변경할 수 없습니다.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, name, value } = req.body;

  try {
    const delQuery = `
      DELETE  FROM companyInfo
       WHERE  id = ${id}
    `;

    const insertQuery2 = `
    INSERT INTO companyInfoHistory (type, name, value, updator, createdAt, updatedAt) VALUES 
    (
      "데이터 삭제",
      "${name}",
      "${value}",
      ${req.user.id},
      now(),
      now()
    )
    `;

    await models.sequelize.query(delQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(403).send("[서버장애 발생] 개발사에 문의해주세요.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, name, value } = req.body;

  try {
    const updateQuery = `
      UPDATE  companyInfo
         SET  name = "${name}",
              value = "${value}",
              updator = ${req.user.id}
       WHERE  id = ${id}
    `;

    const insertQuery2 = `
    INSERT INTO companyInfoHistory (type, name, value, updator, createdAt, updatedAt) VALUES 
    (
      "데이터 수정",
      "${name}",
      "${value}",
      ${req.user.id},
      now(),
      now()
    )
    `;

    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .send("정보를 변경할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.type,
            A.name,
            A.value,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H시 %i분 %s초")	AS  createdAt
      FROM 	companyInfoHistory		A
     INNER
      JOIN	users 			          B
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

router.post("/talk/get", async (req, res, next) => {
  const selectQ = `
    SELECT  A.id,
            A.useYn,
            A.imageURL,
            A.URL,
            A.updator,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H시 %i분 %s초")	AS  createdAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일 %H시 %i분 %s초")	AS  updatedAt,
            B.username
      FROM  kakaoch   A
     INNER
      JOIN  users     B
        ON  A.updator = B.id
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

router.post("/talk/new", isAdminCheck, async (req, res, next) => {
  const insertQ = `
    INSERT INTO kakaoch (useYn, imageURL, URL, updator, createdAt, updatedAt) VALUES 
    (
      0,
      "http://via.placeholder.com/200x200",
      "-",
      ${req.user.id},
      now(),
      now()
    )
  `;

  try {
    const insertQuery2 = `
    INSERT INTO kakaochHistory (content, updator, createdAt, updatedAt) VALUES 
    (
      "데이터 생성",
      ${req.user.id},
      now(),
      now()
    )
    `;

    await models.sequelize.query(insertQ);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(403).send("[서버장애 발생] 개발사에 문의해주세요.");
  }
});

router.post("/talk/use", isAdminCheck, async (req, res, next) => {
  const { id, nextFlag } = req.body;

  const updateQ = `
    UPDATE  kakaoch
       SET  useYn = ${nextFlag},
            updator = ${req.user.id},
            updatedAt = now()
     WHERE  id = ${id}
  `;

  try {
    const insertQuery2 = `
    INSERT INTO kakaochHistory (content, updator, createdAt, updatedAt) VALUES 
    (
      "사용여부 수정",
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
    return res.status(403).send("[서버장애 발생] 개발사에 문의해주세요.");
  }
});

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/talk/update", isAdminCheck, async (req, res, next) => {
  const { id, imageURL, URL } = req.body;

  const updateQ = `
    UPDATE  kakaoch
       SET  imageURL = "${imageURL}",
            URL = "${URL}",
            updator = ${req.user.id},
            updatedAt = now()
     WHERE  id = ${id}
  `;

  try {
    const insertQuery2 = `
    INSERT INTO kakaochHistory (content, updator, createdAt, updatedAt) VALUES 
    (
      "기존정보 수정",
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
    return res.status(403).send("[서버장애 발생] 개발사에 문의해주세요.");
  }
});

router.post("/history/talk/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H시 %i분 %s초")	AS  createdAt
      FROM 	kakaochHistory	    	A
     INNER
      JOIN	users 			          B
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
