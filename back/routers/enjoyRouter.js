const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
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

module.exports = router;
