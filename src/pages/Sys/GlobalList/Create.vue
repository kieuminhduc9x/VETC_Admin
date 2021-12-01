<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item href="/">Home</a-breadcrumb-item>
        <a-breadcrumb-item><span @click="gotoList">Quản lý đối tác</span></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Tạo mới đối tác</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <form-partner :partner-data="modelObject"/>

  </main-layout>

</template>

<script>
import MainLayout from '../../layouts/MainLayout'
import FormPartner from '@/pages/Epc/Partner/FormPartner'

export default {
  components: {
    FormPartner,
    MainLayout
  },

  name: 'CreatePartner',
  data () {
    return {
      modelObject: {}
    }
  },
  computed: {},

  methods: {

    gotoList () {
      return this.$router.push({ name: 'partner' })
    }

  }
}
</script>
<style lang="less">

</style>
