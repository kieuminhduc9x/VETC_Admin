<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/" @click.prevent="gotoList">Danh mục Hub</a></a-breadcrumb-item>

        <a-breadcrumb-item :class="'active'">Cập nhật Hub</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-collapse v-model="activeKey" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel header="Cập nhật Hub" key="1">
        <form-hub :is-editable="true" :is-view="false" :is-create="false"></form-hub>
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
  name: 'UpdateHub',
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
