<template>
  <a-card style="width: 100%;border: none" class="search-container" >
    <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel header="Thông tin" key="1">
        <a-card style="width: 100%;border: none" class="search-container" >
          <a-row :gutter="16" type="flex" justify="center">
            <a-col :xs="24" :md="10"><strong>Mã Xã/Phường:</strong> {{ areaSelected.precinctCode }}</a-col>
            <a-col :xs="24" :md="14"><strong>Tên Xã/Phường:</strong> {{ areaSelected.precinctName }}</a-col>
          </a-row>
          <a-row :gutter="16" type="flex" justify="center" style="margin-top: 20px">
            <a-col :xs="24" :md="24"><strong>Địa chỉ chi tiết:</strong> {{ areaSelected.fullName }}</a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>

  </a-card>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'

export default {
  components: {
    MainLayout
  },
  props: {
    areaSelected: {
      type: Object,
      required: true
    }
  },
  name: 'PrecinctInfo',
  data () {
    return {
      activeSearchKey: 1,
      activeResultKey: 1,
      expandedRowKeys: [],

      loading: false,
      rules: {},
      endOpen: false,
      visible: false,
      confirmLoading: false
    }
  },
  created () {
  }

}
</script>
