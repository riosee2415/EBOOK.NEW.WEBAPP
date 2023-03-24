const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");

const router = express.Router();

router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchData, searchLevel, searchExit } = req.body;

  const _searchData = searchData ? searchData : ``;

  const _searchLevel = parseInt(searchLevel) === 0 ? 0 : parseInt(searchLevel);

  const _searchExit = searchExit ? searchExit : false;

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
                  SELECT  COUNT(id)
                    FROM  review        B
                   WHERE  id = B.id
                 ) > 0 THEN 1
            ELSE 0
          END                                       AS isWriteReview,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
		      DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
		      DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")		  AS viewExitedAt
    FROM	users
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

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
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
              A.email
        FROM  users			A
       WHERE  A.id = ${req.user.id}
      `;

      const boughtQ = `
      SELECT  C.id,
              C.userId,
                  C.lectureType,
              CASE
                  WHEN C.lectureType = 1 THEN "1년"
                  WHEN C.lectureType = 2 THEN "2년"
                  WHEN C.lectureType = 3 THEN "3년"
                  WHEN C.lectureType = 4 THEN "평생"
                  WHEN C.lectureType = 5 THEN "3달"
                  WHEN C.lectureType = 6 THEN "상품"
              END										AS viewLectureType,
              C.recentlyTurn,
              C.recentlyTime,
              C.startDate,
              C.endDate,
              DATE_FORMAT(C.startDate, '%Y년 %m월 %d일') 	AS viewStartDate,
              DATE_FORMAT(C.endDate, '%Y년 %m월 %d일') 		AS viewEndDate
        FROM	boughtLecture		C
       WHERE  C.isDelete = FALSE
         AND  C.isPay = TRUE
         AND  C.endDate IS NOT NULL
         AND  DATE_FORMAT(C.endDate, '%Y%m%d') >= DATE_FORMAT(NOW(), '%Y%m%d')
         AND  ${req.user.id} = C.userId
       ORDER  BY  C.createdAt DESC
       LIMIT  1
    `;

      const find = await models.sequelize.query(findQ);
      const bought = await models.sequelize.query(boughtQ);

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log({ ...find[0][0], ...bought[0][0] });
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json({ ...find[0][0], ...bought[0][0] });
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
              A.email
        FROM  users			A
       WHERE  A.id = ${user.id}
      `;

      const boughtQ = `
      SELECT  C.id,
              C.userId,
                  C.lectureType,
              CASE
                  WHEN C.lectureType = 1 THEN "1년"
                  WHEN C.lectureType = 2 THEN "2년"
                  WHEN C.lectureType = 3 THEN "3년"
                  WHEN C.lectureType = 4 THEN "평생"
                  WHEN C.lectureType = 5 THEN "3달"
                  WHEN C.lectureType = 6 THEN "상품"
              END										AS viewLectureType,
              C.recentlyTurn,
              C.recentlyTime,
              C.startDate,
              C.endDate,
              DATE_FORMAT(C.startDate, '%Y년 %m월 %d일') 	AS viewStartDate,
              DATE_FORMAT(C.endDate, '%Y년 %m월 %d일') 		AS viewEndDate
        FROM	boughtLecture		C
       WHERE  C.isDelete = FALSE
         AND  C.isPay = TRUE
         AND  C.endDate IS NOT NULL
         AND  DATE_FORMAT(C.endDate, '%Y%m%d') >= DATE_FORMAT(NOW(), '%Y%m%d')
         AND  ${user.id} = C.userId
       ORDER  BY  C.createdAt DESC
       LIMIT  1
    `;

      const find = await models.sequelize.query(findQ);
      const bought = await models.sequelize.query(boughtQ);

      return res.status(200).json({ ...find[0][0], ...bought[0][0] });
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

    const hashedPassword = await bcrypt.hash(password, 12);

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
  const { id, password, mobile, username, address, zoneCode, detailAddress } =
    req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    const result = await bcrypt.compare(password, exUser.password);

    if (!result) {
      return res.status(401).send("비밀번호가 일치하지 않습니다.");
    }

    const updateQ = `
    UPDATE  users
       SET  mobile = "${mobile}",
            username = "${username}",
            address = "${address}",
            zoneCode = "${zoneCode}",
            detailAddress = "${detailAddress}",
            updatedAt = NOW()
     WHERE  id = ${id}
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

    const hashPassord = await bcrypt.hash(password, 12);

    const updateResult = await User.update(
      { password: hashPassord },
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
      const hashPassord = await bcrypt.hash(password, 12);

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

module.exports = router;
