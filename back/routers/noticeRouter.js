const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { Notice, sequelize } = require("../models");
const { Op } = require("sequelize");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

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

router.post("/update/file", isAdminCheck, async (req, res, next) => {
  const { id, filepath, title } = req.body;

  const updateQ = `
      UPDATE  notices
        SET   file = "${filepath}",
              updatedAt = now(),
              updator = ${req.user.id}
      WHERE  id = ${id}
    `;

  const insertQuery2 = `
    INSERT INTO noticeHistory (content, title, updator, createdAt, updatedAt) VALUES 
    (
      "파일정보 수정",
      "${title}",
      ${req.user.id},
      now(),
      now()
    )
    `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공지사항을 수정할 수 없습니다. [CODE 087]");
  }
});

router.post(
  "/file",
  isAdminCheck,
  upload.single("file"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/page/list", async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQ = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt ASC)		AS num, 
          A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          B.username 										AS updator 
    FROM	notices		A
   INNER
    JOIN	users		B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND  A.isUpdate = 1
   ORDER	BY	A.createdAt DESC
  `;

  const selectQ = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt ASC)		AS num, 
          A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          B.username 										AS updator 
    FROM	notices		A
   INNER
    JOIN	users		B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND  A.isUpdate = 1
   ORDER	BY	A.createdAt DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQ);
    const list = await models.sequelize.query(selectQ);

    const listLen = lengths[0].length;

    const lastPage =
      listLen % LIMIT > 0 ? listLen / LIMIT + 1 : listLen / LIMIT;

    return res
      .status(200)
      .json({ list: list[0], lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(400).send("공지사항 데이터를 불러올 수 없습니다.");
  }
});

router.post("/list", async (req, res, next) => {
  const { title, type } = req.body;

  const _title = title ? title : "";
  const _type = type ? type : "";

  const selectQ = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt ASC)		AS num, 
          A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          B.username 										AS updator 
    FROM	notices		A
   INNER
    JOIN	users		B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.title LIKE "%${_title}%"
     ${_type ? `AND	A.type = "${_type}"` : ""}
   ORDER	BY	A.createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("공지사항 데이터를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { type } = req.body;

  const insertQuery1 = `
      INSERT INTO notices (title, type, content, author, updator, createdAt, updatedAt)
      VALUES
      (
        "임시 공지사항",
        "${type}",
        "임시 공지사항 입니다. 데이터를 입력해주세요.",
        "관리자",
        ${req.user.id},
        now(),
        now()
      )
    `;

  const insertQuery2 = `
  INSERT INTO noticeHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 생성",
    "임시 공지사항",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQuery1);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글을 등록할 수 없습니다. [CODE 077]");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, title, content, type } = req.body;

  const updateQ = `
    UPDATE  notices
      SET   title = "${title}",
            content = "${content}",
            type = "${type}",
            updatedAt = now(),
            updator = ${req.user.id},
            isUpdate = TRUE
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO noticeHistory (content, title, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 수정",
    "${title}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공지사항을 수정할 수 없습니다. [CODE 087]");
  }
});

router.delete("/delete/:noticeId", isAdminCheck, async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const exNotice = await Notice.findOne({
      where: { id: parseInt(noticeId) },
    });

    if (!exNotice) {
      return res.status(401).send("존재하지 않는 게시글 입니다.");
    }

    const updateResult = await Notice.update(
      {
        isDelete: true,
        deletedAt: new Date(),
      },
      {
        where: { id: parseInt(noticeId) },
      }
    );

    if (updateResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글을 삭제할 수 없습니다. [CODE 097]");
  }
});

router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT  A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y.%m.%d") 		AS viewUpdatedAt
    FROM  notices     A
   WHERE  A.isDelete = 0
     AND  A.isUpdate = 1
     AND  A.id = ${id}
  `;

  try {
    const detail = await models.sequelize.query(selectQ);

    const updateQ = `
    UPDATE  notices
       SET  hit = ${detail[0][0].hit + 1}
     WHERE  id = ${id}
    `;

    await models.sequelize.query(updateQ);

    return res.status(200).json(detail[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.get("/next/:noticeId", async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notices = await Notice.findAll({
      where: {
        id: {
          [Op.gt]: parseInt(noticeId),
        },
      },
      limit: 1,
    });

    if (!notices[0]) {
      return res.status(401).send("마지막 게시글 입니다.");
    }

    return res.redirect(`/api/notice/list/${notices[0].id}`);
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.get("/prev/:noticeId", async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notices = await Notice.findAll({
      where: {
        id: {
          [Op.lt]: parseInt(noticeId),
        },
      },
    });

    if (!notices[0]) {
      return res.status(401).send("첫번째 게시글 입니다.");
    }

    return res.redirect(`/api/notice/list/${notices[notices.length - 1].id}`);
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글 정보를 불러올 수 없습니다. [CODE 107]");
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
      FROM 	noticeHistory		A
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
