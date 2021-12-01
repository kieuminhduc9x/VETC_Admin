<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Hồ Sơ</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-collapse v-model="activeTabs" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel v-if="userInfo" header="Thông tin tài khoản" key="1" class="profile-tab">
        <a-row>
          <a-col :xs="24">
            <p>Họ tên:</p> {{ userInfo.fullName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24">
            <p>Tài khoản:</p> {{ userInfo.userName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24">
            <p>Email:</p> {{ userInfo.email }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24">
            <p>Điện thoại:</p> {{ userInfo.cellphone }}
          </a-col>
        </a-row>
      </a-collapse-panel>
      <a-collapse-panel header="Dịch vụ" key="2">
      </a-collapse-panel>
    </a-collapse>
  </main-layout>
</template>
<script>
import MainLayout from '@/pages/layouts/MainLayout'

export default {
  name: 'Profile',
  components: {
    MainLayout
  },
  data () {
    return {
      activeTabs: [1, 2],
      userInfo: null
    }
  },
  mounted () {
    console.log(this.$store.getters)
    this.userInfo = this.$store.getters['auth/info'].user
  }
}
</script>
<style lang="less">
.profile-tab {
  .ant-collapse-content-box {
    padding: 10px;
  }
  .ant-col {
    display: flex;
    p {
      font-size: 14px;
      margin-right: 15px;
      font-weight: 600;
    }
  }
}
</style>
