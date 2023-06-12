const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

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

router.post("/list", async (req, res, next) => {
  const { searchType } = req.body;

  if (!Array.isArray(searchType)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

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
              WHEN type = 6 THEN  "태블릿(신규)"
              WHEN type = 7 THEN  "태블릿(기존)"
          END                                           AS viewType,
          CASE
              WHEN type = 1 THEN  "12개월"
              WHEN type = 2 THEN  "24개월"
              WHEN type = 3 THEN  "36개월"
              WHEN type = 4 THEN  "평생"
              WHEN type = 5 THEN  "3달"
              WHEN type = 6 THEN  "태블릿(신규)"
              WHEN type = 7 THEN  "태블릿(기존)"
          END                                           AS viewFrontType,
          thumbnail,
          title,
          subTitle,
          installmentText,
          price,
          FORMAT(price, ',')                            AS viewPrice,
          discountPrice,
          FORMAT(discountPrice, ',')                    AS viewDiscountPrice,
          price - discountPrice                         AS lecturePrice,
          FORMAT(price - discountPrice, ',')            AS viewLecturePrice,
          bookPrice,
          FORMAT(bookPrice, ',')                        AS viewBookPrice,
          bookDiscountPrice,
          FORMAT(bookDiscountPrice, ',')                AS viewBookDiscountPrice,
          bookEndDate,
          isHidden,
          createdAt,
          DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
          updatedAt,
          DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt,
          bookNotEtc,
          isBookPay,
          isBookNoPay,
          sort
    FROM  lecture
   WHERE  1 = 1
     AND  isDelete = FALSE
     AND  isHidden = TRUE
     AND  type IN (${searchType.map((data) => data)})
   ORDER  BY sort ASC
`;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectQ2 = `
    SELECT  A.id,
		        A.TagId,
		        A.LectureId,
		        B.value
      FROM  tagConnect		A
     INNER
      JOIN  tag				B
        ON  A.TagId = B.id
     WHERE  A.LectureId IN (${list[0].map((data) => data.id)})
    `;

    const list2 = await models.sequelize.query(selectQ2);

    return res.status(200).json(
      list[0].map((data) => ({
        ...data,
        tags: list2[0].filter((value) => value.LectureId === data.id),
      }))
    );
  } catch (e) {
    console.error(e);
    return res.status(400).send("상품 리스트를 불러올 수 없습니다.");
  }
});

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
              WHEN type = 6 THEN  "태블릿(신규)"
              WHEN type = 7 THEN  "태블릿(기존)"
          END                                           AS viewType,
          thumbnail,
          title,
          subTitle,
          installmentText,
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
          DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt,
          bookNotEtc,
          isBookPay,
          isBookNoPay,
          sort
    FROM  lecture
   WHERE  1 = 1
     AND  isDelete = FALSE
          ${_searchType === 7 ? `` : `AND  type = ${_searchType}`}
   ORDER  BY sort ASC
`;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("상품 리스트를 불러올 수 없습니다.");
  }
});

router.post("/detail", isLoggedIn, async (req, res, next) => {
  const { id } = req.body;

  const findQ = `
  SELECT  id
    FROM  boughtLecture
   WHERE  userId = ${req.user.id}
     AND  isDelete = FALSE
     AND  endDate >= NOW()
  `;

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
              WHEN type = 6 THEN  "태블릿(신규)"
              WHEN type = 7 THEN  "태블릿(기존)"
          END                                           AS viewType,
          thumbnail,
          title,
          subTitle,
          installmentText,
          price,
          FORMAT(price, ',')                            AS viewPrice,
          discountPrice,
          FORMAT(discountPrice, ',')                    AS viewDiscountPrice,
          bookPrice,
          FORMAT(bookPrice, ',')                        AS viewBookPrice,
          bookDiscountPrice,
          FORMAT(bookDiscountPrice, ',')                AS viewBookDiscountPrice,
          CASE
              WHEN bookEndDate IS NOT NULL AND DATE_FORMAT(bookEndDate, '%Y%m%d') >= DATE_FORMAT(NOW(), '%Y%m%d') THEN DATE_FORMAT(bookEndDate, '%y년 %m월 %d일')
              ELSE NULL
          END                                           AS bookEndDate,
          isHidden,
          createdAt,
          DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
          updatedAt,
          DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt,
          bookNotEtc,
          isBookPay,
          isBookNoPay,
          sort
    FROM  lecture
   WHERE  1 = 1
     AND  isDelete = FALSE
     AND  isHidden = TRUE
     AND  id = ${id}
  `;

  try {
    const select = await models.sequelize.query(selectQ);

    if (!select[0][0]) {
      return res.status(400).send("현재 구매할 수 없는 상품입니다.");
    }

    const find = await models.sequelize.query(findQ);

    if (select[0][0].type !== 7 && find[0].length > 0) {
      return res.status(400).send("이미 수강권이 있습니다.");
    }

    return res.status(200).json(select[0][0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강권을 불러올 수 없습니다.");
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
    installmentText,
    price,
    discountPrice,
    bookPrice,
    bookDiscountPrice,
    bookEndDate,
    isHidden,
    bookNotEtc,
    isBookPay,
    isBookNoPay,
    sort,
  } = req.body;

  const updateQ = `
  UPDATE  lecture
     SET  type = ${type},
          thumbnail = "${thumbnail}",
          title = "${title}",
          subTitle = ${subTitle ? `"${subTitle}"` : "NULL"},
          installmentText = ${
            installmentText ? `"${installmentText}"` : "NULL"
          },
          price = ${price},
          discountPrice = ${discountPrice ? discountPrice : "NULL"},
          bookPrice = ${bookPrice},
          bookDiscountPrice = ${bookDiscountPrice ? bookDiscountPrice : "NULL"},
          bookEndDate = ${bookEndDate ? `"${bookEndDate}"` : "NULL"},
          isHidden = ${isHidden},
          bookNotEtc = ${bookNotEtc ? `"${bookNotEtc}"` : "NULL"},
          isBookPay = ${isBookPay},
          isBookNoPay = ${isBookNoPay},
          updatedAt = NOW(),
          sort = ${sort}
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("상품을 수정할 수 없습니다.");
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

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TAG /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// 태그 리스트
router.post("/tag/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
  SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)        	AS num,
          A.id,
          A.value,
          (
            SELECT  COUNT(id)
              FROM  tagConnect				B
             WHERE  B.TagId = A.id
          )												AS useTagCnt,
          A.createdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")			AS viewCreatedAt,
          A.updatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")			AS viewUpdatedAt
    FROM  tag 			A
   WHERE  A.isDelete = 0
  `;
  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("태그를 불러올 수 업습니다.");
  }
});

// 태그 생성
router.post("/tag/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  const insertQuery = `
  INSERT INTO tag (
    value,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${value}",
    NOW(),
    NOW()
  )
  `;
  try {
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("태그를 생성할 수 없습니다.");
  }
});

// 태그 삭제
router.post("/tag/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const findQuery = `
  SELECT  id
    FROM  tag k
   WHERE  id = ${id}
     AND  isDelete = 0
  `;

  const deleteQuery = `
  UPDATE  tag
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;
  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(400).send("태그를 삭제할 수 없습니다.");
    }

    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("태그를 삭제할 수 없습니다.");
  }
});

// 회원 태그 리스트
router.post("/tag/tagList", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT  A.id,
		      A.LectureId,
		      A.TagId,
		      B.value
    FROM  tagConnect				A
   INNER
    JOIN  tag						    B
      ON  A.TagId = B.id
   WHERE  A.LectureId = ${id}
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("태그를 조회할 수 없습니다.");
  }
});

// 회원 태그 부여
router.post("/tag/tagCreate", isAdminCheck, async (req, res, next) => {
  const { LectureId, TagId } = req.body;

  const insertQuery = `
  INSERT INTO tagConnect (
    LectureId,
    TagId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${LectureId},
    ${TagId},
    NOW(),
    NOW()
  )
  `;

  try {
    const result = await models.sequelize.query(insertQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(401).send("태그를 추가할 수 없습니다.");
  }
});

// 회원 태그 삭제
router.post("/tag/tagDelete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const findQuery = `
  SELECT  id
    FROM  tagConnect k
   WHERE  id = ${id}
  `;

  const deleteQuery = `
    DELETE  
      FROM  tagConnect
     WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(400).send("이미 삭제된 태그 입니다.");
    }

    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("태그를 삭제할 수 없습니다.");
  }
});
module.exports = router;
