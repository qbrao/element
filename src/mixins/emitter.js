function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    /**
     * 
     * @param {string} componentName 组件名，用于匹配到正确的组件
     * @param {string} eventName 事件名，触发的事件名
     * @param {any} params payload，接收的数据 
     */
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      // 遍历父组件，直到没有父组件或找到组件名为 componentName 的组件为止
      while (parent && (!name || name !== componentName)) {
        // 查找父组件
        parent = parent.$parent;

        // 如果有父组件就更新 name 为父组件的 componentName，退出循环
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      // 有父组件，触发父组件对应的事件函数
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
