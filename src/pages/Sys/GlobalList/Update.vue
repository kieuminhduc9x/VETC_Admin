<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item href="/">Home</a-breadcrumb-item>
        <a-breadcrumb-item><span @click="gotoList">Quản lý đối tác</span></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">{{ modelObject.name || '' }}</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <form-partner :partner-data="modelObject" v-if="modelObject && modelObject.partnerId"/>
  </main-layout>
</template>

<script>
import MainLayout from '../../layouts/MainLayout'
import FormPartner from '@/pages/Epc/Partner/FormPartner'
import { getPartner } from '@/api/partner'

export default {
  components: {
    FormPartner,
    MainLayout
  },
  beforeCreate () {
  },
  name: 'PartnerUpdate',
  data () {
    return {
      loading: false,
      isView: false,
      activeKey: 1,
      activeKey2: 1,
      activeKey3: 1,
      channelType: null,
      modelObject: {}

    }
  },
  computed: {},
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.loading = true
      getPartner({ partnerId: this.$route.params.partnerId }).then(res => {
        this.modelObject = res
        this.loading = false
      })
    },
    gotoList () {
      return this.$router.push({ name: 'partner' })
    }

  }
}
</script>
<style lang="less">

</style>
