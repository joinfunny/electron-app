import userListModel from './user-list.js'
import loginModel from './login.js'
import complaints from './complaints.js'

let models = {
  userListModel,
  loginModel,
  complaints
}

let allModels = {}

for (let key in models) {
  let pageModel = models[key]
  for (let key in pageModel) {
    // test if there are api useing same name
    if (key in allModels) throw new Error(`model: api should not have same name "${key}".`)
    allModels[key] = pageModel[key]
  }
}

export default allModels
