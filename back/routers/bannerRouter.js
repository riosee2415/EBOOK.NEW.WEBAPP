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

router.post("/list", async (req, res, next) => {
  const selectQ = `
  SELECT	A.id,
          A.title,
          A.titleUseYn ,
          A.content ,
          A.contentUseYn ,
          A.imageURL ,
          A.sort,
          A.link,
          A.linkUseYn,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")	AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일")	AS updatedAt,
          B.username,
          ROW_NUMBER() OVER(ORDER BY A.sort) AS num
    FROM	mainBanners A 
   INNER
    JOIN	users		B
      ON	A.updator  = B.id
   ORDER  BY  sort  ASC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .send("데이터를 가져올 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/sort/update", isAdminCheck, async (req, res, next) => {
  const { id, title, nextFlag } = req.body;

  const updateQ = `
    UPDATE  mainBanners
       SET  sort = ${nextFlag},
            updator = ${req.user.id},
            updatedAt = now()
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO mainBannerHistory (content, title, updator, createdAt, updatedAt) VALUES 
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
    return res.status(401).send("메인베너 우선순위를 변경할 수 없습니다.");
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

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, title, content, link } = req.body;

  const updateQ = `
  UPDATE  mainBanners
     SET  title = "${title}",
          content = "${content}",
          link = "${link}",
          updatedAt = now(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO mainBannerHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "기본정보 변경",
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
    return res.status(401).send("메인베너의 기본정보를 변경할 수 없습니다.");
  }
});

router.post("/imageUpdate", isAdminCheck, async (req, res, next) => {
  const { id, imageURL, title } = req.body;

  const updateQ = `
  UPDATE  mainBanners
     SET  imageURL = "${imageURL}",
          updatedAt = now(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO mainBannerHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "이미지 변경",
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
    return res.status(401).send("메인베너의 이미지를 변경할 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { title, content, imagePath } = req.body;

  try {
    const createResult = await MainBanner.create({
      title,
      content,
      imagePath,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        "새로운 메인베너 생성에 실패했습니다. 개발사에 문의해주세요. [CODE 0002]"
      );
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, title } = req.body;

  try {
    const deleteQ = `
      DELETE  FROM mainBanners
       WHERE  id = ${id}
    `;

    const insertQuery2 = `
    INSERT INTO mainBannerHistory (content, title, updator, createdAt, updatedAt) VALUES 
    (
      "데이터 삭제",
      "${title}",
      ${req.user.id},
      now(),
      now()
    )
  `;

    await models.sequelize.query(deleteQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(403).send("[서버장애 발생] 개발사에 문의해주세요.");
  }
});

router.post("/updateUseYn", isAdminCheck, async (req, res, next) => {
  const { id, title, nextFlag, type } = req.body;

  let updateQ = `
    UPDATE  mainBanners
       SET  updator = ${req.user.id},
            updatedAt = now()    
  `;

  switch (parseInt(type)) {
    case 1: // 이미지 명칭 뷰
      updateQ += `, titleUseYn = ${nextFlag}
                WHERE  id = ${id}`;
      break;

    case 2: // 텍스트 뷰
      updateQ += `, contentUseYn = ${nextFlag}
                WHERE  id = ${id}`;
      break;

    case 3: // 링크사용여부
      updateQ += `, linkUseYn = ${nextFlag}
                WHERE  id = ${id}`;
      break;

    default:
      break;
  }

  const insertQuery2 = `
  INSERT INTO mainBannerHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "사용여부 변경",
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
    return res.status(401).send("메인베너의 사용여부를 변경할 수 없습니다.");
  }
});

router.post("/fastCreate", isAdminCheck, async (req, res, next) => {
  const insertQ = `
    INSERT INTO mainBanners (title, imageURL, updator, createdAt, updatedAt) VALUES
    ("New Banner", "https://via.placeholder.com/1000x300?text=please%20upload%20your%20image", ${req.user.id}, now(), now())
  `;

  const insertQuery2 = `
  INSERT INTO mainBannerHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 생성",
    "$New Banner",
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
    return res.status(401).send("새로운 배너를 생성할 수 없습니다.");
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
      FROM 	mainBannerHistory		A
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
