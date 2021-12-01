<template>
  <div>
    <a-card >
      <a-form-model
        layout="horizontal"
        ref="acceptForm"
        :colon="false"
        :model="formSubmit"
        :loading="loading"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
        :rules="rules"
        @submit="handleOk">
        <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
          <a-collapse-panel header="Thông tin hiện tại" key="1">
            <a-row :gutter="16" type="flex">
              <a-col :xs="24" :md="12">
                <a-form-model-item label="Mã vận đơn:" style="display: flex">
                  {{ awbObj.orderId }}
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-model-item label="Khung giờ bay:" style="display: flex">
                  {{ awbObj.flightTimeFrame }}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16" type="flex">
              <a-col :xs="24" :md="12">
                <a-form-model-item label="Từ Tỉnh/TP:" style="display: flex">
                  {{ awbObj.fromProvinceName }}
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-model-item label="Đến Tỉnh/TP:" style="display: flex">
                  {{ awbObj.toProvinceName }}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16" type="flex">
              <a-col :xs="24" :md="12">
                <a-form-model-item label="Loại hàng:" style="display: flex">
                  {{ awbObj.productTypeName }}
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-model-item label="Khối lượng:" style="display: flex">
                  {{ awbObj.weight }}
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
        <a-row style="padding-bottom: 10px" >

          <a-col :span="24" class="cus-flex-center">
            <h2><strong>Tổng tiền: {{ awbObj.weight }}</strong></h2>

          </a-col>
        </a-row>
        <a-collapse v-model="activeResultKey" expandIconPosition="left" class="collapse-left">
          <a-collapse-panel header="Cập nhật thông tin" key="1">
            <a-row style="padding-bottom: 10px" >
              <a-col :xs="24" :lg="12">
                <a-form-model-item prop="weight" label="Khối lượng(Kg):">
                  <a-input-number
                    v-model="formSubmit.weight"
                    :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
        <a-row :gutter="16">
          <a-col
            :xs="24"
            :md="24"
            :lg="24"
            class="filter-item-container"
            style="display: flex;flex-wrap: wrap; margin-top: 17px; justify-content: center">
            <a-button
              @click="handleCancel"
              style=" min-width:120px">Đóng</a-button>
            <a-button
              type="primary"
              style="margin-left: 1rem;"
              @click="handleOk"
              :loading="loading">Lưu</a-button>

          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { UpdateWeight } from '@/api/order'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../utils/table-empty-text'
import columns from './columnSelectAwb'
import AwbOrderTable from './_AWBOrderTable'
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
      activeSearchKey: 1,
      activeResultKey: 1,
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
        weight: [
          { required: true, message: 'Khối lượng(Kg) không được phép để trống' }
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
      awbSelected: null,
      formSubmit: {
        weight: this.awbObj.weight
      }
    }
  },
  created () {
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
      this.$emit('closePopup', false)
    },
    handleCancelReload () {
      this.$emit('closePopup', true)
    },
    handleOk (e) {
      e.preventDefault()
      const that = this
      that.$refs.acceptForm.validate(valid => {
        if (valid) {
          that.doOk()
        }
      })
    },
    doOk () {
      const params = {
        orderId: this.awbObj.orderId,
        newWeight: this.formSubmit.weight
      }
      this.loading = true
      this.listFlight = []
      UpdateWeight(params).then(res => {
        this.loading = false
        this.$notification.success({
          message: 'Cập nhật khối lượng',
          description:
              'Cập nhật khối lượng thành công',
          duration: 5
        })
        this.$emit('closePopup', true)
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
