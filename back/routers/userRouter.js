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
  const { id, password, mobile, username, address, zoneCode, detailAddress } =
    req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    const selectQ = `
    SELECT  id,
            password
      FROM  users
     WHERE  id = ${id}
    `;
    const find = await models.sequelize.query(selectQ);

    let cipher = crypto.createHash("sha512");

    cipher.update(password);
    const hashedPassword = cipher.digest("hex");

    // const result = await bcrypt.compare(password, exUser.password);

    if (find[0][0]) {
      if (find[0][0].password === hashedPassword) {
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
  const test = [
    {
      isDelete: true,
      title: "공지사항 등록 테스트",
      type: "공지사항",
      description: "<p>테스트 등록</p>",
      deletedAt: "2022-01-17 15:05:04",
      createdAt: "2020-10-22 12:25:12",
      hit: 6,
    },
    {
      isDelete: true,
      title: "공지사항 새소식 ",
      type: "공지사항",
      description: "<p>공지사항 입니다.</p>",
      deletedAt: "2022-01-17 15:05:00",
      createdAt: "2021-03-10 21:32:57",
      hit: 11,
    },
    {
      hit: 8,
      isDelete: true,
      title: "test",
      type: "새소식",
      description: "<p>test</p>",
      deletedAt: "2022-01-19 00:55:54",
      createdAt: "2022-01-17 15:10:21",
    },
    {
      hit: 4,
      isDelete: true,
      title: "홈 화면 추가 네이버 앱 편 (어플 처럼 편리하게 사용하세요)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022119103226(%EA%B3%B5%EC%A7%80)%EB%84%A4%EC%9D%B4%EB%B2%84%EC%95%B1%20%ED%99%88%20%ED%99%94%EB%A9%B4%20%EC%B6%94%EA%B0%801.jpg?alt=media&amp;token=c979d140-2d3a-4190-8d51-7ca64efbbacb"></p><p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022119103241(%EA%B3%B5%EC%A7%80)%EB%84%A4%EC%9D%B4%EB%B2%84%EC%95%B1%20%ED%99%88%20%ED%99%94%EB%A9%B4%20%EC%B6%94%EA%B0%802.jpg?alt=media&amp;token=45ef5f39-7005-42d2-a6e6-1330958ba22b"></p>',
      deletedAt: "2022-01-19 10:34:38",
      createdAt: "2022-01-19 10:32:50",
    },
    {
      hit: 195,
      isDelete: false,
      title: "1:1 문의가 필요하신 분은 카카오톡 상담하기로  상담해주세요",
      type: "공지사항",
      description:
        "<p>안녕하세요 친절한 영어교실 운영팀입니다</p><p><br></p><p>1:1 상담을 원하시는 분들은 아래쪽 카카오톡 상담하기를 누르셔서</p><p><br></p><p>상담원과 상담해 주시면</p><p><br></p><p>빠르게 처리해 드리겠습니다.</p>",
      deletedAt: "",
      createdAt: "2022-01-19 10:39:58",
    },
    {
      hit: 1,
      isDelete: true,
      title: "[공지] 해외구매자 교재 발송 안내",
      type: "공지사항",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120144136021.jpg?alt=media&amp;token=f8c9c932-2c28-4e5b-b44a-44fda640b841"></p>',
      deletedAt: "2022-01-20 15:10:18",
      createdAt: "2022-01-20 14:41:42",
    },
    {
      hit: 2444,
      isDelete: false,
      title: "[정보] 홈화면 추가 기능으로 어플처럼 사용하세요 (네이버앱 편)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015854001.jpg?alt=media&amp;token=391ae06d-8799-453c-b964-988f0ae0b2e6"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015858002.jpg?alt=media&amp;token=c9aef106-5d6d-4ea0-b426-ee96d9f2e56d"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:09:34",
    },
    {
      hit: 2515,
      isDelete: false,
      title: "[정보] 홈화면 추가 기능으로 어플처럼 사용하세요 (삼성인터넷 편)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120151117005.jpg?alt=media&amp;token=da273566-2a95-4615-83f9-b686a0128f94"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120151123006.jpg?alt=media&amp;token=d0cf9ed5-994d-46c6-b752-4c6349c39fab"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:11:39",
    },
    {
      hit: 913,
      isDelete: false,
      title: "[정보] 홈화면 추가 기능으로 어플처럼 사용하세요 (아이폰 편)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015124007.jpg?alt=media&amp;token=e47036ad-7baa-4687-8fb1-67fa50bb8101"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015128008.jpg?alt=media&amp;token=9ecdbc51-b8b9-40f9-a8fc-d0d167e20f1b"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:12:38",
    },
    {
      hit: 1390,
      isDelete: false,
      title: "[정보] 홈화면 추가 기능으로 어플처럼 사용하세요 (크롬앱 편)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120151258003.jpg?alt=media&amp;token=35820976-86b5-4074-b551-128c0ba484c7"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015133004.jpg?alt=media&amp;token=0230e6e1-b841-40af-872e-4fce58e90df3"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:13:20",
    },
    {
      hit: 0,
      isDelete: true,
      title: "모바일 캐시삭제 방법 (네이버 앱)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120151454009.jpg?alt=media&amp;token=11e6aec4-da6d-479e-b7d1-3b8db603138f"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120151458010.jpg?alt=media&amp;token=00d59979-3d36-4d3a-b54a-cd65d6d4251a"></p>',
      deletedAt: "2022-01-20 15:26:26",
      createdAt: "2022-01-20 15:26:16",
    },
    {
      hit: 424,
      isDelete: false,
      title: "[정보] 모바일 캐시삭제 방법 (네이버 앱)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120152641009.jpg?alt=media&amp;token=b5411a7d-427b-46d1-8db9-d7e77ec66cad"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120152644010.jpg?alt=media&amp;token=f46c1e42-def9-4d12-a4f8-422de488b082"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:26:48",
    },
    {
      hit: 468,
      isDelete: false,
      title: "[정보] 모바일 캐시삭제 방법 (삼성인터넷)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015279011.jpg?alt=media&amp;token=03b6bab2-cf9a-4fd4-9db4-905aef0306c5"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120152714012.jpg?alt=media&amp;token=f80d908d-19c5-4a7d-b5e6-84fc34c01315"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:27:38",
    },
    {
      hit: 403,
      isDelete: false,
      title: "[정보] 모바일 캐시삭제 방법 (아이폰)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015280013.jpg?alt=media&amp;token=26e590b9-aeb9-4d43-99ac-1df325367fa8"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015283014.jpg?alt=media&amp;token=00066380-0580-43b0-84a6-f80a2aaa53f4"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:28:17",
    },
    {
      hit: 246,
      isDelete: false,
      title: "[정보] PC 캐시삭제 방법 (네이버 웨일)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120152859015.jpg?alt=media&amp;token=c493f8c0-c2cf-4f74-80ed-858fff3ac877"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212015295016.jpg?alt=media&amp;token=c264c7ed-7717-494d-b6ab-fa9a477dfa75"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:29:25",
    },
    {
      hit: 736,
      isDelete: false,
      title: "[정보] PC 캐시삭제 방법 (엣지)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120152947017.jpg?alt=media&amp;token=ea882cad-2d11-4fc1-b380-b3b888e8a9b9"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120152951018.jpg?alt=media&amp;token=dfe08f13-47e1-4d3d-845d-42f382a0ef29"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:29:57",
    },
    {
      hit: 728,
      isDelete: false,
      title: "[정보] PC 캐시삭제 방법 (크롬)",
      type: "새소식",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120153015019.jpg?alt=media&amp;token=7d22fcc5-39fa-4c56-ba35-c9d3822d17bd"></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120153019020.jpg?alt=media&amp;token=1bbf4e43-cf40-47e2-a588-ab56dc0740cc"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:30:24",
    },
    {
      hit: 1408,
      isDelete: false,
      title: "[공지] 해외구매자 교재 발송 안내",
      type: "공지사항",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2022120153038021.jpg?alt=media&amp;token=0b9bf133-d35d-4297-a8d9-982c3ab42e72"></p>',
      deletedAt: "",
      createdAt: "2022-01-20 15:30:41",
    },
    {
      hit: 525,
      isDelete: false,
      title: "[공지] 카카오톡 상담 관련",
      type: "공지사항",
      description:
        '<p><br></p><p><br></p><p><br></p><p>안녕하세요.</p><p>친절한 영어교실입니다.</p><p><br></p><p>카카오 측 판교 데이터 센터 화재로 기업 카카오톡 상담이 원활하지 않습니다.</p><p><span style="color: rgb(102, 102, 102);">이슈 발생 일시 : 22/10/15 15:30 ~ (진행중)</span></p><p>*현재 카카오톡 / 개인 -&gt; 기업 발신 시 확인 및 수신 불가능 (개인 발신만 가능)</p><p><br></p><p>카카오 측에서 점검 진행 중이며 점검이 완료될 때까지 유선 상담 이용 부탁드립니다.</p><p>불편을 드려 죄송합니다.</p><p><br></p><p>상담전화 02-6375-0300~1</p><p><br></p><p>감사합니다.</p>',
      deletedAt: "",
      createdAt: "2022-10-17 09:38:24",
    },
    {
      hit: 917,
      isDelete: false,
      title: "[공지] 교재 배송 지연 안내",
      type: "공지사항",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F20221118154942%EA%B5%90%EC%9E%AC%20%EB%B0%B0%EC%86%A1%20%EC%A7%80%EC%97%B0%20%EC%95%88%EB%82%B4.png?alt=media&amp;token=0284d808-da1f-4bb9-bb34-1ce5e95b9929"></p>',
      deletedAt: "",
      createdAt: "2022-11-18 15:50:22",
    },
    {
      hit: 39,
      isDelete: true,
      title: "[공지] 서버 점검 안내",
      type: "공지사항",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F20221124212324%EC%84%9C%EB%B2%84%EC%A0%90%EA%B2%80.png?alt=media&amp;token=21c7e387-b00d-46e4-a3b9-9b92ba143aa3"></p>',
      deletedAt: "2022-12-01 11:22:15",
      createdAt: "2022-11-24 21:23:28",
    },
    {
      hit: 340,
      isDelete: false,
      title: "서버 장애 안내",
      type: "공지사항",
      description: "",
      deletedAt: "",
      createdAt: "2022-12-09 09:30:35",
    },
    {
      hit: 2267,
      isDelete: false,
      title: "[공지] 교재 무료증정 이벤트 안내",
      type: "공지사항",
      description:
        '<p><br></p><p><br></p><p><br></p><p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202212301947231230%EA%B3%B5%EC%A7%8011.png?alt=media&amp;token=cb5a2fae-9e9b-4b81-84cc-02d6a4cf4887"></p>',
      deletedAt: "",
      createdAt: "2022-12-30 19:47:34",
    },
    {
      hit: 218,
      isDelete: false,
      title: "[공지] 서버 과부하 안내",
      type: "공지사항",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F202311216132%EC%84%9C%EB%B2%84%20%EA%B3%BC%EB%B6%80%ED%95%98%20%EC%95%88%EB%82%B4.png?alt=media&amp;token=ff482c52-3742-42b9-9c47-b3de593c6044"></p>',
      deletedAt: "",
      createdAt: "2023-01-12 16:13:28",
    },
    {
      hit: 205,
      isDelete: false,
      title: "서버 안정화 작업 안내 ",
      type: "공지사항",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2023113165033%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C1.JPG?alt=media&amp;token=7340595a-50c7-429d-8fc4-cdd18b90327a"></p>',
      deletedAt: "",
      createdAt: "2023-01-13 16:51:03",
    },
    {
      hit: 490,
      isDelete: false,
      title: "[공지] 설 연휴 기간 배송안내",
      type: "공지사항",
      description:
        '<p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2023116152558%EC%84%A4%EB%82%A0%20%EA%B3%B5%EC%A7%80.png?alt=media&amp;token=cc94ba0f-0825-4ade-a7ff-ce47d8fdf8a0"></p>',
      deletedAt: "",
      createdAt: "2023-01-16 15:26:01",
    },
    {
      hit: 0,
      isDelete: true,
      title: "테스트",
      type: "공지사항",
      description: "<p>테스트</p>",
      deletedAt: "2023-02-06 13:41:36",
      createdAt: "2023-02-06 13:41:20",
    },
    {
      hit: 323,
      isDelete: false,
      title: "[공지] 3.1절 배송안내",
      type: "공지사항",
      description:
        '<p><br></p><p><br></p><p><img src="https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fuploads%2FeditorImages%2F2023228155453%EC%82%BC%EC%9D%BC%EC%A0%88%20%EA%B3%B5%EC%A7%802.png?alt=media&amp;token=febffebb-ec60-4582-aa04-027a564fb36e"></p>',
      deletedAt: "",
      createdAt: "2023-02-28 09:54:45",
    },
  ];

  try {
    await Promise.all(
      test.map(async (data) => {
        const insertQ = `
        INSERT INTO notices
        (
          title,
          type,
          content,
          hit,
          isDelete,
          updator,
          isUpdate,
          createdAt,
          updatedAt
        )
        VALUES
        (
          "${data.title}",
          "${data.type}",
          '${data.description}',
          ${data.hit},
          ${data.isDelete ? `TRUE` : `FALSE`},
          updator = 1,
          isUpdate = TRUE,
          "${data.createdAt}",
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
