const models = require("../models");

const noneParameterSelectQuery = async (query) => {
  try {
    const result = await models.sequelize.query(query);

    return result[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

const consistOfArrayToArray = (arr1, arr2, targetColumn) => {
  arr1.map((item) => {
    const tempArr = [];

    arr2.map((inItem) => {
      if (item.id === inItem[targetColumn]) {
        tempArr.push(inItem);
      }
    });

    item["connectArray"] = tempArr;
  });

  return arr1;
};

const consistOfArrayToArray2 = (arr1, arr2, targetColumn) => {
  arr1.map((item) => {
    const tempArr = [];

    arr2.map((inItem) => {
      if (item[targetColumn] === inItem[targetColumn]) {
        tempArr.push(inItem);
      }
    });

    item["connectArray"] = tempArr;
  });

  return arr1;
};

const actionUpdateQuery = async (query) => {
  try {
    const result = await models.sequelize.query(query);

    if (result[0].changedRows > 0) {
      return true;
    } else {
      throw Error("변경된 데이터가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const insertAction = async (tableName, list) => {
  let query = `
    INSERT INTO ${tableName} (
      ${list
        .map((item, idx) => {
          if (idx !== list.length - 1) {
            return item.column + ",\n";
          } else {
            return item.column;
          }
        })
        .join("")}
      , createdAt
      , updatedAt
    ) VALUES (
      ${list
        .map((item, idx) => {
          if (idx !== list.length - 1) {
            if (item.isNumeric) {
              return `${item.data},\n`;
            } else {
              return `"${item.data}",\n `;
            }
          } else {
            if (item.isNumeric) {
              return `${item.data}`;
            } else {
              return `"${item.data}"`;
            }
          }
        })
        .join("")}
      , NOW()
      , NOW()
    )
  `;

  try {
    const result = await models.sequelize.query(query);

    if (result[1] > 0) {
      return { result: true, targetId: result[0] };
    } else {
      throw Error("변경된 데이터가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const exportFn = {
  noneParameterSelectQuery,
  consistOfArrayToArray,
  consistOfArrayToArray2,
  actionUpdateQuery,
  insertAction,
};

module.exports = exportFn;
