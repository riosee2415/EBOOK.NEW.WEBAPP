const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { MainBanner } = require("../models");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY A.createdAt ASC)		AS num,
            A.id,
            A.title,
            A.content,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d") 	AS	viewUpdatedAt
      FROM  review          A
     INNER
      JOIN  users           B
        ON  A.UserId = B.id
     WHERE  A.isDelete = FALSE
       AND  A.isOk = TRUE
     ORDER  BY  A.createdAt DESC
    `;

  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY A.createdAt ASC)		AS num,
            A.id,
            A.title,
            A.content,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d") 	AS	viewUpdatedAt
      FROM  review          A
     INNER
      JOIN  users           B
        ON  A.UserId = B.id
     WHERE  A.isDelete = FALSE
       AND  A.isOk = TRUE
     ORDER  BY  A.createdAt DESC
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
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강후기를 불러올 수 없습니다.");
  }
});

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY A.createdAt ASC)		AS num,
            A.id,
            A.title,
            A.content,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            A.isOk
      FROM  review          A
     INNER
      JOIN  users           B
        ON  A.UserId = B.id
     WHERE  A.isDelete = FALSE
     ORDER  BY  A.createdAt DESC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강후기를 불러올 수 없습니다.");
  }
});

router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT  A.id,
          A.title,
          A.content,
          B.username,
          A.UserId,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 	AS	viewUpdatedAt
    FROM  review          A
   INNER
    JOIN  users           B
      ON  A.UserId = B.id
   WHERE  A.isDelete = FALSE
     AND  A.id = ${id}
`;

  try {
    const detail = await models.sequelize.query(selectQ);

    const nextDataQuery = `
    SELECT  id,
            title
      FROM  review
     WHERE  id > ${id}
       AND  isDelete = FALSE
     LIMIT  1
    `;

    const prevDataQuery = `
    SELECT  id,
            title
      FROM  review
     WHERE  id < ${id}
       AND  isDelete = FALSE
    `;

    const nextData = await models.sequelize.query(nextDataQuery);
    const prevData = await models.sequelize.query(prevDataQuery);

    if (!detail[0][0]) {
      return res.status(400).send("수강후기가 없습니다.");
    } else {
      return res.status(200).json({
        detailData: detail[0][0],
        nextNotice: !nextData[0] ? null : nextData[0][0], // 다음 리뷰
        prevNotice: !prevData[0] ? null : prevData[0][prevData[0].length - 1], // 이전 리뷰
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강후기를 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { title, content } = req.body;

  const insertQ = `
    INSERT  INTO  review
    (
        title,
        content,
        UserId,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "${title}",
        "${content}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;
  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강후기를 생성할 수 없습니다.");
  }
});

router.post("/update", isLoggedIn, async (req, res, next) => {
  const { id, title, content } = req.body;

  const findQ = `
  SELECT  id,
          UserId
    FROM  review
   WHERE  id = ${id}
  `;

  const insertQ = `
  UPDATE  review
     SET  title = "${title}",
          content = "${content}",
          updatedAt = NOW()
   WHERE  id = ${id}
    `;
  try {
    const find = await models.sequelize.query(findQ);

    if (find[0][0].UserId !== req.user.id) {
      return res.status(400).send("자신의 수강후기가 아닙니다");
    }

    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강후기를 수정할 수 없습니다.");
  }
});

router.post("/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.body;

  const findQ = `
  SELECT  id,
          UserId
    FROM  review
   WHERE  id = ${id}
  `;

  const deleteQ = `
  UPDATE  review
     SET  isDelete = TRUE,
          deletedAt = NOW()
   WHERE  id = ${id}
    `;

  try {
    const find = await models.sequelize.query(findQ);

    if (find[0][0].UserId !== req.user.id) {
      return res.status(400).send("자신의 수강후기가 아닙니다");
    }

    await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강후기를 삭제할 수 없습니다.");
  }
});

router.post("/admin/isOk", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
  UPDATE  review
     SET  isOk = TRUE,
          updatedAt = NOW()
   WHERE  id = ${id}
`;
  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("승인할 수 없습니다.");
  }
});

router.post("/admin/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQ = `
  UPDATE  review
     SET  isDelete = TRUE,
          deletedAt = NOW()
   WHERE  id = ${id}
    `;

  try {
    await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강후기를 삭제할 수 없습니다.");
  }
});

module.exports = router;
