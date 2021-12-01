<template>
  <a-layout-header class="header">
    <div class="head-logo">
      <router-link :to="{ name: 'dashboard' }">
        <img src="@/assets/vna.png" alt="VNA">
      </router-link>
      <div class="headline">{{ $t('AppName') }}</div>
    </div>

    <div class="head-menu">
      <a-menu mode="horizontal">
        <a-sub-menu key="3">
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="user" :style="{ fontSize: '16px'}" />
            <!--{{ currentUser !== undefined && currentUser.fullName !== undefined ? currentUser.fullName : 'Nguyen Van A' }}-->
          </span>
          <!--          <a-menu-item key="profile:1">-->
          <!--            <router-link :to="{ name: 'profile' }">-->
          <!--              <a-icon type="profile" />-->
          <!--              <span>Hồ sơ</span>-->
          <!--            </router-link>-->
          <!--          </a-menu-item>-->
          <!--          <a-menu-item key="profile:3">-->
          <!--            <a href="#" aria-current="page" class="router-link-exact-active router-link-active" @click.prevent="openSelectHub">-->
          <!--              <a-icon type="profile" />-->
          <!--              <span>Danh sách HUB làm việc</span>-->
          <!--            </a>-->
          <!--          </a-menu-item>-->
          <a-menu-item key="profile:5">
            <a href="#" aria-current="page" class="router-link-exact-active router-link-active" @click.prevent="openSelectStore">
              <a-icon type="profile" />
              <span>Chọn kho làm việc</span>
            </a>
          </a-menu-item>
          <a-menu-item key="profile:4">
            <a href="#" aria-current="page" class="router-link-exact-active router-link-active" @click.prevent="showModalPassword">
              <a-icon type="profile" />
              <span>Đổi mật khẩu</span>
            </a>
          </a-menu-item>
          <a-menu-item key="profile:2">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>Thoát</span>
            </a>
          </a-menu-item>
        </a-sub-menu>
        <!--        <a-sub-menu key="2">-->
        <!--          <span slot="title" class="submenu-title-wrapper">-->
        <!--            <a-icon type="setting" :style="{ fontSize: '16px'}" />-->
        <!--          </span>-->
        <!--          <a-menu-item-group title="Cấu hình">-->
        <!--            <a-menu-item key="setting:1" v-if="hasMenuPermission('settings_global_params')">-->
        <!--              <router-link :to="{ name: 'settings_global_params' }">-->
        <!--                <a-icon type="sliders" />-->
        <!--                <span>Tham Số Hệ Thống</span>-->
        <!--              </router-link>-->
        <!--            </a-menu-item>-->
        <!--            <a-menu-item key="setting:1_1">-->
        <!--              <router-link :to="{ name: 'settings_global_list' }">-->
        <!--                <a-icon type="ordered-list" />-->
        <!--                <span>Danh Mục Dùng Chung</span>-->
        <!--              </router-link>-->
        <!--            </a-menu-item>-->
        <!--          </a-menu-item-group>-->
        <!--        </a-sub-menu>-->
        <!-- <a-menu-item key="1">
          <a-icon type="notification" />
        </a-menu-item> -->
        <!-- <notice-icon class="action" /> -->

        <!--      </a-menu>-->
        <!--    </div>-->
      </a-menu>
    </div>
    <div>
      <change-password v-if="visibleModalPassword === true" :visibleModalPassword="visibleModalPassword" @closeModal="closeModalPassword"></change-password>
    </div>
  </a-layout-header>

</template>

<script>
import { commonMethods } from '@/store/helpers'
import ChangePassword from '@/components/ChangePassword'

export default {
  name: 'Header',
  props: {
    collapsed: Boolean
  },
  components: {
    ChangePassword
  },
  data () {
    return {
      collapsedTmp: this.collapsed,
      visibleModalPassword: false
    }
  },
  computed: {
  },
  methods: {
    ...commonMethods,
    handleLogout () {
      this.$confirm({
        title: 'Đăng xuất khỏi hệ thống?',
        okText: this.$t('Đăng xuất'),
        cancelText: this.$t('Hủy'),
        onOk: () => {
          this.$auth.logOut({})
        },
        onCancel () {}
      })
    },
    changeCollapsed () {
      this.collapsedTmp = !this.collapsedTmp
      this.$emit('collapsed-changed', this.collapsedTmp)
    },
    // openSelectHub () {
    //   this.updateSelectHub(true)
    // },
    openSelectStore () {
      this.updateSelectStore(true)
    },
    showModalPassword () {
      this.visibleModalPassword = true
    },
    closeModalPassword () {
      this.visibleModalPassword = false
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
    height: 40px !important;
  }
}
</style>
