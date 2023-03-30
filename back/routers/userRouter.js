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

router.post("/list", isAdminCheck, async (req, res, next) => {
  const { userId, page, searchData, searchLevel, searchExit } = req.body;

  const _searchData = searchData ? searchData : ``;

  const _searchLevel = parseInt(searchLevel) === 0 ? 0 : parseInt(searchLevel);

  const _searchExit = searchExit ? searchExit : false;

  const LIMIT = 50;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 50;

  const lengthQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY createdAt)		AS num,
          id,
          userId,
          email,
          username,
          mobile,
          level,
          isExit,
          birth,
          gender,
          keyword,
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
          createdAt,
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
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
		      DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
		      DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")		  AS viewExitedAt
    FROM	users   A
   WHERE	CONCAT(username, email) LIKE '%${_searchData}%'
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
   ORDER	BY num DESC
  `;

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY createdAt)		AS num,
          id,
          userId,
          email,
          username,
          mobile,
          level,
          isExit,
          birth,
          gender,
          keyword,
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
          createdAt,
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
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
		      DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
		      DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")		  AS viewExitedAt
    FROM	users         A
   WHERE	CONCAT(username, email) LIKE '%${_searchData}%'
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
   ORDER	BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const list = await models.sequelize.query(selectQuery);

    const listLen = lengths[0].length;

    const lastPage =
      listLen % LIMIT > 0 ? listLen / LIMIT + 1 : listLen / LIMIT;

    return res
      .status(200)
      .json({ list: list[0], lastPage: parseInt(lastPage) });
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

    console.log(result[0]);

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
              A.menuRight1,
              A.menuRight2,
              A.menuRight3,
              A.menuRight4,
              A.menuRight5,
              A.menuRight6,
              A.menuRight7,
              A.menuRight8
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
              A.menuRight1,
              A.menuRight2,
              A.menuRight3,
              A.menuRight4,
              A.menuRight5,
              A.menuRight6,
              A.menuRight7,
              A.menuRight8
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

  try {
    const exUser = await User.findOne({
      where: { userId: userId },
    });

    if (exUser) {
      return res.status(401).send("이미 가입된 회원 입니다.");
    }

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
      "${email}",
      "${mobile}",
      ${terms},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(insertQ);

    return res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
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

    const selectQ = `
    SELECT  id,
            password
      FROM  users
     WHERE  id = ${req.user.id}
    `;
    const find = await models.sequelize.query(selectQ);

    let cipher = crypto.createHash("sha512");

    cipher.update(password);
    const hashedPassword = cipher.digest("hex");

    // const result = await bcrypt.compare(password, exUser.password);

    if (find[0][0]) {
      if (find[0][0].password !== hashedPassword) {
        return res.status(401).send("비밀번호가 일치하지 않습니다.");
      }
    }

    const updateQ = `
    UPDATE  users
       SET  mobile = "${mobile}",
            username = "${username}",
            address = "${address}",
            zoneCode = "${zoneCode}",
            detailAddress = "${detailAddress}",
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
  const { id, type, userId, username, password, mobile, keyword, consulting } =
    req.body;
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
    } else if (parseInt(type) == 5) {
      const updateQ = `
        UPDATE  users
           SET  keyword = "${keyword}",
                consulting = "${consulting}",
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
  const test = [
    {
      _id: "61abb882afe11f0acfeefd9e",
      title: "[읽기/발음] 알파벳 대표 발음 - A 읽기",
      sort: 1,
    },
    {
      _id: "61abb998afe11f0acfeefda1",
      title: "[읽기/발음] 알파벳 대표 발음 - B 읽기",
      sort: 2,
    },
    {
      _id: "61abba7aafe11f0acfeefda8",
      title: "[읽기/발음] 알파벳 대표 발음 - C 읽기",
      sort: 3,
    },
    {
      _id: "61abbabdafe11f0acfeefda9",
      title: "[읽기/발음] 알파벳 대표 발음 - D 읽기",
      sort: 4,
    },
    {
      _id: "61abbb58afe11f0acfeefdab",
      title: "[읽기/발음] 알파벳 대표 발음 - E 읽기",
      sort: 5,
    },
    {
      _id: "61abbb9aafe11f0acfeefdae",
      title: "[읽기/발음] 알파벳 대표 발음 - F 읽기",
      sort: 6,
    },
    {
      _id: "61abbbe0afe11f0acfeefdaf",
      title: "[읽기/발음] 알파벳 대표 발음 - G 읽기",
      sort: 7,
    },
    {
      _id: "61abbc1aafe11f0acfeefdb0",
      title: "[읽기/발음] 알파벳 대표 발음 - H 읽기",
      sort: 8,
    },
    {
      _id: "61abbc57afe11f0acfeefdb1",
      title: "[읽기/발음] 알파벳 대표 발음 - I 읽기",
      sort: 9,
    },
    {
      _id: "61abbc93afe11f0acfeefdb2",
      title: "[읽기/발음] 알파벳 대표 발음 - J 읽기",
      sort: 10,
    },
    {
      _id: "61abbcceafe11f0acfeefdb3",
      title: "[읽기/발음] 알파벳 대표 발음 - K 읽기",
      sort: 11,
    },
    {
      _id: "61abbd07afe11f0acfeefdb4",
      title: "[읽기/발음] 알파벳 대표 발음 - L 읽기",
      sort: 12,
    },
    {
      _id: "61abbd45afe11f0acfeefdb6",
      title: "[읽기/발음] 알파벳 대표 발음 - M 읽기",
      sort: 13,
    },
    {
      _id: "61abbd7eafe11f0acfeefdb7",
      title: "[읽기/발음] 알파벳 대표 발음 - N 읽기",
      sort: 14,
    },
    {
      _id: "61abbdb6afe11f0acfeefdb8",
      title: "[읽기/발음] 알파벳 대표 발음 - O 읽기",
      sort: 15,
    },
    {
      _id: "61abbde9afe11f0acfeefdb9",
      title: "[읽기/발음] 알파벳 대표 발음 - P 읽기",
      sort: 16,
    },
    {
      _id: "61abbe39afe11f0acfeefdbd",
      title: "[읽기/발음] 알파벳 대표 발음 - R 읽기",
      sort: 17,
    },
    {
      _id: "61abbea4afe11f0acfeefdbf",
      title: "[읽기/발음] 알파벳 대표 발음 - S 읽기",
      sort: 18,
    },
    {
      _id: "61abbee3afe11f0acfeefdc0",
      title: "[읽기/발음] 알파벳 대표 발음 - T 읽기",
      sort: 19,
    },
    {
      _id: "61abbf14afe11f0acfeefdc2",
      title: "[읽기/발음] 알파벳 대표 발음 - U 읽기",
      sort: 20,
    },
    {
      _id: "61abbf82afe11f0acfeefdc8",
      title: "[읽기/발음] 알파벳 대표 발음 - W 읽기",
      sort: 22,
    },
    {
      _id: "61abbfb2afe11f0acfeefdca",
      title: "[읽기/발음] 알파벳 대표 발음 - X, Z 읽기",
      sort: 23,
    },
    {
      _id: "61abc003afe11f0acfeefdcc",
      title: "[읽기/발음] 알파벳 대표 발음 - Y 읽기",
      sort: 24,
    },
    {
      _id: "61abc03cafe11f0acfeefdce",
      title: "[읽기/발음] 단모음과 장모음 ",
      sort: 25,
    },
    {
      _id: "61abc096afe11f0acfeefdd0",
      title: "[읽기/발음] a 장모음 읽기 ",
      sort: 26,
    },
    {
      _id: "61abc0e1afe11f0acfeefdd1",
      title: "[읽기/발음] e 장모음 읽기",
      sort: 27,
    },
    {
      _id: "61abc125afe11f0acfeefdd2",
      title: "[읽기/발음] i 장모음 읽기 ",
      sort: 28,
    },
    {
      _id: "61abc163afe11f0acfeefdd5",
      title: "[읽기/발음] o 장모음 읽기 ",
      sort: 29,
    },
    {
      _id: "61abc19aafe11f0acfeefdd7",
      title: "[읽기/발음] u 장모음 읽기 ",
      sort: 30,
    },
    {
      _id: "61abc1e4afe11f0acfeefdd9",
      title: "[읽기/발음] 알파벳의 다양한 발음 - c",
      sort: 31,
    },
    {
      _id: "61abc21fafe11f0acfeefddc",
      title: "[읽기/발음] 알파벳의 다양한 발음 - d, f",
      sort: 32,
    },
    {
      _id: "61abc258afe11f0acfeefddd",
      title: "[읽기/발음] 알파벳의 다양한 발음 - g",
      sort: 33,
    },
    {
      _id: "61abc2a4afe11f0acfeefddf",
      title: "[읽기/발음] 알파벳의 다양한 발음 - s",
      sort: 34,
    },
    {
      _id: "61abc2d8afe11f0acfeefde1",
      title: "[읽기/발음] 알파벳의 다양한 발음 - t",
      sort: 35,
    },
    {
      _id: "61abc330afe11f0acfeefde5",
      title: "[읽기/발음] 알파벳의 다양한 발음 - a ",
      sort: 36,
    },
    {
      _id: "61abc36fafe11f0acfeefde7",
      title: "[읽기/발음] 알파벳의 다양한 발음 - e",
      sort: 37,
    },
    {
      _id: "61abc3b1afe11f0acfeefde8",
      title: "[읽기/발음] 알파벳의 다양한 발음 - i",
      sort: 38,
    },
    {
      _id: "61abc3f5afe11f0acfeefde9",
      title: "[읽기/발음] 알파벳의 다양한 발음 - o",
      sort: 39,
    },
    {
      _id: "61abc42eafe11f0acfeefdeb",
      title: "[읽기/발음] 알파벳의 다양한 발음 - u",
      sort: 40,
    },
    {
      _id: "61abc47dafe11f0acfeefded",
      title: "[읽기/발음] th 발음하기",
      sort: 41,
    },
    {
      _id: "61abc4bdafe11f0acfeefdee",
      title: "[읽기/발음] ch 발음하기",
      sort: 42,
    },
    {
      _id: "61abc4f4afe11f0acfeefdef",
      title: "[읽기/발음] sh 발음하기",
      sort: 43,
    },
    {
      _id: "61abc541afe11f0acfeefdf3",
      title: "[읽기/발음] 주의할 알파벳 기초 발음 ",
      sort: 44,
    },
    {
      _id: "61abc588afe11f0acfeefdf5",
      title: "[읽기/발음] 이중 모음 1강 - ai, ay, au, aw",
      sort: 45,
    },
    {
      _id: "61abc5c8afe11f0acfeefdf7",
      title: "[읽기/발음] 이중 모음 2강 - ee, ea, ey, ew",
      sort: 46,
    },
    {
      _id: "61abc656afe11f0acfeefdf8",
      title: "[읽기/발음] 이중 모음 3강 - ie, io",
      sort: 47,
    },
    {
      _id: "61abc862afe11f0acfeefe06",
      title: "[읽기/발음] 이중 모음 5강 - ou, ow",
      sort: 49,
    },
    {
      _id: "61abc8abafe11f0acfeefe07",
      title: "[읽기/발음] 이중 모음 6강 - ar, er, ir, or, ur",
      sort: 50,
    },
    {
      _id: "61abc8f8afe11f0acfeefe08",
      title: "[읽기/발음] ph, gh 발음하기",
      sort: 51,
    },
    {
      _id: "61abc931afe11f0acfeefe0a",
      title: "[읽기/발음] wh 발음하기",
      sort: 52,
    },
    {
      _id: "61abc987afe11f0acfeefe0b",
      title: "[읽기/발음] 이중 자음 1강 - bl, cl, fl",
      sort: 53,
    },
    {
      _id: "61abc9cfafe11f0acfeefe0e",
      title: "[읽기/발음] 이중 자음 2강 - gl, pl, sl",
      sort: 54,
    },
    {
      _id: "61abca10afe11f0acfeefe10",
      title: "[읽기/발음] 이중 자음 3강 - br, cr, dr",
      sort: 55,
    },
    {
      _id: "61abca53afe11f0acfeefe12",
      title: "[읽기/발음] 이중 자음 4강 - fr, gr, pr, tr",
      sort: 56,
    },
    {
      _id: "61abca99afe11f0acfeefe13",
      title: "[읽기/발음] 이중 자음 5강 - sc, sk, st, squ, sm, sn, sw",
      sort: 57,
    },
    {
      _id: "61abcad2afe11f0acfeefe15",
      title: "[읽기/발음] 이중 자음 6강 - _ck, _ng, _nk, _nd, _nt",
      sort: 58,
    },
    {
      _id: "61abcb0cafe11f0acfeefe16",
      title: "[읽기/발음] 묵음 1강 - b, d, g, h",
      sort: 59,
    },
    {
      _id: "61abcb55afe11f0acfeefe17",
      title: "[읽기/발음] 묵음 2강 - k, l, n, p",
      sort: 60,
    },
    {
      _id: "61abcb89afe11f0acfeefe1a",
      title: "[읽기/발음] 묵음 3강 - s, t, w, gh",
      sort: 61,
    },
    {
      _id: "61abcbcfafe11f0acfeefe1b",
      title: "[단어/명사] 기초 영단어 - 사람, 가족",
      sort: 62,
    },
    {
      _id: "61abcc0eafe11f0acfeefe1c",
      title: "[단어/명사] 기초 영단어 - 직업 I",
      sort: 63,
    },
    {
      _id: "61abcc55afe11f0acfeefe1e",
      title: "[단어/명사] 기초 영단어 - 직업 II",
      sort: 64,
    },
    {
      _id: "61abcc87afe11f0acfeefe20",
      title: "[단어/형용사] 기초 영단어 - 기분",
      sort: 65,
    },
    {
      _id: "61abccd3afe11f0acfeefe21",
      title: "[단어/형용사] 기초 영단어 - 성격, 특징 ",
      sort: 66,
    },
    {
      _id: "61abcd07afe11f0acfeefe22",
      title: "[단어/형용사] 기초 영단어 - 상태 I",
      sort: 67,
    },
    {
      _id: "61abcd64afe11f0acfeefe23",
      title: "[단어/형용사] 기초 영단어 - 상태 II",
      sort: 68,
    },
    {
      _id: "61abcd9eafe11f0acfeefe24",
      title: "[단어/명사] 기초 영단어 - 나라, 국적",
      sort: 69,
    },
    {
      _id: "61abcdd2afe11f0acfeefe26",
      title: "[단어/동사] 기초 영단어 - 동작 I",
      sort: 70,
    },
    {
      _id: "61abce39afe11f0acfeefe2a",
      title: "[단어/동사] 기초 영단어 - 동작 II",
      sort: 71,
    },
    {
      _id: "61abceb6afe11f0acfeefe2b",
      title: "[단어/동사] 기초 영단어 - 동작 III",
      sort: 72,
    },
    {
      _id: "61abcefdafe11f0acfeefe2c",
      title: "[단어/명사] 기초 영단어 - 일상 I",
      sort: 73,
    },
    {
      _id: "61abcf40afe11f0acfeefe2d",
      title: "[단어/명사] 기초 영단어 - 일상 II",
      sort: 74,
    },
    {
      _id: "61abcf89afe11f0acfeefe2f",
      title: "[회화] 기초 회화 인사 1강 ",
      sort: 75,
    },
    {
      _id: "61abd021afe11f0acfeefe33",
      title: "[문법] 품사와 문장 성분",
      sort: 76,
    },
    {
      _id: "61abd05eafe11f0acfeefe37",
      title:
        '[문법/회화] be동사 "나는 OOO입니다." - 이름, 국적, 직업 소개하기 ',
      sort: 77,
    },
    {
      _id: "61abd092afe11f0acfeefe39",
      title: '[문법/회화] be동사 "나는 OOO입니다." - 기분, 성격, 외모 말하기 ',
      sort: 78,
    },
    {
      _id: "61abd0c4afe11f0acfeefe3d",
      title: '[문법/회화] be동사 "당신은 OOO입니다." ',
      sort: 79,
    },
    {
      _id: "61abd0feafe11f0acfeefe3f",
      title: '[문법/회화] be동사 "그, 그녀는 OOO입니다." ',
      sort: 80,
    },
    {
      _id: "61abd140afe11f0acfeefe40",
      title: "[단어/형용사] 기초 영단어 - 날씨",
      sort: 81,
    },
    {
      _id: "61abd1b6afe11f0acfeefe41",
      title: "[단어/수사] 기초 영단어 - 숫자 (1~100)",
      sort: 82,
    },
    {
      _id: "61abd1edafe11f0acfeefe42",
      title: "[문법/회화] 날씨 표현하기 ",
      sort: 83,
    },
    {
      _id: "61abd23dafe11f0acfeefe43",
      title: "[문법/회화] 시간 표현하기 ",
      sort: 84,
    },
    {
      _id: "61abd273afe11f0acfeefe44",
      title: "[문법/회화] 나이 표현하기 ",
      sort: 85,
    },
    {
      _id: "61abd2a7afe11f0acfeefe45",
      title: "[단어/형용사] 기초 영단어 - 상태 III",
      sort: 86,
    },
    {
      _id: "61abd2e4afe11f0acfeefe48",
      title: "[단어/명사] 기초 영단어 - 색상",
      sort: 87,
    },
    {
      _id: "61abd366afe11f0acfeefe4c",
      title: '[문법/회화] be동사 "우리 / 그들은 OOO입니다."',
      sort: 89,
    },
    {
      _id: "61abd3aeafe11f0acfeefe4f",
      title: "[문법/회화] be동사 줄여쓰기",
      sort: 90,
    },
    {
      _id: "61abd4a5afe11f0acfeefe53",
      title: "[문법] 명사의 단수와 복수 2강 ",
      sort: 91,
    },
    {
      _id: "61abd500afe11f0acfeefe55",
      title: "[단어/명사] 기초 영단어 - 요일, 때",
      sort: 92,
    },
    {
      _id: "61abd557afe11f0acfeefe56",
      title: "[문법/회화] be동사 - 단수 주어, 복수 주어 ",
      sort: 93,
    },
    {
      _id: "61abd58cafe11f0acfeefe57",
      title: '[문법/회화] "이것은 / 저것은 OOO입니다."',
      sort: 94,
    },
    {
      _id: "61abd5d5afe11f0acfeefe59",
      title: "[단어/명사] 기초 영단어 - 계절, 달",
      sort: 95,
    },
    {
      _id: "61abd62cafe11f0acfeefe5a",
      title: "[문법] 대문자는 언제 쓰나요?",
      sort: 96,
    },
    {
      _id: "61abd66eafe11f0acfeefe5c",
      title: '[문법/회화] "이것들은 / 저것들은 OOO입니다." ',
      sort: 97,
    },
    {
      _id: "61abd6b3afe11f0acfeefe5f",
      title: "[단어/수사] 서수 읽기 (1번째 ~ 10번째)",
      sort: 98,
    },
    {
      _id: "61abd6f9afe11f0acfeefe61",
      title: "[문법] a와 the의 차이",
      sort: 99,
    },
    {
      _id: "61abd73cafe11f0acfeefe62",
      title: "[회화] 기초 회화 인사 2강 ",
      sort: 100,
    },
    {
      _id: "61ac8c3fafe11f0acfef082b",
      title: "[문법/회화] be동사의 의문문",
      sort: 101,
    },
    {
      _id: "61ac8c93afe11f0acfef0833",
      title: "[단어/명사] 자주 쓰는 명사 10개",
      sort: 102,
    },
    {
      _id: "61ac8cdaafe11f0acfef0838",
      title: '[문법/회화] "이것 / 저것(들)은 OOO입니까?" ',
      sort: 103,
    },
    {
      _id: "61ac8d38afe11f0acfef0843",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 104,
    },
    {
      _id: "61ac8d72afe11f0acfef084b",
      title: "[문법/회화] be동사의 부정문 (1, 2인칭)",
      sort: 105,
    },
    {
      _id: "61ac8dafafe11f0acfef084d",
      title: "[회화/Dialogue] be동사 대화문 Part 1",
      sort: 106,
    },
    {
      _id: "61ac8e09afe11f0acfef0856",
      title: "[문법/회화] be동사의 부정문 (3인칭)",
      sort: 107,
    },
    {
      _id: "61ac8e4aafe11f0acfef085b",
      title: "[단어/명사] 기초 영단어 - 과일 ",
      sort: 108,
    },
    {
      _id: "61ac8e8cafe11f0acfef085e",
      title: "[문법/회화] be동사 부정문 줄여 쓰기 / be동사 묻고 답하기 ",
      sort: 109,
    },
    {
      _id: "61ac8ecfafe11f0acfef0866",
      title: "[단어/명사] 기초 영단어 - 신체 I",
      sort: 110,
    },
    {
      _id: "61ac9007afe11f0acfef0880",
      title: "[단어/명사] 기초 영단어 - 신체 II",
      sort: 111,
    },
    {
      _id: "61ac9051afe11f0acfef0886",
      title: "[회화/Dialogue] be 동사 대화문 Part 2",
      sort: 112,
    },
    {
      _id: "61ac9122afe11f0acfef0891",
      title: "[단어/명사] 기초 영단어 - 자연 ",
      sort: 113,
    },
    {
      _id: "61ac9180afe11f0acfef0896",
      title: "[문법/회화] 소유격 - 나의/너의/그것의…",
      sort: 114,
    },
    {
      _id: "61ac91c6afe11f0acfef089b",
      title: "[단어/명사] 기초 영단어 - 장소 ",
      sort: 115,
    },
    {
      _id: "61ac91fdafe11f0acfef089e",
      title: "[문법/회화] 소유격 복습하기 ",
      sort: 116,
    },
    {
      _id: "61ac9245afe11f0acfef08a5",
      title: "[단어/형용사] 자주 쓰는 형용사10개",
      sort: 117,
    },
    {
      _id: "61ac927eafe11f0acfef08ab",
      title: "[회화/Dialogue] 소유격 대화문 ",
      sort: 118,
    },
    {
      _id: "61ac92b7afe11f0acfef08b0",
      title: "[문법] 어순",
      sort: 119,
    },
    {
      _id: "61ac9301afe11f0acfef08b4",
      title: "[문법/회화] 일반동사의 긍정문 1강 ",
      sort: 120,
    },
    {
      _id: "61ac93faafe11f0acfef08c1",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 121,
    },
    {
      _id: "61ac943cafe11f0acfef08c4",
      title: "[단어/명사] 기초 영단어 - 스포츠 ",
      sort: 122,
    },
    {
      _id: "61ac9488afe11f0acfef08cd",
      title: "[문법/회화] 일반동사의 긍정문 2강 ",
      sort: 123,
    },
    {
      _id: "61ac94ccafe11f0acfef08cf",
      title: "[회화/패턴] 유용한 회화 패턴 - I like~, I play~, I want~",
      sort: 124,
    },
    {
      _id: "61ac951fafe11f0acfef08d3",
      title: "[단어/명사] 기초 영단어 - 음식",
      sort: 125,
    },
    {
      _id: "61ac9560afe11f0acfef08d4",
      title: "[문법/회화] 일반동사의 긍정문 복습 ",
      sort: 126,
    },
    {
      _id: "61ac95c2afe11f0acfef08d7",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 127,
    },
    {
      _id: "61ac9608afe11f0acfef08df",
      title: "[단어/수사] 서수 읽기 (날짜 읽기)",
      sort: 128,
    },
    {
      _id: "61ac9649afe11f0acfef08e2",
      title: "[문법/회화] 일반동사의 의문문 ",
      sort: 129,
    },
    {
      _id: "61ac968aafe11f0acfef08e8",
      title: "[문법/회화] 일반동사의 부정문 ",
      sort: 130,
    },
    {
      _id: "61ac97b4afe11f0acfef08fa",
      title: "[단어/명사] 기초 영단어 - 패션",
      sort: 131,
    },
    {
      _id: "61ac97f3afe11f0acfef0900",
      title: "[회화/패턴] 유용한 회화 패턴 - I need~, You look~, It looks~",
      sort: 132,
    },
    {
      _id: "61ac983aafe11f0acfef0905",
      title: "[문법/회화] 일반동사 - 묻고 답하기",
      sort: 133,
    },
    {
      _id: "61ac9874afe11f0acfef0908",
      title: "[회화/Dialogue] 일반동사 대화문",
      sort: 134,
    },
    {
      _id: "61ac98b9afe11f0acfef090f",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 135,
    },
    {
      _id: "61ac990aafe11f0acfef0913",
      title: "[회화/패턴] 유용한 회화 패턴 - I have~, It sounds~, Don't~",
      sort: 136,
    },
    {
      _id: "61ac9948afe11f0acfef0917",
      title: "[문법/회화] 조동사 can 1강 ",
      sort: 137,
    },
    {
      _id: "61ac998aafe11f0acfef0919",
      title: "[문법/회화] 조동사 can 2강",
      sort: 138,
    },
    {
      _id: "61ac99dbafe11f0acfef091b",
      title: "[단어/명사] 기초 영단어 - 휴가",
      sort: 139,
    },
    {
      _id: "61ac9a1bafe11f0acfef091f",
      title: "[문법/회화] 조동사 can으로 묻고 답하기",
      sort: 140,
    },
    {
      _id: "61ac9a72afe11f0acfef0928",
      title: "[회화/Dialogue] can을 활용한 대화문 ",
      sort: 141,
    },
    {
      _id: "61ac9abaafe11f0acfef0930",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 142,
    },
    {
      _id: "61ac9b04afe11f0acfef0936",
      title: "[문법/회화] 목적격 - 나를, 너를, 그것을…",
      sort: 143,
    },
    {
      _id: "61ac9b3eafe11f0acfef093a",
      title: "[회화/Dialogue] 목적격을 활용한 대화문",
      sort: 144,
    },
    {
      _id: "61ac9b89afe11f0acfef0944",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 145,
    },
    {
      _id: "61ac9bd1afe11f0acfef0948",
      title: "[문법/회화] 전치사 1강 (in, on, at - Part 1)",
      sort: 146,
    },
    {
      _id: "61ac9c11afe11f0acfef094c",
      title: "[문법/회화] 전치사 1강 (in, on, at - Part 2)",
      sort: 147,
    },
    {
      _id: "61ac9c52afe11f0acfef0950",
      title: "[단어/동사] 같은 듯 다른 단어 - see, look, watch",
      sort: 148,
    },
    {
      _id: "61ac9caeafe11f0acfef095b",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 149,
    },
    {
      _id: "61ac9d0eafe11f0acfef0960",
      title: "[문법/회화] 전치사 2강 (to, from, up, down)",
      sort: 150,
    },
    {
      _id: "61ac9e1bafe11f0acfef097a",
      title: "[문법/회화] 전치사 3강 (for, of, by, with)",
      sort: 151,
    },
    {
      _id: "61ac9e61afe11f0acfef0982",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 152,
    },
    {
      _id: "61ac9eb2afe11f0acfef098f",
      title: "[문법/회화] 의문사 what",
      sort: 153,
    },
    {
      _id: "61ac9ef2afe11f0acfef0992",
      title: "[회화/Dialogue] what을 활용한 대화문",
      sort: 154,
    },
    {
      _id: "61ac9f35afe11f0acfef0997",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 155,
    },
    {
      _id: "61ac9f80afe11f0acfef09a2",
      title: "[문법/회화] 의문사 when, where",
      sort: 156,
    },
    {
      _id: "61ac9fcbafe11f0acfef09aa",
      title: "[회화/Dialogue] when, where를 활용한 대화문",
      sort: 157,
    },
    {
      _id: "61aca078afe11f0acfef09b5",
      title: "[단어/명사] 주제 관련 명사 10개",
      sort: 158,
    },
    {
      _id: "61aca137afe11f0acfef09bf",
      title: "[문법/회화] 의문사 who, why",
      sort: 159,
    },
    {
      _id: "61aca1cdafe11f0acfef09cb",
      title: "[회화/Dialogue] who, why를 활용한 대화문",
      sort: 160,
    },
    {
      _id: "61aca240afe11f0acfef09dc",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 161,
    },
    {
      _id: "61aca2ddafe11f0acfef09f2",
      title: "[문법/회화] 의문사 how",
      sort: 162,
    },
    {
      _id: "61aca327afe11f0acfef09f7",
      title: "[회화/Dialogue] how를 활용한 대화문",
      sort: 163,
    },
    {
      _id: "61aca372afe11f0acfef09fe",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 164,
    },
    {
      _id: "61aca3c9afe11f0acfef0a06",
      title: "[문법/회화] wh-의문사 종합 정리",
      sort: 165,
    },
    {
      _id: "61aca406afe11f0acfef0a0b",
      title: "[문법/회화] 소유 대명사 - 나의 것, 너의 것…",
      sort: 166,
    },
    {
      _id: "61aca44bafe11f0acfef0a12",
      title:
        "[회화/패턴] 유용한 회화 패턴 - Thank you for~, It's time for~, Let's go for~",
      sort: 167,
    },
    {
      _id: "61aca4b1afe11f0acfef0a1a",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 168,
    },
    {
      _id: "61aca4f8afe11f0acfef0a20",
      title: '[문법/회화] There is / are "~가 있습니다." ',
      sort: 169,
    },
    {
      _id: "61aca535afe11f0acfef0a23",
      title: "[회화/Dialogue] there를 활용한 대화문",
      sort: 170,
    },
    {
      _id: "61aca571afe11f0acfef0a26",
      title: "[회화] 기초 회화 인사 3강",
      sort: 171,
    },
    {
      _id: "61aca5c1afe11f0acfef0a2b",
      title: "[문법/회화] be동사 과거형 긍정문",
      sort: 172,
    },
    {
      _id: "61aca60dafe11f0acfef0a2e",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 173,
    },
    {
      _id: "61aca666afe11f0acfef0a39",
      title: "[문법/회화] be동사 과거형 의문문과 부정문",
      sort: 174,
    },
    {
      _id: "61aca6c2afe11f0acfef0a3c",
      title: "[단어/형용사] 반대의 뜻을 가진 형용사 ",
      sort: 175,
    },
    {
      _id: "61aca71dafe11f0acfef0a43",
      title: "[문법/회화] 일반동사의 과거형",
      sort: 176,
    },
    {
      _id: "61aca764afe11f0acfef0a46",
      title: "[단어/명사] 쇼핑 관련 명사 10개",
      sort: 177,
    },
    {
      _id: "61aca7b9afe11f0acfef0a4f",
      title: "[문법/회화] 일반동사의 과거형 복습",
      sort: 178,
    },
    {
      _id: "61aca858afe11f0acfef0a58",
      title: "[문법/회화] 일반동사 과거형 의문문과 부정문",
      sort: 179,
    },
    {
      _id: "61aca8aaafe11f0acfef0a60",
      title: "[문법/회화] wh 의문사의 과거형",
      sort: 180,
    },
    {
      _id: "61aca902afe11f0acfef0a65",
      title: "[회화/Dialogue] 과거형을 활용한 대화문",
      sort: 181,
    },
    {
      _id: "61aca9a7afe11f0acfef0a7c",
      title: "[단어/동사] 자주 쓰는 동사 10개 ",
      sort: 182,
    },
    {
      _id: "61aca9fcafe11f0acfef0a84",
      title: "[문법/회화] 전치사 4강 (about, before, after)",
      sort: 183,
    },
    {
      _id: "61acaa3eafe11f0acfef0a90",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm excited about~, I'm crazy about~, I'm nervous about~",
      sort: 184,
    },
    {
      _id: "61acaa8cafe11f0acfef0a96",
      title: "[문법/회화] 미래형 1강 (일반동사)",
      sort: 185,
    },
    {
      _id: "61acaadeafe11f0acfef0aa1",
      title: "[문법/회화] 미래형 2강 (be동사)",
      sort: 186,
    },
    {
      _id: "61acab21afe11f0acfef0aa6",
      title: "[단어/동사] 반대의 뜻을 가진 동사 ",
      sort: 187,
    },
    {
      _id: "61acab90afe11f0acfef0aae",
      title: "[문법/회화] 현재, 과거, 미래 시제 복습",
      sort: 188,
    },
    {
      _id: "61acabd7afe11f0acfef0aaf",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 189,
    },
    {
      _id: "61acac25afe11f0acfef0ab4",
      title: "[문법/회화] 미래를 나타내는 표현 be going to",
      sort: 190,
    },
    {
      _id: "61acac61afe11f0acfef0ab5",
      title: "[문법/회화] wh 의문사 미래형",
      sort: 191,
    },
    {
      _id: "61acacccafe11f0acfef0ac0",
      title: "[회화/Dialogue] 미래형을 활용한 대화문 ",
      sort: 192,
    },
    {
      _id: "61acad2aafe11f0acfef0aca",
      title:
        "[회화/패턴] 유용한 회화 패턴 - Are you going to (goona)~, I'm going to (gonna)~, I'm kind of (kinda)~",
      sort: 193,
    },
    {
      _id: "61acad74afe11f0acfef0ad3",
      title: "[단어/동사] 동사 get의 다양한 활용",
      sort: 194,
    },
    {
      _id: "61acadb7afe11f0acfef0adc",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 195,
    },
    {
      _id: "61acae16afe11f0acfef0ae5",
      title: "[문법/회화] 현재 진행형",
      sort: 196,
    },
    {
      _id: "61acae66afe11f0acfef0af2",
      title: "[단어/동사] 같은 듯 다른 단어 (say, tell, talk, speak)",
      sort: 197,
    },
    {
      _id: "61acaebdafe11f0acfef0af5",
      title: "[문법/회화] 현재 진행형 복습 ",
      sort: 198,
    },
    {
      _id: "61acaf02afe11f0acfef0af9",
      title: "[문법/회화] 현재 진행형의 의문문과 부정문 ",
      sort: 199,
    },
    {
      _id: "61acaf3cafe11f0acfef0afb",
      title: "[회화/Dialogue] 현재 진행형을 활용한 대화문",
      sort: 200,
    },
    {
      _id: "61b1fc58c4540373970c3988",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm on~, I'm afraid of~, I'm upset about~",
      sort: 201,
    },
    {
      _id: "61b1fccec4540373970c398e",
      title: "[단어/동사] 동사 take의 다양한 활용",
      sort: 202,
    },
    {
      _id: "61b1fd4fc4540373970c3990",
      title: "[문법/회화] 과거 진행형",
      sort: 203,
    },
    {
      _id: "61b1fd83c4540373970c3994",
      title: "[회화/Dialogue] 과거 진행형을 활용한 대화문",
      sort: 204,
    },
    {
      _id: "61b1fe02c4540373970c399a",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 205,
    },
    {
      _id: "61b1fe4ac4540373970c399e",
      title: "[문법/회화] 미래 진행형",
      sort: 206,
    },
    {
      _id: "61b1fe86c4540373970c39a1",
      title: "[회화/Dialogue] 미래 진행형을 활용한 대화문",
      sort: 207,
    },
    {
      _id: "61b1fed9c4540373970c39a7",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 208,
    },
    {
      _id: "61b1ffbac4540373970c39ae",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm getting~, I'm talking about~, I'm looking for~",
      sort: 209,
    },
    {
      _id: "61b20008c4540373970c39b5",
      title: "[문법/회화] 부사 1강 ",
      sort: 210,
    },
    {
      _id: "61b200f3c4540373970c39c8",
      title: "[문법/회화] 부사 2강 ",
      sort: 211,
    },
    {
      _id: "61b204eac4540373970c39ee",
      title: "[문법/회화] 부사 3강 ",
      sort: 212,
    },
    {
      _id: "61b2053dc4540373970c39f0",
      title: "[문법/회화] 부사 4강",
      sort: 213,
    },
    {
      _id: "61b2059bc4540373970c39f3",
      title: "[회화/Dialogue] 부사를 활용한 대화문",
      sort: 214,
    },
    {
      _id: "61b2061dc4540373970c39f7",
      title: "[문법/회화] 빈도를 나타내는 표현 ",
      sort: 216,
    },
    {
      _id: "61b2066dc4540373970c39fc",
      title: "[단어/명사] 위치와 방향을 나타내는 명사 10개",
      sort: 217,
    },
    {
      _id: "61b206afc4540373970c3a01",
      title: "[문법/회화] 조동사 could ",
      sort: 218,
    },
    {
      _id: "61b206e1c4540373970c3a03",
      title: "[회화/Dialogue] could를 활용한 대화문",
      sort: 219,
    },
    {
      _id: "61b20734c4540373970c3a05",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 220,
    },
    {
      _id: "61b2078bc4540373970c3a08",
      title: "[문법/회화] 조동사 must의 활용",
      sort: 221,
    },
    {
      _id: "61b207bfc4540373970c3a0b",
      title: "[회화/Dialogue] must를 활용한 대화문",
      sort: 222,
    },
    {
      _id: "61b2088bc4540373970c3a14",
      title: "[단어/형용사/부사] 자주 쓰는 부사 (형용사 + ly)",
      sort: 223,
    },
    {
      _id: "61b20961c4540373970c3a19",
      title: "[문법/회화] 해야하는 일 말하기 ",
      sort: 224,
    },
    {
      _id: "61b20994c4540373970c3a1a",
      title: "[회화/Dialogue] have to를 활용한 대화문",
      sort: 225,
    },
    {
      _id: "61b20a4fc4540373970c3a22",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I have to~, You have to~, You don't have to~, Do I have to~?",
      sort: 226,
    },
    {
      _id: "61b20a9ac4540373970c3a23",
      title: "[문법/회화] 조동사 should",
      sort: 227,
    },
    {
      _id: "61b20ac8c4540373970c3a24",
      title: "[회화/Dialogue] should를 활용한 대화문 ",
      sort: 228,
    },
    {
      _id: "61b20b26c4540373970c3a27",
      title:
        "[회화/패턴] 유용한 회화 패턴- Could you please~?, You must not~, What should I~?",
      sort: 229,
    },
    {
      _id: "61b20b7bc4540373970c3a28",
      title: "[문법/회화] 조동사 may ",
      sort: 230,
    },
    {
      _id: "61b20bb3c4540373970c3a2b",
      title: "[회화/Dialogue] may를 활용한 대화문",
      sort: 231,
    },
    {
      _id: "61b20c00c4540373970c3a2c",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 232,
    },
    {
      _id: "61b20c66c4540373970c3a2e",
      title: "[문법/회화] 원하는 일 말하기 ",
      sort: 233,
    },
    {
      _id: "61b20c8dc4540373970c3a30",
      title: "[회화/Dialogue] want to를 활용한 대화문 ",
      sort: 234,
    },
    {
      _id: "61b20cd3c4540373970c3a32",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I want to (wanna)~, I don't want to (wanna)~, Do you want to (wanna)~?, You don't want to (wanna)~",
      sort: 235,
    },
    {
      _id: "61b20d1ac4540373970c3a34",
      title: "[문법/회화] 동사 뒤에 사람이 오는 경우 (수여동사)",
      sort: 236,
    },
    {
      _id: "61b20d89c4540373970c3a36",
      title: "[문법/회화] 접속사 ",
      sort: 237,
    },
    {
      _id: "61b20dcdc4540373970c3a37",
      title: "[회화/Dialogue] 접속사를 활용한 대화문",
      sort: 238,
    },
    {
      _id: "61b20e23c4540373970c3a3b",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I will never~, You make me~, Don't make me~",
      sort: 239,
    },
    {
      _id: "61b20ea1c4540373970c3a3f",
      title: "[회화] 자기 소개하기 ",
      sort: 240,
    },
    {
      _id: "61b20f35c4540373970c3a45",
      title: "[단어/동사] 동사 do의 다양한 활용",
      sort: 241,
    },
    {
      _id: "61b20faec4540373970c3a47",
      title: "[단어/명사] 자주 쓰는 명사 10개",
      sort: 242,
    },
    {
      _id: "61b2105bc4540373970c3a4b",
      title: "[단어/동사] 같은 듯 다른 단어 (hear, listen, sound)",
      sort: 243,
    },
    {
      _id: "61b210a6c4540373970c3a4d",
      title: "[회화] 아플 때 쓰는 표현  ",
      sort: 244,
    },
    {
      _id: "61b210e8c4540373970c3a4e",
      title: "[문법/회화] 좋아하는 일 말하기 ",
      sort: 245,
    },
    {
      _id: "61b21115c4540373970c3a51",
      title: "[회화/Dialogue] like to를 활용한 대화문",
      sort: 246,
    },
    {
      _id: "61b21163c4540373970c3a52",
      title: "[문법/회화] many vs much ",
      sort: 247,
    },
    {
      _id: "61b2119ac4540373970c3a53",
      title: "[회화/Dialogue] many, much를 활용한 대화문",
      sort: 248,
    },
    {
      _id: "61b21213c4540373970c3a56",
      title: "[문법/회화] some vs any ",
      sort: 249,
    },
    {
      _id: "61b21254c4540373970c3a59",
      title: "[회화/Dialogue] some, any를 활용한 대화문",
      sort: 250,
    },
    {
      _id: "61b212a2c4540373970c3a5f",
      title: "[단어/형용사] 감정을 나타내는 형용사 10개",
      sort: 251,
    },
    {
      _id: "61b21317c4540373970c3a64",
      title: "[문법/회화] to 부정사  ",
      sort: 252,
    },
    {
      _id: "61b21405c4540373970c3a6b",
      title: "[회화/Dialogue] to 부정사를 활용한 대화문 ",
      sort: 253,
    },
    {
      _id: "61b2146cc4540373970c3a70",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I need to~, I love to~, I hope to~",
      sort: 254,
    },
    {
      _id: "61b2158ec4540373970c3a73",
      title: "[문법/회화] 동명사의 활용 1강 ",
      sort: 255,
    },
    {
      _id: "61b215eac4540373970c3a77",
      title: "[단어/동사] 동사 go의 다양한 활용",
      sort: 256,
    },
    {
      _id: "61b2164ec4540373970c3a7a",
      title: "[문법/회화] 동명사의 활용 2강",
      sort: 257,
    },
    {
      _id: "61b2169cc4540373970c3a7c",
      title: "[회화/Dialogue] 동명사를 활용한 대화문",
      sort: 258,
    },
    {
      _id: "61b216dfc4540373970c3a7f",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I decided to~, I used to~, I tried to~, I forgot to~",
      sort: 259,
    },
    {
      _id: "61b21734c4540373970c3a80",
      title: "[단어/동사] 자주 쓰는 동사 10개 ",
      sort: 260,
    },
    {
      _id: "61b21781c4540373970c3a83",
      title: "[단어/동사] 동사 make의 다양한 활용",
      sort: 261,
    },
    {
      _id: "61b217d4c4540373970c3a85",
      title: "[문법/회화] 조동사 would ",
      sort: 262,
    },
    {
      _id: "61b21814c4540373970c3a89",
      title: "[회화/Dialogue] would를 활용한 대화문",
      sort: 263,
    },
    {
      _id: "61b2185cc4540373970c3a8d",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I enjoy ~ing, I'm good at~, I'm interested in~, I'm used to~",
      sort: 264,
    },
    {
      _id: "61b21898c4540373970c3a8f",
      title: "[문법/회화] 수량 표현하기 - 단위 of OOO",
      sort: 265,
    },
    {
      _id: "61b218e3c4540373970c3a90",
      title: "[문법/회화] 전치사 5강 (around, among, between)",
      sort: 266,
    },
    {
      _id: "61b21918c4540373970c3a91",
      title: "[회화/Dialogue] around, among, between을 활용한 대화문 ",
      sort: 267,
    },
    {
      _id: "61b21970c4540373970c3a94",
      title: "[단어/명사] 자주 쓰는 명사 10개",
      sort: 268,
    },
    {
      _id: "61b219d0c4540373970c3a98",
      title: "[단어/동사] 동사 work, play의 다양한 활용 ",
      sort: 269,
    },
    {
      _id: "61b21a12c4540373970c3a9a",
      title:
        "[회화/패턴] 유용한 회화 패턴 - It's time to~, It's nice to~, It's hard to~, It's easy to~",
      sort: 270,
    },
    {
      _id: "61b21a5cc4540373970c3aa0",
      title: "[문법/회화] few vs little ",
      sort: 271,
    },
    {
      _id: "61b21a9ac4540373970c3aa2",
      title: "[회화/Dialogue] few, little을 활용한 대화문 ",
      sort: 272,
    },
    {
      _id: "61b21aeac4540373970c3aa3",
      title: "[문법/회화] all, every, each",
      sort: 273,
    },
    {
      _id: "61b21b20c4540373970c3aa4",
      title: "[회화/Dialogue] all, every, each를 활용한 대화문",
      sort: 274,
    },
    {
      _id: "61b21b7ac4540373970c3aab",
      title: "[단어/형용사] 자주 쓰는 형용사 10개 ",
      sort: 275,
    },
    {
      _id: "61b21bc6c4540373970c3aad",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm happy to~, I'm here to~, I'm ready to~, I'm sorry to~",
      sort: 276,
    },
    {
      _id: "61b21c4ac4540373970c3ab1",
      title: "[문법/회화] can vs be able to ",
      sort: 277,
    },
    {
      _id: "61b21c83c4540373970c3ab3",
      title: "[회화/Dialogue] be able to를 활용한 대화문 ",
      sort: 278,
    },
    {
      _id: "61b21cb7c4540373970c3ab4",
      title: "[단어/형용사] 쓰임이 헷갈리는 단어 1강 - fun vs funny",
      sort: 279,
    },
    {
      _id: "61b21d04c4540373970c3ab6",
      title: "[문법/회화] 재귀대명사 ",
      sort: 280,
    },
    {
      _id: "61b22528c4540373970c3aca",
      title: "[회화/Dialogue] 재귀대명사를 활용한 대화문",
      sort: 281,
    },
    {
      _id: "61b22574c4540373970c3acf",
      title: "[단어/동사] 동사 look의 다양한 활용",
      sort: 282,
    },
    {
      _id: "61b225e7c4540373970c3ad0",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm thinking of~, I'm allergic to~, I remember -ing, It's impossible to~",
      sort: 283,
    },
    {
      _id: "61b2262bc4540373970c3ad3",
      title: "[문법/회화] both vs neither",
      sort: 284,
    },
    {
      _id: "61b22667c4540373970c3ad5",
      title: "[회화/Dialogue] both, neither를 활용한 대화문",
      sort: 285,
    },
    {
      _id: "61b226bbc4540373970c3ad8",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 286,
    },
    {
      _id: "61b2270ac4540373970c3adb",
      title: "[문법/회화] too vs either",
      sort: 287,
    },
    {
      _id: "61b22740c4540373970c3adc",
      title: "[회화/Dialogue] too, either를 활용한 대화문",
      sort: 288,
    },
    {
      _id: "61b22785c4540373970c3ae0",
      title: "[단어/동사] 동사 give의 다양한 활용",
      sort: 289,
    },
    {
      _id: "61b227c5c4540373970c3ae1",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm about to~, I'm busy ~ing~, I'm sick of~, I'm worried about~",
      sort: 290,
    },
    {
      _id: "61b22806c4540373970c3ae2",
      title: "[회화] 원어민이 자주 쓰는 표현 1강 - 칭찬",
      sort: 291,
    },
    {
      _id: "61b22863c4540373970c3ae3",
      title: "[문법/회화] 수동태",
      sort: 292,
    },
    {
      _id: "61b228b3c4540373970c3ae5",
      title: "[문법/회화] 과거분사 1강 ",
      sort: 293,
    },
    {
      _id: "61b228f1c4540373970c3ae6",
      title: "[문법/회화] 과거분사 2강 ",
      sort: 294,
    },
    {
      _id: "61b22925c4540373970c3ae8",
      title: "[회화/Dialogue] 수동태를 활용한 대화문",
      sort: 295,
    },
    {
      _id: "61b22972c4540373970c3aea",
      title: "[단어/명사] 자주 쓰는 명사 10개",
      sort: 296,
    },
    {
      _id: "61b229c8c4540373970c3aeb",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm trying to~, I just wanted to~, It takes time to~, It's my turn to~",
      sort: 297,
    },
    {
      _id: "61b22a21c4540373970c3af0",
      title:
        "[단어/형용사] 쓰임이 헷갈리는 단어 2강 - bored vs. boring, excited vs. exciting",
      sort: 298,
    },
    {
      _id: "61b22a6fc4540373970c3af2",
      title: "[단어/동사] 동사 let의 다양한 활용",
      sort: 299,
    },
    {
      _id: "61b22abac4540373970c3af3",
      title: "[문법/회화] 전치사 6강 (under, over, below, above)",
      sort: 300,
    },
    {
      _id: "61b22b16c4540373970c3af4",
      title: "[회화] 원어민이 자주 쓰는 표현 2강 - 감사, 기쁨",
      sort: 301,
    },
    {
      _id: "61b22b66c4540373970c3af8",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 302,
    },
    {
      _id: "61b22bd8c4540373970c3afc",
      title:
        "[회화/패턴] 유용한 회화 패턴 - It's worth~, I agree with~, I'm confused by~, Are you ready to~?",
      sort: 303,
    },
    {
      _id: "61b22c51c4540373970c3aff",
      title: "[문법/회화] 비교급 1강 ",
      sort: 304,
    },
    {
      _id: "61b22cb2c4540373970c3b00",
      title: "[문법/회화] 비교급 2강",
      sort: 305,
    },
    {
      _id: "61b22cf1c4540373970c3b01",
      title: "[회화/Dialogue] 비교급을 활용한 대화문",
      sort: 306,
    },
    {
      _id: "61b22d33c4540373970c3b02",
      title: "[문법/회화] 최상급 1강",
      sort: 307,
    },
    {
      _id: "61b22daac4540373970c3b03",
      title: "[문법/회화] 최상급 2강",
      sort: 308,
    },
    {
      _id: "61b22dd6c4540373970c3b04",
      title: "[회화/Dialogue] 최상급을 활용한 대화문",
      sort: 309,
    },
    {
      _id: "61b22e39c4540373970c3b08",
      title:
        "[단어/형용사] 쓰임이 헷갈리는 단어 3강 - interested vs. interesting, surprised vs. surprising",
      sort: 310,
    },
    {
      _id: "61b22ed1c4540373970c3b09",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 311,
    },
    {
      _id: "61b22f22c4540373970c3b0a",
      title: "[회화] 원어민이 자주 쓰는 표현 3강 - 사과/유감",
      sort: 312,
    },
    {
      _id: "61b22f87c4540373970c3b0b",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm terrible at~, I disagree with~, Don't forget to~, I didn't mean to~",
      sort: 313,
    },
    {
      _id: "61b22fc0c4540373970c3b0c",
      title: "[단어/동사] 동사 leave의 다양한 활용",
      sort: 314,
    },
    {
      _id: "61b23024c4540373970c3b0d",
      title: "[문법/회화] 전치사 7강 (in front of, behind, into, out of)",
      sort: 315,
    },
    {
      _id: "61b23070c4540373970c3b0e",
      title: "[회화/Dialogue] 전치사를 활용한 대화문",
      sort: 316,
    },
    {
      _id: "61b230b7c4540373970c3b0f",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 317,
    },
    {
      _id: "61b23120c4540373970c3b11",
      title: "[문법/회화] 현재완료 1강",
      sort: 318,
    },
    {
      _id: "61b231a0c4540373970c3b15",
      title: "[문법/회화] 현재완료 2강",
      sort: 319,
    },
    {
      _id: "61b231ddc4540373970c3b16",
      title: "[회화/Dialogue] 현재완료를 활용한 대화문",
      sort: 320,
    },
    {
      _id: "61b2322dc4540373970c3b17",
      title: "[문법/회화] 현재완료와 자주 쓰는 부사 ",
      sort: 321,
    },
    {
      _id: "61b232a5c4540373970c3b19",
      title:
        "[회화/패턴] 유용한 회화 패턴 - Have you ever~?, I have been to~, I have got to~",
      sort: 322,
    },
    {
      _id: "61b232e3c4540373970c3b1a",
      title: "[회화] 원어민이 자주 쓰는 표현 4강 ",
      sort: 323,
    },
    {
      _id: "61b2332cc4540373970c3b1b",
      title:
        "[단어/형용사] 쓰임이 헷갈리는 단어 4강- shocked vs. shocking, dissapointed vs. dissapointing,",
      sort: 324,
    },
    {
      _id: "61b233c3c4540373970c3b1d",
      title: "[회화] 자주 쓰는 한국말을 영어로 1강",
      sort: 326,
    },
    {
      _id: "61b23411c4540373970c3b1e",
      title:
        "[회화/패턴] 유용한 회화 패턴 - Don't ever~, I don't feel like~, I don't have enough~, I don’t have time to~",
      sort: 327,
    },
    {
      _id: "61b2345ec4540373970c3b1f",
      title: "[단어/형용사] 자주 쓰는 형용사 10개 (-able)",
      sort: 328,
    },
    {
      _id: "61b234b5c4540373970c3b22",
      title: "[회화/구동사] 구동사 1강 (동사 + on)",
      sort: 329,
    },
    {
      _id: "61b234fec4540373970c3b25",
      title: "[회화] 원어민이 자주 쓰는 표현 5강",
      sort: 330,
    },
    {
      _id: "61b23638c4540373970c3b28",
      title:
        "[회화/패턴] 유용한 회화 패턴 - It looks like~, It seems like~, It sounds like~, It tastes like~",
      sort: 332,
    },
    {
      _id: "61b23686c4540373970c3b29",
      title: "[회화] 자주 쓰는 한국말을 영어로 2강",
      sort: 333,
    },
    {
      _id: "61b236d9c4540373970c3b2a",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 334,
    },
    {
      _id: "61b23743c4540373970c3b2c",
      title: "[회화/구동사] 구동사 2강 (동사 + off)",
      sort: 335,
    },
    {
      _id: "61b23791c4540373970c3b2d",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm still ~ing, I can't wait to~, I can't stop-ing, What a~! ",
      sort: 336,
    },
    {
      _id: "61b237f4c4540373970c3b2e",
      title: "[회화] 원어민이 자주 쓰는 표현 6강 ",
      sort: 337,
    },
    {
      _id: "61b23839c4540373970c3b2f",
      title: "[문법/회화] 부사 5강",
      sort: 338,
    },
    {
      _id: "61b238c2c4540373970c3b31",
      title: "[회화] 자주 쓰는 한국말을 영어로 3강 ",
      sort: 339,
    },
    {
      _id: "61b239d8c4540373970c3b35",
      title: "[회화/구동사] 구동사 3강 (동사 + out)",
      sort: 340,
    },
    {
      _id: "61b23a1bc4540373970c3b37",
      title:
        "[회화/패턴] 유용한 회화 패턴 - What should I~?, Who wants to~?, Where can I~?, Where should I~?",
      sort: 341,
    },
    {
      _id: "61b23a64c4540373970c3b38",
      title: "[단어/형용사] 맛을 나타내는 형용사 10개",
      sort: 342,
    },
    {
      _id: "61b23aadc4540373970c3b39",
      title: "[회화] 원어민이 자주 쓰는 표현 7강 ",
      sort: 343,
    },
    {
      _id: "61b23aeec4540373970c3b3a",
      title: "[회화] 자주 쓰는 한국말을 영어로 4강",
      sort: 344,
    },
    {
      _id: "61b23b40c4540373970c3b3b",
      title: "[문법/회화] 전치사 8강 (during, until, through, without)",
      sort: 345,
    },
    {
      _id: "61b23b92c4540373970c3b3c",
      title: "[회화/구동사] 구동사 4강 (동사 + back)",
      sort: 346,
    },
    {
      _id: "61b23be7c4540373970c3b3d",
      title:
        "[회화/패턴] 유용한 회화 패턴 - How was~?, How much is~?, How about~?, How can you~?",
      sort: 347,
    },
    {
      _id: "61b23c31c4540373970c3b3e",
      title: "[단어/명사] 자주 쓰는 명사 10개",
      sort: 348,
    },
    {
      _id: "61b23c79c4540373970c3b3f",
      title: "[회화] 원어민이 자주 쓰는 표현 8강 ",
      sort: 349,
    },
    {
      _id: "61b23cc0c4540373970c3b40",
      title: "[회화] 자주 쓰는 한국말을 영어로 5강",
      sort: 350,
    },
    {
      _id: "61b23d06c4540373970c3b41",
      title: "[회화/구동사] 구동사 5강 (동사 + down)",
      sort: 351,
    },
    {
      _id: "61b23d4fc4540373970c3b42",
      title:
        "[회화/패턴] 유용한 회화 패턴 - Why don't you~?, Feel free to~, There's no time to~, There's been~",
      sort: 352,
    },
    {
      _id: "61b23dabc4540373970c3b43",
      title: "[문법/회화] if: 만약에 ~한다면",
      sort: 353,
    },
    {
      _id: "61b23dd2c4540373970c3b44",
      title: "[회화/Dialogue] if 조건절을 활용한 대화문",
      sort: 354,
    },
    {
      _id: "61b23e12c4540373970c3b45",
      title: "[단어/동사] 자주 쓰는 동사 10개",
      sort: 355,
    },
    {
      _id: "61b23e63c4540373970c3b47",
      title: "[회화] 원어민이 자주 쓰는 표현 9강 ",
      sort: 356,
    },
    {
      _id: "61b23eabc4540373970c3b48",
      title: "[회화] 자주 쓰는 한국말을 영어로 ",
      sort: 357,
    },
    {
      _id: "61b23f03c4540373970c3b4b",
      title: "[회화/구동사] 구동사 6강 (동사 + up)",
      sort: 358,
    },
    {
      _id: "61b24064c4540373970c3b4f",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I'm supposed to~, I'm willing to~, I'm looking forward to~, I can't afford to~",
      sort: 359,
    },
    {
      _id: "61b240a5c4540373970c3b50",
      title: "[읽기/발음] 알파벳 대표 발음 - V 읽기",
      sort: 21,
    },
    {
      _id: "61b240fec4540373970c3b52",
      title: "[회화] 한국인이 틀리기 쉬운 영어 1강 ",
      sort: 360,
    },
    {
      _id: "61b24139c4540373970c3b53",
      title: "[단어/형용사] 자주 쓰는 형용사 10개",
      sort: 361,
    },
    {
      _id: "61b24195c4540373970c3b54",
      title: "[회화] 원어민이 자주 쓰는 표현 10강",
      sort: 362,
    },
    {
      _id: "61b241d7c4540373970c3b55",
      title: "[회화] 자주 쓰는 한국말을 영어로 7강",
      sort: 363,
    },
    {
      _id: "61b2421dc4540373970c3b56",
      title: "[회화/구동사] 구동사 7강 (동사 + over)",
      sort: 364,
    },
    {
      _id: "61b2429bc4540373970c3b58",
      title: "[회화] 한국인이 틀리기 쉬운 영어 2강 ",
      sort: 366,
    },
    {
      _id: "61b242d5c4540373970c3b59",
      title: "[문법/회화] too to 용법",
      sort: 367,
    },
    {
      _id: "61b24301c4540373970c3b5a",
      title: "[회화/Dialogue] too to 용법을 활용한 대화문",
      sort: 368,
    },
    {
      _id: "61b2434bc4540373970c3b5b",
      title: "[회화] 원어민이 자주 쓰는 표현 11강 ",
      sort: 369,
    },
    {
      _id: "61b2438ec4540373970c3b5d",
      title: "[회화] 자주 쓰는 한국말을 영어로 8강 ",
      sort: 370,
    },
    {
      _id: "61b243d6c4540373970c3b5e",
      title: "[회화/구동사] 구동사 8강 (동사 + away)",
      sort: 371,
    },
    {
      _id: "61b24419c4540373970c3b5f",
      title:
        "[회화/패턴] 유용한 회화 패턴 - It's important to~, Please stop -ing, What happened to~?, I want you to~. ",
      sort: 372,
    },
    {
      _id: "61b2445dc4540373970c3b60",
      title: "[회화] 한국인이 틀리기 쉬운 영어 3강",
      sort: 373,
    },
    {
      _id: "61b244b2c4540373970c3b61",
      title: "[문법/회화] as as 용법 ",
      sort: 374,
    },
    {
      _id: "61b244f5c4540373970c3b62",
      title: "[회화/Dialogue] as as 용법을 활용한 대화문",
      sort: 375,
    },
    {
      _id: "61b24536c4540373970c3b63",
      title: "[회화] 원어민이 자주 쓰는 표현 12강 ",
      sort: 376,
    },
    {
      _id: "61b24562c4540373970c3b64",
      title: "[회화] 자주 쓰는 한국말을 영어로 9강 ",
      sort: 377,
    },
    {
      _id: "61b245b1c4540373970c3b66",
      title: "[회화/구동사] 구동사 9강 (동사 +in)",
      sort: 378,
    },
    {
      _id: "61b245eec4540373970c3b68",
      title:
        "[회화/패턴] 유용한 회화 패턴 - Don't be afraid to~, What do you want to~?, What do you think of~?, I know how to~.",
      sort: 379,
    },
    {
      _id: "61b24632c4540373970c3b69",
      title: "[회화] 한국인이 틀리기 쉬운 영어 4강 ",
      sort: 380,
    },
    {
      _id: "61b951bf7c08061bda485fc4",
      title: "[문법] 명사의 단수와 복수 1강",
      sort: 88,
    },
    {
      _id: "61b973447c08061bda4860d1",
      title: "[읽기/발음] 이중 모음 4강 - oa, oi, oy, oo",
      sort: 48,
    },
    {
      _id: "61b97a7b7c08061bda486133",
      title:
        "[회화/패턴] 유용한 회화 패턴 - Don't be so~, Why are you so~?, How often do you~?",
      sort: 215,
    },
    {
      _id: "61c5287144db6e512b55f78b",
      title: "[단어/수사] 긴 숫자 읽기",
      sort: 331,
    },
    {
      _id: "61cd47ccc955392c33ea7260",
      title:
        "[회화/패턴] 유용한 회화 패턴 - I don't like to~, I don't care about~, I don't mind-ing, I don't know anything about~",
      sort: 365,
    },
    {
      _id: "61ce5832c955392c33ea76a0",
      title: "[단어/명사] 자주 쓰는 명사 10개",
      sort: 325,
    },
  ];

  try {
    await Promise.all(
      test.map(async (data) => {
        const insertQ = `
        INSERT INTO media
        (
          title,
          sort,
          previousId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          "${data.title}",
          ${data.sort},
          '${data._id}',
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertQ);
      })
    );

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("엑셀데이터를 넣을 수 없습니다.");
  }
});

module.exports = router;
