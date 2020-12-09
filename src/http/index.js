import apis from './api'

const install = Vue => {
    if (install.installed)
        return;

    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        // 挂载在 Vue 原型的 $api 对象上
        $api: {
            get() {
                return apis
            }
        }
    })
}

export default install