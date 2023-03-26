const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
      SELECT  ROW_NUMBER() OVER(ORDER  BY  A.createdAt  DESC)		AS num,
              A.id,
              B.title,
              A.createdAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")          AS viewCreatedAt
        FROM  enjoyMedia      A
       INNER
        JOIN  media           B
          ON  A.MediumId = B.id
       WHERE  A.UserId = ${id}
       ORDER  BY  A.createdAt  DESC
      `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강 기록을 불러올 수 없습니다.");
  }
});

router.post("/me/list", isLoggedIn, async (req, res, next) => {
  const selectQ = `
  SELECT  id,
          MediumId
    FROM  enjoyMedia
   WHERE  UserId = ${req.user.id}
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강 기록을 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { id } = req.body;

  const insertQ = `
  INSERT INTO enjoyMedia
  (
    UserId,
    MediumId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${req.user.id},
    ${id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("수강기록을 생성할 수 없습니다.");
  }
});

module.exports = router;
