<template>
  <a-layout-sider
    collapsible
    v-model="collapsed"
    @collapse="showSidebar"
    width="270"
    collapsedWidth="40"
    style="max-width: 300px !important;padding-top: 5px"
  >
    <!-- <div class="logo">
      <img src="@/assets/viettel_logo.jpg" alt="Viettel">
    </div> -->
    <div
      class="ant-layout-sider-trigger sider--top cl-sider--top"
      style="width: 40px;"
      @click="() => {collapsed = !collapsed; showSidebar()}"><i
        aria-label="icon: right"
        class="anticon anticon-left"
        id="icon-siderbar">
        <svg
          viewBox="64 64 896 896"
          data-icon="left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="false"
          focusable="false"
          class="">
          <path
            d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
        </svg>
      </i></div>
    <a-menu
      mode="inline"
      class="ant-menu_1"
      :defaultSelectedKeys="[currentKey]"
      :selected-keys="[currentKey]"
      :default-open-keys="[openKeys]"
      :style="{ height: '100%', borderRight: 0, paddingTop: '0', }"
    >
      <a-sub-menu key="4">
        <a slot="title"><icon name="book" width="24px" height="24px" style="margin-right: 10px"></icon><span class="title-menu">Quản trị hệ thống</span></a>
        <a-menu-item key="4_1" >
          <router-link :to="{ name: 'account' }" class="title-menu">
            <span>Tài khoản</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_2" >
          <router-link :to="{ name: 'permission' }" class="title-menu">
            <span>Phân quyền</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_3" >
          <router-link :to="{ name: 'category' }" class="title-menu">
            <span>Danh mục</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="3" >
        <router-link :to="{ name: 'giam_sat' }" class="title-menu">
          <a-icon type="appstore" />
          <span>Giám sát</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="2" >
        <router-link :to="{ name: 'hau_kiem' }" class="title-menu">
          <a-icon type="project" />
          <span>Hậu kiểm</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideBar',
  data () {
    return {
      collapsed: true
    }
  },
  computed: {
    ...mapGetters('permission', ['addRouters']),
    currentKey: function () {
      let idx = '0'
      let routeName = this.$router.currentRoute.name
      const fromSource = this.$route.query.from
      if (fromSource) {
        routeName = fromSource
      }
      switch (routeName) {
        case 'dashboard':
          idx = '1'
          break
        case 'hau_kiem':
          idx = '2'
          break
        case 'giam_sat':
          idx = '3'
          break
        case 'account':
          idx = '4_1'
          break
        case 'permission':
          idx = '4_2'
          break
        case 'category':
          idx = '4_3'
          break
      }

      return idx
    },
    openKeys: function () {
      let k = '0'
      switch (this.$router.currentRoute.name) {
        case 'dashboard':
          k = '1'
          break
        case 'hau_kiem':
          k = '2'
          break
        case 'giam_sat':
          k = '3'
          break
        case 'account':
        case 'permission':
        case 'category':
          k = '4'
          break
        case 'scan_device_management':
          k = '5'
          break
        case 'config':
        case 'config.create':
        case 'config.update':
        case 'role_management':
          k = '6'
          break
        default:
          k = '0'
      }
      return k
    }
  },
  mounted () {
  },
  methods: {
    hasPermission (routeName) {
      /*
      if (!this.addRouters) return false
      const flag = this.addRouters.filter(item => item.name === permission)
      if (flag.length > 0) {
        return true
      }
      return true
      */
      return this.hasMenuPermission(routeName)
    },
    hasPermissions (routeNames) {
      const $this = this
      let ok = true
      routeNames.forEach(function (routeName) {
        if ($this.hasPermission(routeName) === false) {
          ok = false
        }
      })
      return ok
    },
    hasAnyPermissions (paths) {
      const $this = this
      let ok = false
      paths.forEach(function (path) {
        if ($this.hasPermission(path) === true) {
          ok = true
        }
      })
      return ok
    },
    showSidebar () {
      if (this.collapsed === true) {
        document.getElementsByClassName('sider--top')[0].style.width = '40px'
        document.getElementById('icon-siderbar').style.transform = 'rotate(180deg)'
      } else {
        document.getElementsByClassName('sider--top')[0].style.width = '270px'
        document.getElementById('icon-siderbar').style.transform = 'rotate(0deg)'
      }
    }
  }
}
</script>
<style>
.ant-layout-sider-children {
  overflow: hidden;
}

.sider--top {
  top: 0 !important;
  position: absolute !important;
}

.ant-menu_1 {
  margin-top: 40px !important;

}

.cl-sider--top {
  background-color: rgba(7, 129, 178, 0.16) !important;
}
.ant-menu-sub.ant-menu-inline .ant-menu-item-group-title {
  padding-left: 15px !important;
}
.ant-menu-sub.ant-menu-inline .ant-menu-item > a {
  height: auto !important;
  line-height: normal;
}
.title-menu{
  font-size: 16px!important;
  font-weight: 400!important;
}
.icon-menu {
  font-size: 24px!important;
}
</style>
