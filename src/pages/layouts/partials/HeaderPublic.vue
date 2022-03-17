<template>
  <a-layout-header class="header-public">
    <div class="head-logo">
      <router-link :to="{ name: 'dashboard' }">
        <img src="@/assets/vetc.png" alt="VETC">
      </router-link>
    </div>
  </a-layout-header>
</template>

<script>
import { commonMethods } from '@/store/helpers'

export default {
  name: 'HeaderPublic',
  props: {
    collapsed: Boolean
  },
  components: {
  },
  data () {
    return {
      collapsedTmp: this.collapsed
    }
  },
  computed: {
  },
  methods: {
    ...commonMethods,
    changeCollapsed () {
      this.collapsedTmp = !this.collapsedTmp
      this.$emit('collapsed-changed', this.collapsedTmp)
    }
  }
}
</script>

<style lang="less">
@import url("../../../styles/index.less");

.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
.head-logo {
  img {
    height: 60px !important;
  }
}
.ant-layout-header {
  height: 75px!important;
}
</style>
