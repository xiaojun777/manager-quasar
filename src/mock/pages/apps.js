import users from './users';
import groups from './groups';
import educations from './education';

let apps = {
  users: users.app,
  groups: groups.app,
  educations: educations.app
}

export default {
  installData: function (mock){

    mock.onGet("/apps").reply(200, [{
      id: "users",
      name: "用户管理",
    },{
      id: "groups",
      name: "用户组管理",
    },{
      id: "educations",
      name: "教育经历",
    }]);

    mock.onGet("/apps/getapp").reply(function (config){
      let params = config.params;
      return [200,
        apps[params.appid]
      ];
    });
  }
}
