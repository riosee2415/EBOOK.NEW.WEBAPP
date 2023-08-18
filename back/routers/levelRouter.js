const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");
const {
  noneParameterSelectQuery,
  actionUpdateQuery,
  insertAction,
} = require("../middlewares/structure");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

const constructureHandler = async () => {
  const sq = `
        SELECT  id
          FROM  levelTest
    `;

  const ex = await noneParameterSelectQuery(sq);

  if (ex.length === 0) {
    console.log("데이터 한개도 없어서 넣어야 됨");

    const nq = `
  INSERT INTO levelTest (\`number\`, value, createdAt, updatedAt) VALUES 
  (1, "나는 아래의 영어 단어를 문제 없이 읽을 수 있다.\n land, rain, play, size, face", NOW(), NOW()),
  (2, "나는 영어로 나이, 날짜, 시간, 요일을 말할 수 있다.", NOW(), NOW()),
  (3, "나는 아래와 같은 문장을 영어로 말할 수 있다.\n[당신은 바쁜가요?]\n[당신은 한국 음식을 좋아하나요?]\n문 좀 닫아주시겠어요?", NOW(), NOW()),
  (4, "나는 괄호 안에 들어갈 알맞은 단어를 알고 있다.\n I play tennis (      ) Sunday. 나는 토요일에 테니스를 쳐요.\nCan you wait (       ) me? 나를 기다려 줄 수 있나요?\nI can do it (       ) tomorrow. 나는 내일까지 할 수 있어요.", NOW(), NOW()),
  (5, "나는 평소 일상적으로 하는 일, 어제 있었던 일, 내일 할 일 등에 대해 알맞은 시제를 써서 영어로 말할 수 있다.", NOW(), NOW()),
  (6, "나는 아래와 같은 문장을 영어로 말할 수 있다.\n나는 주로 아침에 커피를 마셔요.\n나는 일년에 한 번 여행을 가요.\n나는 자주 등산을 가요.", NOW(), NOW()),
  (7, "나는 아래와 같은 문장을 영어로 말할 수 있다.\n나는 영어 공부를 해야 해요.\n당신은 쉬는 게 좋겠어요.\n나는 내년에 유럽에 갈 지도 몰라요.", NOW(), NOW())
  `;

    await models.sequelize.query(nq);
  }
};

constructureHandler();

router.post("/list", async (req, res, next) => {
  const { isAdmin = false } = req.body;

  const sq = `SELECT	id,
                      number,
                        value,
                        number,
                        isHide
                  FROM	levelTest
                ${isAdmin ? `` : `WHERE	isHide = 0`}
                ORDER BY  number ASC
                `;

  const list = await noneParameterSelectQuery(sq);

  return res.status(200).json(list);
});

router.post("/toggle", async (req, res, next) => {
  const { id, nextFlag } = req.body;

  const uq = `
        UPDATE  levelTest
           SET  isHide = ${nextFlag}
         WHERE  id = ${id}
    `;

  await actionUpdateQuery(uq);

  return res.status(200).json({ result: true });
});

router.post("/valueUpdate", async (req, res, next) => {
  const { id, nextValue } = req.body;

  const uq = `
          UPDATE  levelTest
             SET  value = "${nextValue}"
           WHERE  id = ${id}
      `;

  await actionUpdateQuery(uq);

  return res.status(200).json({ result: true });
});

//
//  줌 강의 가져오기
//
router.post("/zoom/lecture/list", async (req, res, next) => {
  const { level = false } = req.body;

  const sq = `
  SELECT	A.id,
  A.days,
  A.startTime,
  A.endTime,
  A.levelValue,
  A.terms,
  A.tName,
  A.price,
  A.isEnd,
  A.createdAt,
  A.zoomRink,
  A.degree,
  DATE_FORMAT(A.createdAt, "%Y-%m-%d")	as viewCreatedAt,
  (
    SELECT	COUNT(*)
      FROM	zoomPeople
     WHERE	ZoomLectureId =	A.id 
       AND  isCompleted = false
  )	AS cnt
FROM	zoomLecture	A
${level ? `WHERE A.levelValue =	"${level}"` : ``}
ORDER  BY A.createdAt DESC
  `;

  const list = await noneParameterSelectQuery(sq);

  return res.status(200).json(list);
});

//
//  줌 강의 디테일 정보가져오기
//
router.post("/zoom/lecture/target", async (req, res, next) => {
  const { id } = req.body;
  const sq = `
  SELECT	A.id,
  A.days,
  A.startTime,
  A.endTime,
  A.levelValue,
  A.terms,
  A.tName,
  A.price,
  A.isEnd,
  A.createdAt,
  A.zoomRink,
  A.degree,
  DATE_FORMAT(A.createdAt, "%Y-%m-%d")	as viewCreatedAt,
  (
    SELECT	COUNT(*)
      FROM	zoomPeople
     WHERE	ZoomLectureId =	A.id 
       AND  isCompleted = false
  )	AS cnt
FROM	zoomLecture	A
WHERE A.id = ${id}
  `;

  const list = await noneParameterSelectQuery(sq);

  return res.status(200).json(list[0]);
});

//
//  줌 강의 추가하기
//
router.post("/zoom/lecture/new", isAdminCheck, async (req, res, next) => {
  const {
    days = "월화수",
    startTime = "00:00",
    endTime = "00:00",
    levelValue = "LEVEL1",
    terms = "01월 01일 ~ 01월 01일",
    tName = "선생님이름",
    price = 0,
    zoomRink = "줌링크",
    degree = "1차수",
  } = req.body;

  const list = [
    {
      column: "days",
      data: days,
      isNumeric: false,
    },
    {
      column: "startTime",
      data: startTime,
      isNumeric: false,
    },
    {
      column: "endTime",
      data: endTime,
      isNumeric: false,
    },
    {
      column: "levelValue",
      data: levelValue,
      isNumeric: false,
    },
    {
      column: "terms",
      data: terms,
      isNumeric: false,
    },
    {
      column: "tName",
      data: tName,
      isNumeric: false,
    },
    {
      column: "price",
      data: price,
      isNumeric: true,
    },
    {
      column: "zoomRink",
      data: zoomRink,
      isNumeric: false,
    },
    {
      column: "degree",
      data: degree,
      isNumeric: false,
    },
  ];

  const { result, targetId } = await insertAction("zoomLecture", list);

  if (!result) {
    return res.status(400).send("상품을 생성할 수 없습니다.");
  }
  return res.status(200).json({ result: true });
});

//
//  줌 강의 수정하기
//
router.post("/zoom/lecture/modify", isAdminCheck, async (req, res, next) => {
  const {
    id,
    days,
    startTime,
    endTime,
    levelValue,
    terms,
    tName,
    price,
    zoomRink,
    degree,
  } = req.body;

  const uq = `
    UPDATE  zoomLecture
       SET  id = "${id}",
            days = "${days}",
            startTime = "${startTime}",
            endTime = "${endTime}",
            levelValue = "${levelValue}",
            terms = "${terms}",
            tName = "${tName}",
            price = ${price},
            zoomRink = "${zoomRink}",
            degree = "${degree}"
    WHERE   id = ${id}
  `;

  await actionUpdateQuery(uq);

  return res.status(200).json({ result: true });
});

//
//  줌 강의 인원 추가하기
//
router.post("/zoom/lecture/addPeople", async (req, res, next) => {
  const { ZoomId, UserId } = req.body;

  const sq = `
SELECT	COUNT(*)    AS cnt
FROM	zoomPeople
WHERE	ZoomLectureId =	${ZoomId}
 AND  isCompleted = false
`;

  const list = await noneParameterSelectQuery(sq);

  if (list[0].cnt > 6) {
    return res.status(400).send("해당 강의는 정원이 초과되었습니다.");
  }

  const sq2 = `
  SELECT	COUNT(*)    AS cnt
  FROM	zoomPeople
  WHERE	ZoomLectureId =	${ZoomId}
   AND  isCompleted = false
  AND UserId = ${UserId}
  `;

  const list2 = await noneParameterSelectQuery(sq2);

  if (list2[0].cnt > 0) {
    return res.status(400).send("해당 강의는 이미 수강신청 되어있습니다.");
  }

  const nq = `
  INSERT INTO zoomPeople (createdAt, updatedAt, UserId, ZoomLectureId) VALUES (
    NOW(), NOW(), ${UserId}, ${ZoomId}
  )
  `;

  await models.sequelize.query(nq);

  return res.status(200).json({ result: true });
});

//
//  강의 수강생 정보 보기
//
router.post("/zoom/lecture/detail", isAdminCheck, async (req, res, next) => {
  const { ZoomId } = req.body;

  if (!ZoomId) {
    return res.status(400).send("다시 시도해주세요.");
  }

  const sq = `SELECT	B.userId,
		B.username,
		B.birth,
		B.gender,
		B.mobile,
		B.email,
    A.UserId
  FROM	zoomPeople	A
 INNER
  JOIN	users 		B
    ON	A.UserId = B.id
 WHERE	A.ZoomLectureId = ${ZoomId}`;

  const list = await noneParameterSelectQuery(sq);

  return res.status(200).json(list);
});

//
//  내 수강기록 보기
//
router.post("/zoom/lecture/my", async (req, res, next) => {
  const sq = `
  SELECT	*
  FROM	zoomLecture
 WHERE	id IN (SELECT id FROM zoomPeople WHERE UserId = ${req.user.id})
  `;

  const list = await noneParameterSelectQuery(sq);

  return res.status(200).json(list);
});

//
//  줌 결제내역 가져오기
//
router.post(
  "/zoom/lecture/history/list",
  isAdminCheck,
  async (req, res, next) => {
    const sq = `
  SELECT	A.id,
  A.impUid,
  A.merchantUid,
  A.payment,
  A.payType,
  A.name,
  A.isPay,
  CONCAT(FORMAT(A.payment, 0), "원")	as viewPrice,
  A.createdAt,
  DATE_FORMAT(A.createdAt, "%Y-%m-%d %H:%i:%s")	as viewCreatedAt,
  A.UserId,
  A.ZoomLectureId,
  B.userId,
  B.username,
  B.birth,
  B.gender,
  B.mobile,
  B.address,
  B.detailAddress,
  B.zoneCode,
  C.levelValue,
  C.degree
FROM	zoomBoughtHistory	A
INNER
JOIN	users  				B
  ON	A.UserId = B.id
INNER
JOIN	zoomLecture  				C
  ON	A.ZoomLectureId = C.id
ORDER	BY	A.createdAt DESC
  `;

    const list = await noneParameterSelectQuery(sq);

    return res.status(200).json(list);
  }
);

//
//  줌 결제내역 가져오기
//
router.post(
  "/zoom/lecture/history/detail",
  isLoggedIn,
  async (req, res, next) => {
    const { ZoomBoughtHistoryId } = req.body;

    const sq = `
        SELECT	A.id,
                A.impUid,
                A.merchantUid,
                A.payment,
                A.payType,
                A.name,
                A.isPay,
                CONCAT(FORMAT(A.payment, 0), "원")	as viewPrice,
                A.createdAt,
                DATE_FORMAT(A.createdAt, "%Y-%m-%d")	as viewCreatedAt,
                A.UserId,
                A.ZoomLectureId,
                B.userId,
                B.username,
                B.birth,
                B.tel,
                B.mobile,
                C.levelValue,
                C.degree
          FROM	zoomBoughtHistory	A
         INNER
          JOIN	users  				B
            ON	A.UserId = B.id
         INNER
          JOIN	zoomLecture  				C
            ON	A.ZoomLectureId = C.id
         WHERE  A.id = ${ZoomBoughtHistoryId}
         ORDER	BY	A.createdAt DESC
       
  `;

    const list = await noneParameterSelectQuery(sq);

    return res.status(200).json(list[0]);
  }
);

//
//  줌 결제내역 추가하기
//
router.post("/zoom/lecture/history/add", isLoggedIn, async (req, res, next) => {
  const {
    impUid,
    merchantUid,
    payment,
    UserId,
    ZoomLectureId,
    payType,
    name,
    isPay,
  } = req.body;

  const list = [
    {
      column: "impUid",
      data: impUid,
      isNumeric: false,
    },
    {
      column: "merchantUid",
      data: merchantUid,
      isNumeric: false,
    },
    {
      column: "payment",
      data: payment,
      isNumeric: true,
    },
    {
      column: "payType",
      data: payType,
      isNumeric: false,
    },
    {
      column: "name",
      data: name,
      isNumeric: false,
    },
    {
      column: "isPay",
      data: isPay,
      isNumeric: true,
    },
    {
      column: "UserId",
      data: UserId,
      isNumeric: true,
    },
    {
      column: "ZoomLectureId",
      data: ZoomLectureId,
      isNumeric: true,
    },
  ];

  const { result, targetId } = await insertAction("zoomBoughtHistory", list);

  if (!result) {
    return res.status(400).send("데이터를 생성할 수 없습니다.");
  }
  return res.status(200).json({ result: targetId });
});

//
//  줌 결제내역 삭제하기
//
router.post(
  "/zoom/lecture/history/delete",
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    const dq = `
    DELETE  FROM  zoomBoughtHistory
    WHERE id = ${id}
  `;

    try {
      await models.sequelize.query(dq);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("잠시 후 다시 시도해주세요.");
    }
  }
);

//
//  줌 결제내역 처리여부 변경
//
router.post(
  "/zoom/lecture/history/isPay",
  isAdminCheck,
  async (req, res, next) => {
    const { id, isPay } = req.body;

    const uq = `
    UPDATE  zoomBoughtHistory
       SET  isPay = ${isPay}
    WHERE   id = ${id}
  `;

    try {
      await models.sequelize.query(uq);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("잠시 후 다시 시도해주세요.");
    }
  }
);

//
//  줌 강의 인원 이동하기
//
router.post("/zoom/lecture/move", async (req, res, next) => {
  const { ZoomId, UserId, MoveZoomId } = req.body;

  const sq = `
    SELECT	id
      FROM	zoomPeople
     WHERE	ZoomLectureId =	${ZoomId}
       AND  UserId = ${UserId}
`;

  const list = await noneParameterSelectQuery(sq);

  if (!list[0]) {
    return res.status(400).send("해당 강의에 사용자가 존재하지 않습니다.");
  }

  const uq = `
    UPDATE  zoomPeople
       SET  ZoomLectureId = ${MoveZoomId}
    WHERE   id = ${list[0].id}
  `;

  await actionUpdateQuery(uq);

  return res.status(200).json({ result: true });
});

module.exports = router;
