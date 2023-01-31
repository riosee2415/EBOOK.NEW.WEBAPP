const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const { Notice, NoticeComment } = require("../models");

const router = express.Router();

router.post("/detail", async (req, res, next) => {
  const { commentId, noticeId } = req.body;

  try {
    const selectQuery = `
      SELECT	*
        FROM	(
                WITH RECURSIVE comments_hire AS (
                  SELECT	1				AS	lev,
                          NC.id,
                          NC.content,
                          NC.parent,
                          NC.parentId,
                          NC.createdAt,
                          NC.NoticeId,
                          US.email,
                          US.username,
                          US.level,
                          US.username		as paths
                    FROM	noticeComments		NC
                   INNER
                    JOIN	users					US
                      ON	NC.UserId = US.id 
                   WHERE	NC.isDelete = 0
                     AND	NC.NoticeId = ${noticeId}
                     AND 	NC.id = ${commentId}
                   UNION	ALL
                  SELECT	B.lev + 1			AS 	lev,
                          A.id,
                          CONCAT(LPAD('', 2 * (B.lev) ,' '), 'ㄴ', A.content),
                          A.parent,
                          A.parentId,
                          A.createdAt,
                          A.NoticeId,
                          B.email,
                          B.username,
                          B.level,
                          CONCAT(B.paths, A.id,'-', 	B.username, A.id)	AS paths
                    FROM	noticeComments		AS 	A
                   INNER
                    JOIN	comments_hire		AS	B
                      ON	A.parentId = B.id
              ) 
            SELECT * FROM comments_hire
          )	X
        ORDER	BY X.paths
        `;

    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json({ list: list[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글 정보를 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { content, noticeId, parentId } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const exNotice = await Notice.findOne({
      where: { id: parseInt(noticeId), isDelete: false },
    });

    if (!exNotice) {
      return res.status(401).send("존재하지 않는 게시글입니다.");
    }

    let dataJson = {};

    if (parentId !== null) {
      dataJson = await Notice.findOne({
        where: { id: parseInt(parentId) },
      });

      if (!dataJson) {
        return res.status(401).send("잠시후 다시 시도하여 주십시오.");
      }
    }

    const createResult = await NoticeComment.create({
      content,
      parent: parentId === null ? 0 : parseInt(dataJson.parent) + 1,
      parentId: parentId ? parentId : null,
      NoticeId: parseInt(noticeId),
      UserId: parseInt(req.user.id),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글을 작성할 수 없습니다.");
  }
});

router.post("/update", isLoggedIn, async (req, res, next) => {
  const { id, content } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const exNoticeComment = await NoticeComment.findOne({
      where: { id: parseInt(id), isDelete: false },
    });

    if (!exNoticeComment) {
      return res.status(401).send("존재하지 않는 게시글입니다.");
    }

    if (exNoticeComment.UserId !== req.user.id) {
      return res.status(401).send("자신의 댓글만 수정할 수 있습니다.");
    }

    const updateResult = await NoticeComment.update(
      {
        content,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    if (updateResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글을 작성할 수 없습니다.");
  }
});

router.patch("/delete", isLoggedIn, async (req, res, next) => {
  const { commentId } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  if (isNanCheck(commentId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exNoticeComment = await NoticeComment.findOne({
      where: { id: parseInt(commentId), isDelete: false },
    });

    if (!exNoticeComment) {
      return res.status(401).send("존재하지 않는 댓글입니다.");
    }

    if (exNoticeComment.UserId !== req.user.id) {
      return res.status(401).send("자신의 댓글만 삭제할 수 있습니다.");
    }

    const deleteResult = await NoticeComment.update(
      {
        isDelete: true,
        deletedAt: new Date(),
      },
      {
        where: { id: parseInt(commentId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글을 작성할 수 없습니다.");
  }
});
module.exports = router;
