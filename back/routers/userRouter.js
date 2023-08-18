const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const crypt = require("crypt");
const { User } = require("../models");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");
const crypto = require("crypto");

const router = express.Router();

router.post("/all/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY createdAt)		AS num,
          id,
          userId,
          email,
          username,
          mobile,
          CONCAT(SUBSTR(mobile,1,3),'-',SUBSTR(mobile,4,4),'-',SUBSTR(mobile,8,4))      AS viewMobile,
          level,
          isExit,
          birth,
          gender,
          (
            SELECT  COUNT(B.id)
              FROM  keywordConnect    B
             WHERE  B.UserId = A.id
          )                               AS keyword,
          consulting,
          zoneCode,
          address,
          detailAddress,
          tel,
          CASE
            WHEN	level = 1	THEN "일반회원"
            WHEN	level = 2	THEN "비어있음"
            WHEN	level = 3	THEN "운영자"
            WHEN	level = 4	THEN "최고관리자"
            WHEN	level = 5	THEN "개발사"
          END											AS viewLevel,
          terms,
          CASE
            WHEN A.previousCreatedAt IS NULL THEN createdAt
            ELSE A.previousCreatedAt
          END                     AS createdAt,
          updatedAt,
          exitedAt,
          CASE
            WHEN (
                  SELECT  COUNT(B.id)
                    FROM  review        B
                   WHERE  A.id = B.UserId
                 ) > 0 THEN 1
            ELSE 0
          END                                       AS isWriteReview,
          CASE
            WHEN A.previousCreatedAt IS NULL THEN DATE_FORMAT(createdAt, "%Y년 %m월 %d일")
            ELSE DATE_FORMAT(A.previousCreatedAt, "%Y년 %m월 %d일")
          END                                       AS viewCreatedAt,
		      DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
		      DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")		  AS viewExitedAt,
          isBlack,
          CASE
            WHEN (
                   SELECT  COUNT(B.id)
                     FROM  boughtLecture   B
                    WHERE  B.UserId = A.id 
                      AND  B.isDelete = FALSE
                      AND  B.isPay = TRUE
                 ) > 0  THEN  "o"
            ELSE "x"
          END                                       AS boughtLecture
    FROM	users         A
   WHERE  isExit = FALSE
   ORDER	BY num DESC
  `;
  try {
    const allList = await models.sequelize.query(selectQuery);

    return res.status(200).json(allList[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

router.post("/list", isAdminCheck, async (req, res, next) => {
  const {
    keyword,
    page,
    searchData,
    searchLevel,
    searchExit,
    searchReviewType,
  } = req.body;

  const _searchData = searchData ? searchData : ``;

  const _searchLevel = parseInt(searchLevel) === 0 ? 0 : parseInt(searchLevel);

  const _searchReviewType = searchReviewType ? parseInt(searchReviewType) : 3;

  const _searchExit = searchExit ? searchExit : false;

  const _keyword = keyword ? keyword : null;

  const LIMIT = 20;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 20;

  const lengthQuery = `
  SELECT	COUNT(A.id)           AS userCnt
    FROM	users   A
   WHERE	CONCAT(username, userId, mobile) LIKE '%${_searchData}%'
          ${
            _keyword
              ? `AND ${_keyword} IN (
                                        SELECT  C.id
                                          FROM  keywordConnect    B
                                         INNER
                                          JOIN  keyword           C
                                            ON  B.KeywordId = C.id
                                         WHERE  A.id = B.UserId
                                      )`
              : ""
          }
          ${
            _searchLevel === parseInt(0)
              ? ``
              : _searchLevel === 1
              ? `AND level = 1`
              : _searchLevel === 3
              ? `AND level = 3`
              : _searchLevel === 4
              ? `AND level = 4`
              : _searchLevel === 5
              ? `AND level = 5`
              : ``
          } 
          AND	isExit = ${_searchExit}
          ${
            _searchReviewType === 1
              ? `AND  (CASE
                        WHEN (
                              SELECT  COUNT(B.id)
                                FROM  review        B
                               WHERE  A.id = B.UserId
                             ) > 0 THEN 1
                        ELSE 0
                      END) = 1`
              : _searchReviewType === 2
              ? `AND  (CASE
                        WHEN (
                              SELECT  COUNT(B.id)
                                FROM  review        B
                               WHERE  A.id = B.UserId
                             ) > 0 THEN 1
                        ELSE 0
                      END) = 0`
              : ``
          }
  `;

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY (
                                        CASE
                                          WHEN A.previousCreatedAt IS NULL THEN createdAt
                                          ELSE A.previousCreatedAt
                                        END
                                      ))		AS num,
          id,
          userId,
          email,
          username,
          mobile,
          CONCAT(SUBSTR(mobile,1,3),'-',SUBSTR(mobile,4,4),'-',SUBSTR(mobile,8,4))      AS viewMobile,
          level,
          isExit,
          birth,
          gender,
          (
            SELECT  COUNT(B.id)
              FROM  keywordConnect    B
             WHERE  B.UserId = A.id
          )                               AS keyword,
          consulting,
          zoneCode,
          address,
          detailAddress,
          tel,
          CASE
            WHEN	level = 1	THEN "일반회원"
            WHEN	level = 2	THEN "비어있음"
            WHEN	level = 3	THEN "운영자"
            WHEN	level = 4	THEN "최고관리자"
            WHEN	level = 5	THEN "개발사"
          END											AS viewLevel,
          terms,
          CASE
            WHEN A.previousCreatedAt IS NULL THEN createdAt
            ELSE A.previousCreatedAt
          END                     AS createdAt,
          updatedAt,
          exitedAt,
          CASE
            WHEN (
                  SELECT  COUNT(B.id)
                    FROM  review        B
                   WHERE  A.id = B.UserId
                 ) > 0 THEN 1
            ELSE 0
          END                                       AS isWriteReview,
          CASE
            WHEN A.previousCreatedAt IS NULL THEN DATE_FORMAT(createdAt, "%Y년 %m월 %d일")
            ELSE DATE_FORMAT(A.previousCreatedAt, "%Y년 %m월 %d일")
          END                                       AS viewCreatedAt,
		      DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
		      DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")		  AS viewExitedAt,
          isBlack
    FROM	users         A
   WHERE	CONCAT(username, userId, mobile) LIKE '%${_searchData}%'
          ${
            _keyword
              ? `AND ${_keyword} IN (
                                       SELECT  C.id
                                         FROM  keywordConnect    B
                                        INNER
                                         JOIN  keyword           C
                                           ON  B.KeywordId = C.id
                                        WHERE  A.id = B.UserId
                                     )`
              : ""
          }
          ${
            _searchLevel === parseInt(0)
              ? ``
              : _searchLevel === 1
              ? `AND level = 1`
              : _searchLevel === 3
              ? `AND level = 3`
              : _searchLevel === 4
              ? `AND level = 4`
              : _searchLevel === 5
              ? `AND level = 5`
              : ``
          } 
          AND	isExit = ${_searchExit}
          ${
            _searchReviewType === 1
              ? `AND  (CASE
                        WHEN (
                              SELECT  COUNT(B.id)
                                FROM  review        B
                               WHERE  A.id = B.UserId
                             ) > 0 THEN 1
                        ELSE 0
                      END) = 1`
              : _searchReviewType === 2
              ? `AND  (CASE
                        WHEN (
                              SELECT  COUNT(B.id)
                                FROM  review        B
                               WHERE  A.id = B.UserId
                             ) > 0 THEN 1
                        ELSE 0
                      END) = 0`
              : ``
          }
   ORDER	BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const list = await models.sequelize.query(selectQuery);
    const selectBoughtQ = `
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
       AND  isPay = TRUE
       AND  A.userId IN (${
         list[0].length === 0 ? 0 : list[0].map((data) => data.id)
       })
     ORDER  BY  A.boughtDate  DESC
    `;
    const selectBought = await models.sequelize.query(selectBoughtQ);

    const listLen = lengths[0][0].userCnt;

    const lastPage =
      listLen % LIMIT > 0 ? listLen / LIMIT + 1 : listLen / LIMIT;

    const keywordSelect = `
      SELECT	ROW_NUMBER() OVER(ORDER	BY (
                                           CASE
                                             WHEN A.previousCreatedAt IS NULL THEN createdAt
                                             ELSE A.previousCreatedAt
                                           END
                                         ))		AS num,
              id,
              userId,
              email,
              username,
              mobile,
              CONCAT(SUBSTR(mobile,1,3),'-',SUBSTR(mobile,4,4),'-',SUBSTR(mobile,8,4))      AS viewMobile,
              level,
              isExit,
              birth,
              gender,
              (
                SELECT  COUNT(B.id)
                FROM  keywordConnect    B
                WHERE  B.UserId = A.id
              )                               AS keyword,
              consulting,
              zoneCode,
              address,
              detailAddress,
              tel,
              CASE
                WHEN	level = 1	THEN "일반회원"
                WHEN	level = 2	THEN "비어있음"
                WHEN	level = 3	THEN "운영자"
                WHEN	level = 4	THEN "최고관리자"
                WHEN	level = 5	THEN "개발사"
              END											AS viewLevel,
              terms,
              CASE
                WHEN A.previousCreatedAt IS NULL THEN createdAt
                ELSE A.previousCreatedAt
              END                     AS createdAt,
              updatedAt,
              exitedAt,
              CASE
                WHEN (
                      SELECT  COUNT(B.id)
                      FROM  review        B
                      WHERE  A.id = B.UserId
                     ) > 0 THEN 1
                ELSE 0
              END                                       AS isWriteReview,
              CASE
                WHEN A.previousCreatedAt IS NULL THEN DATE_FORMAT(createdAt, "%Y년 %m월 %d일")
                ELSE DATE_FORMAT(A.previousCreatedAt, "%Y년 %m월 %d일")
              END                                       AS viewCreatedAt,
              DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
              DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")		  AS viewExitedAt,
              isBlack,
              CASE
                WHEN (
                        SELECT  COUNT(B.id)
                          FROM  boughtLecture   B
                         WHERE  B.UserId = A.id 
                           AND  B.isDelete = FALSE
                           AND  B.isPay = TRUE
                     ) > 0  THEN  "o"
                ELSE "x"
              END                                       AS boughtLecture
        FROM	users         A
       WHERE	CONCAT(username, userId, mobile) LIKE '%${_searchData}%'
              ${
                _keyword
                  ? `AND ${_keyword} IN (
                     SELECT  C.id
                       FROM  keywordConnect    B
                      INNER
                       JOIN  keyword           C
                         ON  B.KeywordId = C.id
                      WHERE  A.id = B.UserId
                   )`
                  : ""
              }
              ${
                _searchLevel === parseInt(0)
                  ? ``
                  : _searchLevel === 1
                  ? `AND level = 1`
                  : _searchLevel === 3
                  ? `AND level = 3`
                  : _searchLevel === 4
                  ? `AND level = 4`
                  : _searchLevel === 5
                  ? `AND level = 5`
                  : ``
              } 
              AND	isExit = ${_searchExit}
              ${
                _searchReviewType === 1
                  ? `AND  (CASE
              WHEN (
              SELECT  COUNT(B.id)
              FROM  review        B
              WHERE  A.id = B.UserId
              ) > 0 THEN 1
              ELSE 0
              END) = 1`
                  : _searchReviewType === 2
                  ? `AND  (CASE
              WHEN (
              SELECT  COUNT(B.id)
              FROM  review        B
              WHERE  A.id = B.UserId
              ) > 0 THEN 1
              ELSE 0
              END) = 0`
                  : ``
              }
              ORDER	BY num DESC
                    `;

    if (_keyword) {
      const keywordResult = await models.sequelize.query(keywordSelect);

      return res.status(200).json({
        list: list[0].map((data) => ({
          ...data,
          boughtList: selectBought[0].filter(
            (value) => data.id === value.userId
          ),
        })),
        lastPage: parseInt(lastPage),
        keywordList: keywordResult[0],
      });
    } else {
      return res.status(200).json({
        list: list[0].map((data) => ({
          ...data,
          boughtList: selectBought[0].filter(
            (value) => data.id === value.userId
          ),
        })),
        lastPage: parseInt(lastPage),
        keywordList: null,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

// 권한메뉴 관리자 리스트
router.post("/adminList", async (req, res, next) => {
  const { username, type } = req.body;

  // Validate
  const _username = username ? username : "";

  const selectQuery = `
  SELECT	id,
          username,
          email,
          level,
          mobile,
          CONCAT(SUBSTR(mobile,1,3),'-',SUBSTR(mobile,4,4),'-',SUBSTR(mobile,8,4))      AS viewMobile,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일") AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") AS updatedAt,
          DATE_FORMAT(exitedAt, "%Y년 %m월 %d일") AS viewExitedAt,
          menuRight1,
          menuRight2,
          menuRight3,
          menuRight4,
          menuRight5,
          menuRight6,
          menuRight7,
          menuRight8,
          menuRight9,
          menuRight10,
          menuRight11,
          menuRight12
    FROM	users  
   WHERE	1 = 1
     AND  username LIKE "${_username}%"
     AND  level LIKE 5
   ORDER  BY createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("관리자 정보를 불러올 수 없습니다.");
  }
});

// 관리자 메뉴 권한 제어
router.post("/update/menuRight", async (req, res, next) => {
  const { userId, type, status } = req.body;

  let inQuery = "";

  switch (parseInt(type)) {
    case 1:
      inQuery = `SET  menuRight1 =  ${status}`;
      break;

    case 2:
      inQuery = `SET  menuRight2 =  ${status}`;
      break;

    case 3:
      inQuery = `SET  menuRight3 =  ${status}`;
      break;

    case 4:
      inQuery = `SET  menuRight4 =  ${status}`;
      break;

    case 5:
      inQuery = `SET  menuRight5 =  ${status}`;
      break;

    case 6:
      inQuery = `SET  menuRight6 =  ${status}`;
      break;

    case 7:
      inQuery = `SET  menuRight7 =  ${status}`;
      break;

    case 8:
      inQuery = `SET  menuRight8 =  ${status}`;
      break;

    case 9:
      inQuery = `SET  menuRight9 =  ${status}`;
      break;

    case 10:
      inQuery = `SET  menuRight10 =  ${status}`;
      break;

    case 11:
      inQuery = `SET  menuRight11 =  ${status}`;
      break;

    case 12:
      inQuery = `SET  menuRight12 =  ${status}`;
      break;

    default:
      break;
  }

  const updateQuery = `
    UPDATE  users
       ${inQuery}
     WHERE  id = ${userId}
  `;

  const insertQuery2 = `
  INSERT INTO adminUserRightHistorys (returnId, memo, createdAt, updatedAt) VALUES 
  (
    "${userId}",
    "${
      type === 1
        ? `통계관리`
        : type === 2
        ? `기초정보관리`
        : type === 3
        ? `배너관리`
        : type === 4
        ? `게시판관리`
        : type === 5
        ? `회원관리`
        : type === 6
        ? `고객지원관리`
        : type === 7
        ? `기록관리`
        : type === 8
        ? `DIY관리`
        : type === 9
        ? `ERROR`
        : type === 10
        ? `ERROR`
        : type === 11
        ? `ERROR`
        : type === 12
        ? `ERROR`
        : `ERROR`
    } ${status === 1 ? `ON` : status === 0 ? `OFF` : `ERROR`}",
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
    return res
      .status(400)
      .send("관리자 권한을 제어할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.value,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	userHistory		A
     INNER
      JOIN	users 			  B
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

router.post(
  "/adminUserRight/history/list",
  isAdminCheck,
  async (req, res, next) => {
    const { datePick } = req.body;

    const _datePick = datePick ? datePick : null;

    const selectQuery = `
    SELECT 	A.id,
            A.returnId,
            A.memo,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	adminUserRightHistorys		A

     INNER
      JOIN	users 			B
        ON	A.returnId = B.id
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
  }
);

router.get("/signin", async (req, res, next) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const findQ = `
      SELECT  A.id,
              A.userId,
              A.username,
              A.birth,
              A.gender,
              A.zoneCode,
              A.address,
              A.detailAddress,
              A.tel,
              A.mobile,
              A.email,
              A.level,
              A.menuRight1,
              A.menuRight2,
              A.menuRight3,
              A.menuRight4,
              A.menuRight5,
              A.menuRight6,
              A.menuRight7,
              A.menuRight8,
              A.isBlack
        FROM  users			A
       WHERE  A.id = ${req.user.id}
      `;

      const find = await models.sequelize.query(findQ);

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log({ ...find[0][0] });
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json({ ...find[0][0] });
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      // const fullUserWithoutPassword = await User.findOne({
      //   where: { id: user.id },
      // });

      const findQ = `
      SELECT  A.id,
              A.userId,
              A.username,
              A.birth,
              A.gender,
              A.zoneCode,
              A.address,
              A.detailAddress,
              A.tel,
              A.mobile,
              A.email,
              A.level,
              A.menuRight1,
              A.menuRight2,
              A.menuRight3,
              A.menuRight4,
              A.menuRight5,
              A.menuRight6,
              A.menuRight7,
              A.menuRight8,
              A.isBlack
        FROM  users			A
       WHERE  A.id = ${user.id}
      `;

      const find = await models.sequelize.query(findQ);

      return res.status(200).json({ ...find[0][0] });
    });
  })(req, res, next);
});

router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const {
    userId,
    username,
    password,
    birth,
    gender,
    zoneCode,
    address,
    detailAddress,
    email,
    mobile,
    terms,
  } = req.body;

  if (!terms) {
    return res.status(401).send("이용약관에 동의해주세요.");
  }

  const exUser = await User.findOne({
    where: { userId: userId },
  });

  if (exUser) {
    return res.status(401).send("이미 가입된 회원 입니다.");
  }

  // if (email) {
  //   const exEmail = await User.findOne({
  //     where: { email: email },
  //   });
  //   if (exEmail) {
  //     return res.status(401).send("이미 가입된 이메일 입니다.");
  //   }
  // }

  let cipher = crypto.createHash("sha512");

  cipher.update(password);
  const hashedPassword = cipher.digest("hex");

  // const hashedPassword = await bcrypt.hash(password, 12);

  const insertQ = `
    INSERT INTO users 
    (
      userId,
      username,
      password,
      birth,
      gender,
      zoneCode,
      address,
      detailAddress,
      email,
      mobile,
      terms,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "${userId}",
      "${username}",
      "${hashedPassword}",
      ${birth ? `"${birth}"` : `"-"`},
      ${gender ? `"${gender}"` : `"-"`},
      ${zoneCode ? `"${zoneCode}"` : `"-"`},
      ${address ? `"${address}"` : `"-"`},
      ${detailAddress ? `"${detailAddress}"` : `"-"`},
      ${email ? `"${email}"` : `"-"`},
      "${mobile}",
      ${terms},
      NOW(),
      NOW()
    )
    `;

  const insertResult = await models.sequelize.query(insertQ);

  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    // const fullUserWithoutPassword = await User.findOne({
    //   where: { id: user.id },
    // });

    const findQ = `
        SELECT  A.id,
                A.userId,
                A.username,
                A.birth,
                A.gender,
                A.zoneCode,
                A.address,
                A.detailAddress,
                A.tel,
                A.mobile,
                A.email,
                A.level,
                A.menuRight1,
                A.menuRight2,
                A.menuRight3,
                A.menuRight4,
                A.menuRight5,
                A.menuRight6,
                A.menuRight7,
                A.menuRight8,
                A.isBlack
          FROM  users			A
         WHERE  A.id = ${insertResult[0]}
        `;

    const find = await models.sequelize.query(findQ);

    // return res.status(200).json({ ...find[0][0] });

    return req.login(find[0][0], async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      return res.status(200).json(find[0][0]);
    });
  })(req, res, next);
});

router.post("/check/userid", async (req, res, next) => {
  const { userId } = req.body;

  const selectQ = `
  SELECT  id
    FROM  users
   WHERE  userId = "${userId}"
     AND  isExit = FALSE
  `;

  try {
    const find = await models.sequelize.query(selectQ);

    if (find[0].length > 0) {
      return res.status(400).send("중복된 아이디가 있습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("중복확인을 할 수 없습니다.");
  }
});

router.post("/check/email", async (req, res, next) => {
  const { email } = req.body;

  const selectQ = `
  SELECT  id
    FROM  users
   WHERE  email = "${email}"
     AND  isExit = FALSE
  `;

  try {
    const find = await models.sequelize.query(selectQ);

    if (find[0].length > 0) {
      return res.status(400).send("중복된 이메일이 있습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("중복확인을 할 수 없습니다.");
  }
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 불러올 수 없습니다.");
  }
});

router.post("/me/update", isLoggedIn, async (req, res, next) => {
  const { password, mobile, username, address, zoneCode, detailAddress } =
    req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(req.user.id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    // const selectQ = `
    // SELECT  id,
    //         password
    //   FROM  users
    //  WHERE  id = ${req.user.id}
    // `;
    // const find = await models.sequelize.query(selectQ);

    let hashedPassword = null;

    if (password) {
      let cipher = crypto.createHash("sha512");

      cipher.update(password);
      hashedPassword = cipher.digest("hex");
    }

    // const result = await bcrypt.compare(password, exUser.password);

    // if (find[0][0]) {
    //   if (find[0][0].password !== hashedPassword) {
    //     return res.status(401).send("비밀번호가 일치하지 않습니다.");
    //   }
    // }

    const updateQ = `
    UPDATE  users
       SET  mobile = "${mobile}",
            username = "${username}",
            address = "${address}",
            zoneCode = "${zoneCode}",
            detailAddress = "${detailAddress}",
            ${password ? `password = "${hashedPassword}",` : ""}
            updatedAt = NOW()
     WHERE  id = ${req.user.id}
    `;

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

router.post("/find/userId", async (req, res, next) => {
  const { username, mobile } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        username,
        mobile,
      },
    });

    if (exUser) {
      return res.status(200).json({ userId: exUser.userId });
    } else {
      return res.status(200).json({ userId: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("아이디를 찾을 수 없습니다.");
  }
});

router.post("/modifypass", async (req, res, next) => {
  const { email, mobile } = req.body;

  const findQ = `
  SELECT  id
    FROM  users
   WHERE  email = "${email}"
     AND  mobile = "${mobile}"
  `;

  try {
    const find = await models.sequelize.query(findQ);

    if (find[0].length === 0) {
      return res.status(401).send("일치하는 이메일 또는 연락처가 없습니다.");
    }

    const UUID = generateUUID();

    const updateResult = await User.update(
      { secret: UUID },
      {
        where: { mobile: mobile, email },
      }
    );

    if (updateResult[0] > 0) {
      // 이메일 전송

      await sendSecretMail(
        email,
        `🔐 [보안 인증코드 입니다.] 친절한 영어교실 에서 비밀번호 변경을 위한 보안인증 코드를 발송했습니다.`,
        `
          <div>
            <h3>친절한 영어교실</h3>
            <hr />
            <p>보안 인증코드를 발송해드립니다. 친절한 영어교실 홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
            <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

            <br /><hr />
            <article>
              발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
            </article>
          </div>
          `
      );

      return res.status(200).json({ result: true });
    } else {
      return res
        .status(401)
        .send("요청이 올바르지 않습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. [CODE097]");
  }
});

router.post("/modifypass/checked", async (req, res, next) => {
  const { email, mobile, secret } = req.body;

  const findQ = `
SELECT  id,
        secret
  FROM  users
 WHERE  email = "${email}"
   AND  mobile = "${mobile}"
`;

  try {
    const find = await models.sequelize.query(findQ);

    if (find[0].find((data) => data.secret === secret)) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(400).send("인증번호가 일치하지 않습니다.");
    }
  } catch (e) {
    console.error(e);
    return res.status(401).send("인증번호를 검사할 수 없습니다.");
  }
});

router.post("/modifypass/update", async (req, res, next) => {
  const { email, mobile, secret, password } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        email: email,
        mobile: mobile,
      },
    });

    if (!exUser || exUser.secret !== secret) {
      return res.status(401).send("인증번호가 일치하지 않습니다.");
    }

    let cipher = crypto.createHash("sha512");

    cipher.update(password);
    const hashPassword = cipher.digest("hex");

    // const hashPassword = await bcrypt.hash(password, 12);

    const updateResult = await User.update(
      { password: hashPassword },
      {
        where: { email: email, mobile: mobile },
      }
    );

    if (updateResult[0] === 1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  const findUserQuery = `
  SELECT  level
    FROM  users
   WHERE  id = ${selectUserId}
  `;

  try {
    const userData = await models.sequelize.query(findUserQuery);

    if (userData[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const currentLevel = parseInt(userData[0][0].level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateQuery = `
    UPDATE  users
       SET  level = ${changeLevel},
            updatedAt = NOW()
     WHERE  id = ${selectUserId}
    `;

    const insertQuery = `
    INSERT  INTO  userHistory
    (
      value,
      content,
      updator,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "권한 수정",
      "${
        changeLevel === 1
          ? `일반회원`
          : changeLevel === 2
          ? `비어있음`
          : changeLevel === 3
          ? `운영자`
          : changeLevel === 4
          ? `최고관리자`
          : `일반회원`
      }",
      ${req.user.id},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.get(
  "/kakaoLogin",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/");
  }
);

router.get(
  "/kakao/oauth",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    return res.redirect("/");
  }
);

router.post("/exit/update/true", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
      UPDATE users
         SET isExit = TRUE
           exitedAt = NOW()
       WHERE id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

router.post("/exit/update/false", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
    UPDATE  users
       SET  isExit = FALSE
     WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  req.session.save(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.post("/admin/update", isAdminCheck, async (req, res, next) => {
  const {
    id,
    type,
    userId,
    username,
    password,
    mobile,
    consulting,
    zoneCode,
    address,
    detailAddress,
  } = req.body;
  // type
  // 1 아이디수정
  // 2 사용자명수정
  // 3 연락처수정
  // 4 비밀번호수정
  // 5 키워드 & 상담 수정

  try {
    if (parseInt(type) === 1) {
      const findQ = `
        SELECT  userId
          FROM  users
         WHERE  id = ${id}
      `;

      const find = await models.sequelize.query(findQ);

      if (find[0][0].userId === userId) {
        return res.status(401).send("중복된 아이디가 있습니다.");
      }

      const updateQ = `
        UPDATE  users
           SET  userId = "${userId}",
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else if (parseInt(type) === 2) {
      const updateQ = `
        UPDATE  users
           SET  username = "${username}",
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else if (parseInt(type) === 3) {
      const updateQ = `
        UPDATE  users
           SET  mobile = "${mobile}",
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else if (parseInt(type) === 4) {
      let cipher = crypto.createHash("sha512");

      cipher.update(password);
      const hashPassord = cipher.digest("hex");

      // const hashPassord = await bcrypt.hash(password, 12);

      const updateQ = `
        UPDATE  users
           SET  password = "${hashPassord}",
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else if (parseInt(type) === 5) {
      const updateQ = `
        UPDATE  users
           SET  consulting = ${consulting ? `"${consulting}"` : `NULL`},
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else if (parseInt(type) === 6) {
      const updateQ = `
        UPDATE  users
           SET  zoneCode = "${zoneCode}",
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else if (parseInt(type) === 7) {
      const updateQ = `
        UPDATE  users
           SET  address = "${address}",
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else if (parseInt(type) === 8) {
      const updateQ = `
        UPDATE  users
           SET  detailAddress = "${detailAddress}",
                updatedAt = NOW()
         WHERE  id = ${id}
        `;

      await models.sequelize.query(updateQ);
    } else {
      return res.status(401).send("수정할 수 없습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("수정할 수 없습니다.");
  }
});

router.post("/admin/enjoyList", isAdminCheck, async (req, res, next) => {
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
        ON  A.MediaId = B.id
     WHERE  A.UserId = ${id}
     ORDER  BY  A.createdAt = DESC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("수강 기록을 불러올 수 없습니다.");
  }
});

router.post("/insert/xlsx", isAdminCheck, async (req, res, next) => {
  // const { data } = req.body;

  // if (!Array.isArray(data)) {
  //   return res.status(401).send("잘못된 요청입니다.");
  // }

  try {
    // await Promise.all(
    //   test.map(async (data) => {
    //     const insertQ = `
    //     INSERT INTO media
    //     (
    //       title,
    //       sort,
    //       previousId,
    //       createdAt,
    //       updatedAt
    //     )
    //     VALUES
    //     (
    //       "${data.title}",
    //       ${data.sort},
    //       '${data._id}',
    //       NOW(),
    //       NOW()
    //     )
    //     `;

    //     await models.sequelize.query(insertQ);
    //   })
    // );

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("엑셀데이터를 넣을 수 없습니다.");
  }
});

router.post("/admin/banner", isAdminCheck, async (req, res, next) => {
  const selectQ = `
  SELECT  (
            SELECT 	COUNT(A.id)
              FROM 	boughtLecture	A 
             WHERE  DATE_FORMAT(A.boughtDate,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d')
          )			AS boughtCnt,
          (
            SELECT  COUNT(B.id)
              FROM  users			B
             WHERE  DATE_FORMAT(B.createdAt ,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d')
          )			AS userCnt,
          (
            SELECT  COUNT(C.id)
              FROM  review			C
             WHERE  DATE_FORMAT(C.createdAt ,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d')
          )			AS reviewCnt,
          (
            SELECT  COUNT(D.id)
              FROM  notices			D
             WHERE  DATE_FORMAT(D.createdAt ,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d')
          )			AS noticeCnt
    FROM  DUAL
  `;

  try {
    const banner = await models.sequelize.query(selectQ);

    return res.status(200).json(banner[0][0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("관리자 베너를 불러올 수 없습니다.");
  }
});

router.post("/admin/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const findQ = `
    SELECT  id,
            isExit
      FROM  users
     WHERE  id = ${id}
    `;

  const delQ = `
  UPDATE  users
     SEt  isExit = 1,
          exitedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    const find = await models.sequelize.query(findQ);

    if (find[0].length === 0) {
      return res.status(401).send("존재하지 않는 회원입니다.");
    }

    if (findQ[0][0].isExit) {
      return res.status(401).send("이미 삭제된 회원입니다.");
    }

    await models.sequelize.query(delQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("회원을 삭제할 수 없습니다.");
  }
});

router.post("/admin/isBlack", isAdminCheck, async (req, res, next) => {
  const { id, isBlack } = req.body;

  const findQ = `
    SELECT  id
      FROM  users
     WHERE  id = ${id}
    `;

  const blackQ = `
  UPDATE  users
     SEt  isBlack = ${isBlack},
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    const find = await models.sequelize.query(findQ);

    if (find[0].length === 0) {
      return res.status(401).send("존재하지 않는 회원입니다.");
    }

    await models.sequelize.query(blackQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("회원을 삭제할 수 없습니다.");
  }
});

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// KEYWORD ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// 키워드 리스트
router.post("/keyword/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
  SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)        	AS num,
          A.id,
          A.value,
          (
            SELECT  COUNT(id)
              FROM  keywordConnect				B
             WHERE  B.KeywordId = A.id
          )												AS useKeywordCnt,
          A.createdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")			AS viewCreatedAt,
          A.updatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")			AS viewUpdatedAt
    FROM  keyword 			A
   WHERE  A.isDelete = 0
  `;
  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("키워드를 불러올 수 업습니다.");
  }
});

// 키워드 생성
router.post("/keyword/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  const insertQuery = `
  INSERT INTO keyword (
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
    return res.status(401).send("키워드를 생성할 수 없습니다.");
  }
});

// 키워드 삭제
router.post("/keyword/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const findQuery = `
  SELECT  id
    FROM  keyword k
   WHERE  id = ${id}
     AND  isDelete = 0
  `;

  const deleteQuery = `
  UPDATE  keyword
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;
  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(400).send("키워드를 삭제할 수 없습니다.");
    }

    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("키워드를 삭제할 수 없습니다.");
  }
});

// 회원 키워드 리스트
router.post("/keyword/userList", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT  A.id,
		      A.UserId,
		      A.KeywordId,
		      B.value
    FROM  keywordConnect				A
   INNER
    JOIN  keyword						    B
      ON  A.KeywordId = B.id
   WHERE  A.UserId = ${id}
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("키워드를 조회할 수 없습니다.");
  }
});

// 회원 키워드 부여
router.post("/keyword/userCreate", isAdminCheck, async (req, res, next) => {
  const { UserId, KeywordId } = req.body;

  const insertQuery = `
  INSERT INTO keywordConnect (
    UserId,
    KeywordId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${UserId},
    ${KeywordId},
    NOW(),
    NOW()
  )
  `;

  try {
    const result = await models.sequelize.query(insertQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(401).send("키워드를 추가할 수 없습니다.");
  }
});

// 회원 키워드 삭제
router.post("/keyword/userDelete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const findQuery = `
  SELECT  id
    FROM  keywordConnect k
   WHERE  id = ${id}
  `;

  const deleteQuery = `
    DELETE  
      FROM  keywordConnect
     WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(400).send("이미 삭제된 키워드 입니다.");
    }

    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("키워드를 삭제할 수 없습니다.");
  }
});

module.exports = router;
