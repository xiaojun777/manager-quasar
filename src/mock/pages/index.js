import users from './users'
import boards from './boards'
import apps from './apps'
import educations from './education'

export default {
  installData: function (mock) {
    apps.installData(mock)
    boards.installData(mock)
    users.installData(mock)
    educations.installData(mock)
  },
}
