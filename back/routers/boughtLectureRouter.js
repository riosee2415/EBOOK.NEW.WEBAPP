const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { searchDate, searchType, searchPayType, isPayType } = req.body;

  const _searchType = searchType ? parseInt(searchType) : null;
  const _searchPayType = searchPayType ? searchPayType : null;
  const _searchData = searchDate ? searchDate : null;
  const _isPayType = isPayType ? isPayType : 3;

  const selectQ = `
  SELECT  ROW_NUMBER() OVER()		AS num,
          A.id,
          A.mobile,
          A.receiver,
          A.zoneCode,
          A.address,
          A.detailAddress,
          A.payType,
          CASE
              WHEN A.payType = "card" THEN "카드"
              WHEN A.payType = "nobank" THEN "무통장입금"
              WHEN A.payType = "paypal" THEN "페이팔"
              WHEN A.payType = "admin" THEN "관리자제어"
          END                                             AS viewPayType,
          A.pay,
          A.lectureType,
          CASE
              WHEN A.lectureType = 1 THEN  "1년"
              WHEN A.lectureType = 2 THEN  "2년"
              WHEN A.lectureType = 3 THEN  "3년"
              WHEN A.lectureType = 4 THEN  "평생"
              WHEN A.lectureType = 5 THEN  "3달"
              WHEN A.lectureType = 6 THEN  "상품"
          END                                           	AS viewLectureType,
          A.name,
          A.boughtDate,
          A.startDate,
          A.endDate,
          A.impUid,
          A.merchantUid,
          A.boughtDate,
          A.startDate,
          A.endDate,
          A.isPay,
          A.isBuyBook,
          A.bookPrice,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, '%Y년 %m월 %d일')		AS viewCreatedAt,
          DATE_FORMAT(A.boughtDate, '%Y년 %m월 %d일')		AS viewBoughtDate,
          DATE_FORMAT(A.updatedAt, '%Y년 %m월 %d일')		AS viewUpdatedAt,
          A.userId,
          B.username,
          B.userId                                    AS userLoginId,
          B.birth,
          B.gender,
          A.etc
    FROM  boughtLecture			A
   INNER
    JOIN  users					B
      ON  A.userId = B.id
   WHERE  A.isDelete = FALSE
     ${_searchType ? `AND  A.lectureType = ${searchType}` : ``}
     ${_searchPayType ? `AND  A.payType = "${searchPayType}"` : ``}
     ${
       _isPayType === 1
         ? `AND  A.isPay = TRUE`
         : isPayType === 2
         ? `AND  A.isPay = FALSE`
         : ``
     }
     ${
       _searchData
         ? `AND  DATE_FORMAT(A.boughtDate, "%Y-%m") = DATE_FORMAT("${searchDate}-01", "%Y-%m")`
         : ``
     }
   ORDER  BY  A.boughtDate  DESC
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("결제 내역을 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    mobile,
    receiver,
    zoneCode,
    address,
    detailAddress,
    payType,
    pay,
    lectureType,
    name,
    impUid,
    merchantUid,
    isBuyBook,
    bookPrice,
    lectureId,
  } = req.body;

  const YEAR =
    lectureType === 4
      ? `"9999-12-31"`
      : `DATE_ADD(NOW(), INTERVAL ${lectureType} YEAR)`;

  try {
    if (payType === "card" || payType === "paypal") {
      // 신용카드 결제

      const insertQ = `
      INSERT INTO boughtLecture (
        mobile,
        receiver,
        zoneCode,
        address,
        detailAddress,
        payType,
        pay,
        lectureType,
        name,
        boughtDate,
        startDate,
        endDate,
        impUid,
        merchantUid,
        isPay,
        isBuyBook,
        bookPrice,
        createdAt,
        updatedAt,
        userId,
        lectureId
      )
      VALUES
      (
        "${mobile}",
        "${receiver}",
        "${zoneCode}",
        "${address}",
        "${detailAddress}",
        "${payType}",
        ${pay},
        ${lectureType},
        "-",
        NOW(),
        NOW(),
        ${YEAR},
        "${impUid}",
        "${merchantUid}",
        TRUE,
        ${isBuyBook},
        ${bookPrice},
        NOW(),
        NOW(),
        ${req.user.id},
        ${lectureId}
      ) 
      `;
      await models.sequelize.query(insertQ);
    } else {
      // 무통장입금 결제

      const insertQ = `
      INSERT INTO boughtLecture (
        mobile,
        receiver,
        zoneCode,
        address,
        detailAddress,
        payType,
        pay,
        lectureType,
        name,
        impUid,
        merchantUid,
        isPay,
        isBuyBook,
        boughtDate,
        bookPrice,
        createdAt,
        updatedAt,
        userId,
        lectureId
      )
      VALUES
      (
        "${mobile}",
        "${receiver}",
        "${zoneCode}",
        "${address}",
        "${detailAddress}",
        "${payType}",
        ${pay},
        ${lectureType},
        "${name}",
        "-",
        "-",
        FALSE,
        ${isBuyBook},
        NOW(),
        ${bookPrice},
        NOW(),
        NOW(),
        ${req.user.id},
        ${lectureId}
      ) 
      `;
      await models.sequelize.query(insertQ);
    }

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("구매할 수 없습니다.");
  }
});

router.post("/isPay/update", isAdminCheck, async (req, res, next) => {
  const { id, lectureType } = req.body;

  const YEAR =
    lectureType === 4
      ? `"9999-12-31"`
      : `DATE_ADD(NOW(), INTERVAL ${lectureType} YEAR)`;

  const updateQ = `
  UPDATE  boughtLecture
     SET  isPay = TRUE,
          startDate = NOW(),
          endDate = ${YEAR},
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

router.post("/address/update", isAdminCheck, async (req, res, next) => {
  const { id, payType, mobile, receiver, address, detailAddress, etc } =
    req.body;

  const updateQ = `
  UPDATE  boughtLecture
     SET  payType = "${payType}",
          mobile = "${mobile}",
          receiver = "${receiver}",
          address = "${address}",
          detailAddress = "${detailAddress}",
          etc = "${etc}",
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("주소를 수정할 수 없습니다.");
  }
});

router.post("/admin/create", isAdminCheck, async (req, res, next) => {
  const { id, lectureId, mobile, username, lectureType } = req.body;

  const YEAR =
    lectureType === 4
      ? `"9999-12-31"`
      : `DATE_ADD(NOW(), INTERVAL ${lectureType} YEAR)`;

  const insertQ = `
  INSERT INTO boughtLecture (
    mobile,
    receiver,
    zoneCode,
    address,
    detailAddress,
    payType,
    pay,
    lectureType,
    name,
    boughtDate,
    startDate,
    endDate,
    isPay,
    createdAt,
    updatedAt,
    userId,
    lectureId
  )
  VALUES
  (
    "${mobile}",
    "${username}",
    "-",
    "-",
    "-",
    "admin",
    0,
    ${lectureType},
    "-",
    NOW(),
    NOW(),
    ${YEAR},
    TRUE,
    NOW(),
    NOW(),
    ${id},
    ${lectureId}
  ) 
  `;
  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("회원에게 수강권을 부여할 수 없습니다.");
  }
});

router.post("/admin/update", isAdminCheck, async (req, res, next) => {
  const { id, startDate, endDate, lectureType } = req.body;

  const updateQ = `
  UPDATE  boughtLecture
     SET  startDate = "${startDate}",
          endDate = "${endDate}",
          lectureType = ${lectureType}
   WHERE  id = ${id}
  `;
  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("회원의 수강권을 수정할 수 없습니다.");
  }
});

router.post("/admin/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
  UPDATE  boughtLecture
     SET  isDelete = TRUE,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;
  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("회원의 수강권을 수정할 수 없습니다.");
  }
});

router.post("/admin/bought", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT  ROW_NUMBER() OVER()						AS num,
          A.id,
          A.receiver,
          A.mobile,
          A.zoneCode,
          A.address,
          A.detailAddress,
          A.payType,
          A.pay,
          A.lectureType,
          CASE
            WHEN A.lectureType = 1 THEN "1년"
            WHEN A.lectureType = 2 THEN "2년"
            WHEN A.lectureType = 3 THEN "3년"
            WHEN A.lectureType = 4 THEN "평생"
            WHEN A.lectureType = 5 THEN "3달"
            WHEN A.lectureType = 6 THEN "상품"
          END										AS viewLectureType,
          A.name,
          A.recentlyTurn,
          A.recentlyTime,
          A.boughtDate,
          A.startDate,
          A.endDate,
          A.impUid,
          A.merchantUid,
          A.isPay,
          A.isDelete,
          A.userId,
          A.lectureId
    FROM  boughtLecture							A
   WHERE  A.isDelete = FALSE
     AND  A.isPay = TRUE
     AND  A.endDate IS NOT NULL
     AND  DATE_FORMAT(A.endDate, '%Y%m%d') >= DATE_FORMAT(NOW(), '%Y%m%d')
     AND  A.userId = ${id}
   ORDER  BY  A.createdAt DESC
   LIMIT  1
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0][0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("회원이 구매 목록을 불러올 수 없습니다.");
  }
});

router.post("/detail", isLoggedIn, async (req, res, next) => {
  const { id } = req.body;
  const selectQ = `
  SELECT  A.id,
          A.receiver,
          A.mobile,
          A.zoneCode,
          A.address,
          A.detailAddress,
          A.payType,
          FORMAT(A.pay, ',')  AS  viewPay,
          A.pay,
          A.lectureType,
          CASE
            WHEN A.lectureType = 1 THEN "1년"
            WHEN A.lectureType = 2 THEN "2년"
            WHEN A.lectureType = 3 THEN "3년"
            WHEN A.lectureType = 4 THEN "평생"
            WHEN A.lectureType = 5 THEN "3달"
            WHEN A.lectureType = 6 THEN "상품"
          END										AS viewLectureType,
          A.name,
          A.recentlyTurn,
          A.recentlyTime,
          A.boughtDate,
          A.startDate,
          DATE_FORMAT(A.startDate, '%Y년 %m월 %d일')    AS viewStateDate,
          A.endDate,
          DATE_FORMAT(A.endDate, '%Y년 %m월 %d일')      AS viewEndDate,
          A.impUid,
          A.merchantUid,
          A.isPay,
          A.isDelete,
          A.userId,
          A.lectureId
    FROM  boughtLecture							A
   WHERE  A.isDelete = FALSE
     AND  A.id = ${id}
  `;
  try {
    const detail = await models.sequelize.query(selectQ);

    return res.status(200).json(detail[0][0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강권을 불러올 수 없습니다.");
  }
});

router.post("/me/detail", isLoggedIn, async (req, res, next) => {
  const selectQ = `
  SELECT  A.id,
          A.receiver,
          A.mobile,
          A.zoneCode,
          A.address,
          A.detailAddress,
          A.payType,
          FORMAT(A.pay, ',')  AS  viewPay,
          A.pay,
          A.lectureType,
          CASE
            WHEN A.lectureType = 1 THEN "1년"
            WHEN A.lectureType = 2 THEN "2년"
            WHEN A.lectureType = 3 THEN "3년"
            WHEN A.lectureType = 4 THEN "평생"
            WHEN A.lectureType = 5 THEN "3달"
            WHEN A.lectureType = 6 THEN "상품"
          END										AS viewLectureType,
          A.name,
          A.recentlyTurn,
          A.recentlyTime,
          A.boughtDate,
          A.startDate,
          DATE_FORMAT(A.startDate, '%Y년 %m월 %d일')    AS viewStateDate,
          A.endDate,
          DATE_FORMAT(A.endDate, '%Y년 %m월 %d일')      AS viewEndDate,
          A.impUid,
          A.merchantUid,
          A.isPay,
          A.isDelete,
          A.userId,
          A.lectureId
    FROM  boughtLecture							A
   WHERE  A.isDelete = FALSE
     AND  A.userId = ${req.user.id}
   ORDER  BY  A.createdAt DESC
   LIMIT  1
  `;
  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0][0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강권을 불러올 수 없습니다.");
  }
});

router.post("/recently/update", isLoggedIn, async (req, res, next) => {
  const { id, recentlyTurn, recentlyTime } = req.body;

  const updateQ = `
  UPDATE  boughtLecture
     SET  recentlyTurn = ${recentlyTurn},
          recentlyTime = ${recentlyTime},
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("마지막으로 본 영상을 추가할 수 없습니다.");
  }
});

module.exports = router;
