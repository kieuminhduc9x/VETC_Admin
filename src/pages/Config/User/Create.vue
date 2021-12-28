<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/config">Cấu hình</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Thêm mới tài khoản</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <form-account :isCreate="true" :isEdit="false"></form-account>
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
