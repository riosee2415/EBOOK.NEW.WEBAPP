const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");
const {
  noneParameterSelectQuery,
  actionUpdateQuery,
  insertAction,
} = require("../middlewares/structure");

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
                        value
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
             SET  value = ${nextValue}
           WHERE  id = ${id}
      `;

  await actionUpdateQuery(uq);

  return res.status(200).json({ result: true });
});

//
//  줌 강의 가져오기
//
router.post("/zoom/lecture/list", async (req, res, next) => {
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
  DATE_FORMAT(A.createdAt, "%Y-%m-%d")	as viewCreatedAt,
  (
    SELECT	COUNT(*)
      FROM	zoomPeople
     WHERE	ZoomLectureId =	A.id 
       AND  isCompleted = false
  )	AS cnt
FROM	zoomLecture	A
  `;

  const list = await noneParameterSelectQuery(sq);

  return res.status(200).json(list);
});

//
//  줌 강의 추가하기
//
router.post("/zoom/lecture/new", isAdminCheck, async (req, res, next) => {
  const {
    days,
    startTime,
    endTime,
    levelValue,
    terms,
    tName,
    price,
    zoomRink,
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
            zoomRink = "${zoomRink}"
    WHERE   id = ${id}
  `;

  await actionUpdateQuery(uq);

  return res.status(200).json({ result: true });
});

module.exports = router;
