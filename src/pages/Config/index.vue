<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Cấu hình</a-breadcrumb-item>
      </a-breadcrumb>

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
