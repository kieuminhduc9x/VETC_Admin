<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/config">Cấu hình</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/config/user-management">Tài khoản</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Cập nhật tài khoản</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <form-account :isCreate="false" :isEdit="true"></form-account>
  </main-layout>
</template>
<script>
import FormAccount from './Form'
import MainLayout from '@/pages/layouts/MainLayout'
export default {
  components: {
    FormAccount,
    MainLayout
  }
}
</script>
