<template>
  <a-layout>
    <a-layout>
      <header-public :collapsed.sync="collapsed" @collapsed-changed="changeCollapsed" />
      <a-layout>
        <slot name="breadcrumb"></slot>
        <a-layout-content>
          <slot />
          <a-layout-footer>
            <a-layout-footer style="text-align: center; padding-bottom:16px">Copyright ©2021. All rights reserved.</a-layout-footer>
          </a-layout-footer>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import HeaderPublic from './partials/HeaderPublic'
import SiderBar from './partials/SiderBar.vue'

export default {
  name: 'MainLayout',
  components: {
    HeaderPublic,
    SiderBar
  },
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    changeCollapsed (newValue) {
      this.collapsed = newValue
    }
  }
}
</script>
<style lang="less" >
@import url("../../styles/global.less");

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  background-color: #ffffff;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 64px;
  border-bottom: 2px solid #DCDCDC;
}

</style>
