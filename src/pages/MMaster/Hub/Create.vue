<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/" @click.prevent="gotoList">Danh mục Hub</a></a-breadcrumb-item>

        <a-breadcrumb-item :class="'active'">Thêm mới Hub</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-collapse v-model="activeKey" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel header="Thêm mới Hub" key="1">
        <form-hub :is-editable="false" :is-view="false" :is-create="true"></form-hub>
      </a-collapse-panel>
    </a-collapse>
  </main-layout>
</template>
<script>
import MainLayout from '@/pages/layouts/MainLayout'
import Form from './Form'

export default {
  components: {
    MainLayout,
    FormHub: Form
  },
  name: 'CreateHub',
  data () {
    return {
      activeKey: '1'
    }
  },
  methods: {
    gotoList () {
      this.$router.push({ name: 'hub' })
    }
  }
}
</script>
