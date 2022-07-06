var isExistRow = function (app, rows, val) {
  var key = app.schema.key;
  var bRet = false;
  rows.forEach((row) => {
    if (row[key] === val[key]) {
      bRet = true;
    }
  });
  return bRet;
};

var addRow = function (app, rows, val) {
  var bRet = true;
  if (isExistRow(app, rows, val)) {
    bRet = false;
  } else {
    rows.push(val);
  }
  return bRet;
};

var updateRow = function (app, rows, val) {
  var key = app.schema.key;
  var bRet = true;
  if (isExistRow(app, rows, val)) {
    for (let i = 0; i < rows.length; i++) {
      if (val[key] === rows[i][key]) {
        rows[i] = val;
        break;
      }
    }
  } else {
    bRet = false;
  }
  return bRet;
};

var deleteRow = function (app, rows, val) {
  var key = app.schema.key;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][key] === val[key]) {
      rows.splice(i, 1);
      break;
    }
  }
};

var deleteRows = function (app, rows, vals) {
  var bRet = true;
  for (let i = 0; i < vals.length; i++) {
    deleteRow(app, rows, vals[i]);
  }
  return bRet;
};

var searchRows = function (app, rows, searching) {
  let retRows = rows;
  for (let i = 0; i < app.schema.items.length; i++) {
    let item = app.schema.items[i];
    if (item.searchable) {
      switch (item.type) {
        case "string": {
          if (searching[item.id] !== void 0 && searching[item.id].length > 0) {
            retRows = retRows.filter((row) => {
              let bRet = false;
              if (row[item.id].indexOf(searching[item.id]) !== -1) {
                bRet = true;
              }
              return bRet;
            });
          }
          break;
        }
        case "number": {
          if (searching[item.id] !== void 0) {
            let numberSearching = searching[item.id];
            if (
              numberSearching.min !== void 0 &&
              numberSearching.max === void 0
            ) {
              retRows = retRows.filter((row) => {
                return row[item.id] >= numberSearching.min;
              });
            }

            if (
              numberSearching.min === void 0 &&
              numberSearching.max !== void 0
            ) {
              retRows = retRows.filter((row) => {
                return row[item.id] <= numberSearching.max;
              });
            }

            if (
              numberSearching.min !== void 0 &&
              numberSearching.max !== void 0
            ) {
              retRows = retRows.filter((row) => {
                return (
                  row[item.id] >= numberSearching.min &&
                  row[item.id] <= numberSearching.max
                );
              });
            }
          }
          break;
        }
        case "option": {
          if (
            searching[item.id] !== void 0 &&
            searching[item.id] !== null &&
            searching[item.id].length > 0
          ) {
            retRows = retRows.filter((row) => {
              let bRet = false;
              if (searching[item.id].includes(row[item.id])) {
                bRet = true;
              }
              return bRet;
            });
          }
          break;
        }
      }
    }
  }
  return retRows;
};

export default {
  addRow: addRow,
  updateRow: updateRow,
  deleteRow: deleteRow,
  deleteRows: deleteRows,
  searchRows: searchRows,
};
