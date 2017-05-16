// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

// Modifier:

import Vue from 'vue'

import './style/style.scss'

import AdminMessageBox from './components/admin-message-box'
import AdminToast from './components/admin-toast'

import AdminCascading from './components/admin-cascading'
import AdminCheckbox from './components/admin-checkbox'
import AdminDatePicker from './components/admin-datepicker'
import AdminIcon from './components/admin-icon'
import AdminInput from './components/admin-input'
import AdminMenu from './components/admin-menu'
import AdminModal from './components/admin-modal'
import AdminPageContainer from './components/admin-page-container'
import AdminPaginator from './components/admin-paginator'
import AdminPannel from './components/admin-pannel'
import AdminRadio from './components/admin-radio'
import AdminSelect from './components/admin-select'
import AdminSpinner from './components/admin-spinner'
import AdminTabs from './components/admin-tabs'
import AdminTimepicker from './components/admin-timepicker'
import AdminProgress from './components/admin-progress'

const components = [
  AdminMessageBox,
  AdminToast,
  AdminCascading,
  AdminCheckbox,
  AdminDatePicker,
  AdminIcon,
  AdminInput,
  AdminMenu,
  AdminModal,
  AdminPageContainer,
  AdminPaginator,
  AdminPannel,
  AdminRadio,
  AdminSelect,
  AdminSpinner,
  AdminTabs,
  AdminTimepicker,
  AdminProgress
]

const install = function (Vue, options = {}) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$messageBox = AdminMessageBox
  Vue.prototype.$alert = AdminMessageBox.alert
  Vue.prototype.$confirm = AdminMessageBox.confirm
  Vue.prototype.$prompt = AdminMessageBox.prompt
  Vue.prototype.$taost = AdminToast
}

install(Vue)

export {
  AdminMessageBox,
  AdminToast,
  AdminCascading,
  AdminCheckbox,
  AdminDatePicker,
  AdminIcon,
  AdminInput,
  AdminMenu,
  AdminModal,
  AdminPageContainer,
  AdminPaginator,
  AdminPannel,
  AdminRadio,
  AdminSelect,
  AdminSpinner,
  AdminTabs,
  AdminTimepicker,
  AdminProgress
}

export default {
  AdminMessageBox,
  AdminToast,
  AdminCascading,
  AdminCheckbox,
  AdminDatePicker,
  AdminIcon,
  AdminInput,
  AdminMenu,
  AdminModal,
  AdminPageContainer,
  AdminPaginator,
  AdminPannel,
  AdminRadio,
  AdminSelect,
  AdminSpinner,
  AdminTabs,
  AdminTimepicker,
  AdminProgress
}
