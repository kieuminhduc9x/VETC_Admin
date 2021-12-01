<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item href="/">Home</a-breadcrumb-item>
        <a-breadcrumb-item><span @click="gotoListg('businessPlan')">Kế hoạch doanh thu</span></a-breadcrumb-item>
        <a-breadcrumb-item><span :class="'active'">Tạo mới</span></a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <form-revenue
      @changeData="changeData"
      :edit-colums-props="editColums"
      :isDetail="false"
      :is-create="true"
      :data-row-new="dataRow"
      :columns-create-props="columnsCreate"
      :form-plan-props="formPlan"
      :loading-update="loading"/>
  </main-layout>
</template>

<script>
import MainLayout from '../../layouts/MainLayout'
import FormRevenue from './Form'

const columnsCreate = [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 50,
    align: 'center'
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: {
      customRender: 'rowIndex'
    },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Tỉnh',
    dataIndex: 'province',
    scopedSlots: { customRender: 'province' },
    align: 'left',
    width: 350
  }
]
export default {
  components: {
    MainLayout,
    FormRevenue
  },

  name: 'Create',
  data () {
    return {
      loading: false,
      isView: false,
      dataRow: [
        {
          province: 'sum',
          sumListProvince: 0
        }
      ],
      columnsCreate,
      editColums: [],
      formPlan: {
        planType: '1',
        planName: '',
        id: null,
        month: '',
        unitType: '1',
        quarter: '',
        year: ''
      },
      modelObject: {}
    }
  },
  methods: {
    changeData (data) {
      // this.dataRow = data
    }
  }
}
</script>
<style lang="less">

</style>
