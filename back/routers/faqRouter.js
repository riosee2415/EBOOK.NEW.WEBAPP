const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { MainBanner } = require("../models");
const models = require("../models");

const router = express.Router();

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// TYPE ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// READ
router.post("/type/list", async (req, res, next) => {
  const selectQ = `
    SELECT	ROW_NUMBER() OVER()								AS num,
            A.id,
            A.value,
            B.username, 
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
            A.createdAt,
            A.updatedAt 
      FROM  faqType		A 
     INNER
      JOIN	users		B
        ON	A.updator = B.id
     WHERE  A.isDelete = 0
     ORDER  BY  A.value ASC
    `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send("자주묻는질문 유형 데이터를 조회할 수 없습니다.");
  }
});

// DELETE
router.post("/type/delete", isAdminCheck, async (req, res, next) => {
  const { value, faqTypeId } = req.body;

  const updateQ = `
    UPDATE  faqType
       SET  isDelete = 1,
            updatedAt = now(),
            deletedAt = now(),
            updator = ${req.user.id}
     WHERE  id = ${faqTypeId}
  `;

  const insertQuery2 = `
  INSERT INTO faqHistory (value, content, updator, createdAt, updatedAt) VALUES 
  (
    "${value}",
    "데이터 삭제",
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
    return res.status(401).send("자주묻는질문 유형을 삭제할 수 없습니다.");
  }
});

router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  const insertQ1 = `
    INSERT INTO faqType (
      value,
      updator,
      createdAt,
      updatedAt
    ) VALUES (
      "${value}",
      ${req.user.id},
      now(),
      now()
    )
  `;

  const insertQuery2 = `
  INSERT INTO faqHistory (value, content, updator, createdAt, updatedAt) VALUES 
  (
    "${value}",
    "데이터 생성",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQ1);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 유형을 생성할 수 없습니다.");
  }
});

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// FAQ ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

module.exports = router;
