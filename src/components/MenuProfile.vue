<template>
  <div>
    <a-menu mode="horizontal">
      <a-sub-menu key="1">
        <span slot="title" >
          <icon name="user-alt" size="18px" color="white" />
        </span>
        <a-menu-item key="profile:1">
          <router-link :to="{ name: 'profile' }">
            <a-icon type="profile" />
            <span>Hồ sơ</span>
          </router-link>
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
    </a-menu>
    <change-password v-if="visibleModalPassword === true" :visibleModalPassword="visibleModalPassword" @closeModal="closeModalPassword"></change-password>

  </div>
</template>
<script>
import ChangePassword from '@/components/ChangePassword'
export default {
  name: 'MenuProfile',
  components: {
    ChangePassword
  },
  data () {
    return {
      visibleModalPassword: false
    }
  },
  methods: {
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
@import url("../styles/index.less");

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
