import operations from './operations';

export default {
  items: function (app, rows, retRows, searching, config) {
    let params = config.params;
    if (searching !== params.searching) {
      searching = params.searching;
      retRows = operations.searchRows(app, rows, searching);
    }
    return [200,{
      code: true,
      items: retRows.slice(params.start, params.start + params.count),
      length: retRows.length,
    }];
  },

  add: function (app, rows, config) {
    let params = JSON.parse(config.data).params;
    var bRet = operations.addRow(app, rows, params);
    var msg = "add row is ok.";
    if (!bRet) {
      msg = "add row is not ok.";
    }
    return [200, {
      code: bRet,
      msg: msg,
    }];
  },

  update: function (app, rows, config) {
    let params = JSON.parse(config.data).params;
    var bRet = operations.updateRow(app, rows, params);
    var msg = "update row is ok.";
    if (!bRet) {
      msg = "update row is not ok.";
    }
    return [200, {
      code: bRet,
      msg: msg,
    }];
  },

  delete: function (app, rows, config) {
    let params = JSON.parse(config.data).params;
    var bRet = operations.deleteRows(app, rows, params);
    var msg = "delete rows is ok.";
    if (!bRet) {
      msg = "delete rows is not ok.";
    }
    return [200, {
      code: bRet,
      msg: msg,
    }];
  }

}
