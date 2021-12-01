<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item href="/">Home</a-breadcrumb-item>
        <a-breadcrumb-item><span @click="gotoListg('businessPlan')">Kế hoạch doanh thu</span></a-breadcrumb-item>
        <a-breadcrumb-item><span :class="'active'">Cập nhật</span></a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <form-revenue
      :data-row-new="dataRow"
      :edit-colums-props="editColums"
      :loading-update="loading"
      :isDetail="false"
      :is-update="true"
      :columns-create-props="columnsCreate"
      :form-plan-props="formPlan"
    />
  </main-layout>
</template>

<script>
import MainLayout from '../../layouts/MainLayout'
import FormRevenue from './Form'
import { findByIdRevenuePlane } from '@/api/businessPlan'

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
    width: 50
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
      modelObject: {},
      dataRow: [
        {
          province: 'sum',
          sumListProvince: 0
        }
      ],
      formPlan: {
        planType: '1',
        planName: '',
        id: null,
        month: '',
        quarter: '',
        year: ''
      },
      columnsCreate,
      editColums: []
    }
  },
  computed: {},
  created () {
    this.findById()
  },
  methods: {
    findById () {
      const that = this
      this.loading = true
      const params = {
        revenuePlanId: this.$route.params.businessId
      }
      findByIdRevenuePlane(params).then(res => {
        if (res) {
          let lstData = []
          const data = []
          this.editColums = []
          this.columnsCreate = [
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
              width: 200
            }
          ]
          this.formPlan = {
            id: res.revenuePlanId,
            planName: res.planName,
            planCode: res.planCode,
            month: res.month,
            quarter: res.quarter,
            unitType: res.unitType,
            planType: res.planType,
            year: res.year
          }
          this.editColums = res.lstProductCode.map((item, index) => {
            return {
              title: item.productCode,
              operation: 'operation',
              actionTitle: 'actionTitle',
              dataIndex: item.productId,
              scopedSlots: { customRender: item.productId },
              align: 'center',
              width: 100
            }
          })
          this.editColums.forEach(item => {
            this.columnsCreate.push(item)
          })
          this.columnsCreate = this.columnsCreate.concat([
            {
              title: 'Tổng Tiền',
              dataIndex: 'sumListProvince',
              scopedSlots: {
                customRender: 'sumListProvince'
              },
              align: 'center',
              ellipsis: true,
              width: 80
            }
          ])
          res.lstRevenuePlanDetail.forEach((item, index) => {
            lstData = item.lstRevenueProduct.map(subItem => {
              subItem[subItem.productId] = subItem.revenue
              subItem['province'] = item.province
              return subItem
            })
            data.push(lstData)
          })
          // const dataTable = []
          data.forEach((item, index) => {
            Object.assign(...item)
            item[0]['sumListProvince'] = 0
            for (const col in item[0]) {
              if (item[0].hasOwnProperty(col)) {
                if (['rowIndex', 'province', 'operation', 'sumListProvince', 'productId', 'revenue'].indexOf(col) === -1) {
                  if (!this.dataRow[0][col]) {
                    this.dataRow[0][col] = 0
                  }
                  item[0]['sumListProvince'] += Number(item[0][col])
                  this.dataRow[0][col] += Number(item[0][col])
                }
              }
            }
            this.dataRow.push(item[0])
          })
          let totalAll = 0
          for (const p in this.dataRow[0]) {
            if (this.dataRow[0].hasOwnProperty(p) && ['province', 'sumListProvince'].indexOf(p) === -1) {
              totalAll += Number(this.dataRow[0][p])
            }
          }
          this.dataRow[0]['sumListProvince'] = totalAll
        }
      }).catch(err => {
        const msg = that.handleApiError(err)
        that.$error({ content: msg })
      }).finally(res => {
        that.loading = false
      })
    }

  }
}
</script>
<style lang="less">

</style>
