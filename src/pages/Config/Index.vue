<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Cấu hình</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <template>
      <div style="padding: 2rem">
        <a-card style="border: none; padding: 2rem">
          <a-row :gutter="16">
            <a-col :xs="24" :md="8" :lg="8">
              <router-link :to="{name: 'config.account'}">
                <div class="box-menu" style="display: flex; justify-items: flex-start">
                  <div class="box-image">
                    <div class="option-imgage">
                      <icon name="user-cog" width="20px" height="20px"></icon>
                    </div>
                  </div>
                  <div class="title-content">
                    <h4 style="color: #076885; font-weight: bold">Tài khoản</h4>
                    <p style="color: grey">Quản lý tài khoản, nhóm tài khoản, phân quyền</p>
                  </div>
                </div>
              </router-link>
            </a-col>
            <!--            <a-col :xs="24" :md="8" :lg="8">-->
            <!--              <router-link :to="{name: 'config'}">-->
            <!--                <div class="box-menu" style="display: flex; justify-items: flex-start">-->
            <!--                  <div class="box-image">-->
            <!--                    <div class="option-imgage">-->
            <!--                      <icon name="settings" width="20px" height="20px"></icon>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div class="title-content">-->
            <!--                    <h4 style="color: #076885; font-weight: bold">Cài đặt chung</h4>-->
            <!--                    <p style="color: grey">Cấu hình thông tin chung cửa hàng của bạn</p>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </router-link>-->
            <!--            </a-col>-->
            <a-col :xs="24" :md="8" :lg="8">
              <router-link :to="{name: 'config.roles'}">
                <div class="box-menu" style="display: flex; justify-items: flex-start">
                  <div class="box-image">
                    <div class="option-imgage">
                      <icon name="users-cog" width="20px" height="20px"></icon>
                    </div>
                  </div>
                  <div class="title-content">
                    <h4 style="color: #076885; font-weight: bold">Nhóm tài khoản</h4>
                    <p style="color: grey">Quản lý nhóm quyền tài khoản</p>
                  </div>
                </div>
              </router-link>
            </a-col>
          </a-row>
        </a-card>
      </div>
    </template>
  </main-layout>
</template>
<script>
import MainLayout from '@/pages/layouts/MainLayout'

export default {
  components: {
    MainLayout
  }
}
</script>
<style type="text/css">

</style>
