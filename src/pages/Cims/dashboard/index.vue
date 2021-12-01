<template>
  <main-layout>

  </main-layout>
</template>
<script>
import MainLayout from '../../layouts/MainLayout'

export default {
  components: {
    MainLayout

  },
  name: 'Dashboard',
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
  },
  watch: {

  },
  created () {
  },
  methods: {

  }
}
</script>
<style lang="less">
.ant-select-selected-icon {
  border: 1px solid #dfdfdf !important;
}
.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected .ant-select-selected-icon, .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected:hover .ant-select-selected-icon {
  display: inline-block;
  color: #1890ff;
  background-color: #1890ff;
  z-index: 9999;
  font-weight: bold;
}

.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected .ant-select-selected-icon, .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected:hover .ant-select-selected-icon {
  display: inline-block;
  color: #e8e8e8;
  background-color: #1890ff;
  z-index: 9999;
  font-weight: bold;
}
</style>
