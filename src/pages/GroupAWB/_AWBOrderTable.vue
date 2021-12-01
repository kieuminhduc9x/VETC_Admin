<template>
  <div>

    <a-row :gutter="16" type="flex">
      <a-col :span="24">
        <div class="wrapper1">
          <div class="div1"></div>
        </div>
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="false"
          :rowKey=" (rowKey, index ) => index"
        >
          <template slot="rowIndex" slot-scope="text, record, index"> {{ index + 1 }}</template>
          <template slot="operation" slot-scope="text, record">
            <div>

              <span
                @click="removeOrder(record)"
                class="vna-link"
                style="cursor: pointer">
                <span>Xóa</span>
              </span>
            </div>
          </template>
        </a-table>
      </a-col>
    </a-row>

    <a-modal
      :destroyOnClose="true"
      :maskClosable="false"
      v-model="modalRemoveOrder"
      title="Loại bỏ đơn hàng"
      centered
      @ok="onHandleRemoveOrder"
    >
      <a-form-model
        :model="removeOrderObj"
        :rules="rules"
        @submit="onHandleRemoveOrder"
        ref="ruleForm">

        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-model-item
              label="Lý do"
              prop="reason">
              <a-input v-model="removeOrderObj.reason"/>
            </a-form-model-item>
          </a-col>
        </a-row>

      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import columns from './columnSelectAwbOrder'
import columnsNoShipper from './columnSelectAwbOrderNoShipper'
import {
  GetByOrderMerge,
  RemoveOrder
} from '@/api/order'
import resizeableTitle from '@/utils/resizable-columns'
import moment from 'moment'
import _cloneDeep from 'lodash/cloneDeep'
const ResizeableTitle = resizeableTitle(columns)

export default {
  name: 'AwbOrderTable',
  props: {
    dataSource: {
      type: Object,
      required: true
    },
    showShipper: {
      type: Boolean,
      default: true
    },
    showAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      moment,
      data: [],
      loading: false,
      fetching: false,
      removeOrderObj: {
        reason: null,
        orderMergeId: null,
        orderId: null
      },
      modalRemoveOrder: false,

      rules: {
        reason: [
          { required: true, message: 'Lý do không được phép trống', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    columns () {
      const columnTmp = this.showShipper ? _cloneDeep(columns) : _cloneDeep(columnsNoShipper)
      if (!this.showAction) {
        columnTmp.pop()
      }
      return columnTmp
    }
  },
  watch: {

  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      GetByOrderMerge({ orderMergeId: this.dataSource.orderMergeId }).then(res => {
        this.data = res
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
    onTrim (string) {
      return string.trim()
    },
    onHandleRemoveOrder () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const $this = this
          $this.$confirm({
            title: 'Bạn chắc chắn muốn loại bỏ đơn hàng này?',
            onOk () {
              RemoveOrder($this.removeOrderObj).then(res => {
                $this.modalRemoveOrder = false
                $this.fetchData()
                $this.$emit('removeOrderDone', { orderMergeId: $this.dataSource.orderMergeId })
                this.$notification.success({
                  message: 'Loại bỏ đơn hàng',
                  description:
                      'Loại bỏ đơn hàng thành công',
                  duration: 5
                })
              })
            }
          })
        }
      })
    },
    removeOrder (record) {
      this.modalRemoveOrder = true
      this.removeOrderObj.orderMergeId = this.dataSource.orderMergeId
      this.removeOrderObj.orderId = record.orderId
    }
  }
}
</script>
