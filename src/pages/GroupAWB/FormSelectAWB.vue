<template>
  <div>
    <a-card >
      <a-row :gutter="16" type="flex">
        <a-col :xs="24" :sm="12" :md="4">
          <a-form-model-item label="Mã vận đơn:" style="display: flex">
            {{ awbObj.orderId }}
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="4">
          <a-form-model-item label="Khối lượng:" style="display: flex">
            {{ awbObj.weight }}
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" type="flex">
        <a-col :xs="24" :sm="12" :md="4">
          <a-form-model-item label="Từ Tỉnh/TP:" style="display: flex">
            {{ awbObj.fromProvinceName }}
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="4">
          <a-form-model-item label="Đến Tỉnh/TP:" style="display: flex">
            {{ awbObj.toProvinceName }}
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row style="padding-bottom: 10px" >

        <a-col :span="24" class="cus-flex-center">
          <a-button
            :disabled="selectedRowKeys.length === 0"
            :loading="loading"
            class="ant-btn ant-btn-primary"
            :style="{marginLeft: '8px'}"
            @click="groupAwb">
            Gộp vào AWB
          </a-button>

        </a-col>
      </a-row>
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Chọn vận đơn hàng không" key="1">
          <a-row :gutter="16" type="flex">
            <a-col :span="24">
              <div class="wrapper1">
                <div class="div1"></div>
              </div>
              <a-table
                :columns="columns"
                :data-source="data"
                :rowKey=" (rowKey, index ) => index"
                :pagination="data.length === 0 ? false : pagination"
                :loading="loading"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                :row-selection="{ type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                class="ant-table-bordered">
                <AwbOrderTable slot="expandedRowRender" slot-scope="text" v-if="text.orderMergeId" :data-source="text" :show-shipper="false"></AwbOrderTable>

              </a-table>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { GetOrderMergeNotYetTransferPlane, AddToOrderMerge } from '@/api/order'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../utils/table-empty-text'
import columns from './columnSelectAwb'
import AwbOrderTable from './_AWBOrderTable'
import _merge from 'lodash/merge'
const ResizeableTitle = resizeableTitle(columns)

export default {
  name: 'FormSelectAwb',
  props: {
    awbObj: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    AwbOrderTable
  },
  mixins: [TableEmptyText],
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      data: [],
      activeSearchKey: '1',
      selectedRowKeys: [],
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      visibleForm: false,
      pagination: {
        current: 1,
        total: 1,
        pageSize: 15,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      loading: false,
      columns,
      orderData: [],
      confirmLoading: false,
      moment,
      endOpen: false,
      rules: {
        flightId: [
          { required: true, message: 'Chuyến bay không được phép để trống' }
        ]
      },
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ],
      awbSelected: null
    }
  },
  created () {
    this.fetchAWBNotYetTransferPlane()
  },
  computed: {
    awbWeight () {
      return this.awbObj.listOrder.map(item => item.weight).reduce((total, item) => (total + item))
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },

    handleCancel () {
      this.$emit('closePopup')
    },
    handleCancelReload () {
      this.$emit('closePopupReload')
    },
    fetchAWBNotYetTransferPlane () {
      const params = {
        toProvince: this.awbObj.toProvince,
        flightCode: this.awbObj.flightCode
      }
      this.loading = true
      this.data = []
      GetOrderMergeNotYetTransferPlane(params).then(res => {
        this.data = res.data
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
      }).finally(res => {
        this.loading = false
      })
    },
    groupAwb () {
      if (this.selectedRowKeys.length === 0) return
      this.awbSelected = this.selectedRowKeys[0]
      const params = {
        orderMergeId: this.data[this.awbSelected].orderMergeId,
        orderId: this.awbObj.orderId
      }
      this.loading = true
      AddToOrderMerge(params).then(res => {
        this.loading = false
        this.$notification.success({
          message: 'Gộp vào AWB',
          description:
              'Gộp vào AWB thành công',
          duration: 5
        })
        this.$emit('closePopupReload')
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
      }).finally(res => {
        this.loading = false
      })
    }

  }
}
</script>

<style scoped>

</style>
