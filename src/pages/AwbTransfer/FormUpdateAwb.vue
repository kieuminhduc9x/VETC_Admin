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
        @submit="onSave">
        <a-row :gutter="24">
          <a-col :xs="24" :lg="12">
            <a-form-model-item label="Từ Tỉnh/TP:">
              {{ awbObj.fromProvinceName }}
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :lg="12">
            <a-form-model-item label="Đến Tỉnh/TP:">
              {{ awbObj.toProvinceName }}
            </a-form-model-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xs="24" :lg="12">
            <a-form-model-item label="Ngày chọn chuyến bay:" prop="flightDate">
              <a-date-picker
                v-model="formSubmit.flightDate"
                placeholder="dd/mm/yyyy"
                @change="onChangeDate"
                :disabled-date="disabledDate"
                format="DD/MM/YYYY"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :lg="12">
            <a-form-model-item prop="flightId" label="Chuyến bay:">
              <a-select
                :filter-option="filterSelectOption"
                :allowClear="true"
                show-search
                style="width: 100%;color: #000c17!important;"
                v-model="formSubmit.flightId"
              >
                <a-select-option
                  v-for="item in listFlight"
                  :key="'p-g-' + item.flightId"
                  :value="item.flightId">{{ item.flightCode + ' - ' + item.takeOffTime }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :xs="24" :lg="12">
            <a-form-model-item label="Số lượng đơn:">
              {{ listOrder.length }}
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :lg="12">
            <a-form-model-item label="Tổng khối lượng:">
              {{ awbWeight }}
            </a-form-model-item>
          </a-col>

        </a-row>
      </a-form-model>
      <a-row :gutter="24" type="flex" justify="space-around" align="middle">
        <a-col
          :xs="24"
          :md="24"
          :lg="24"
          style=" margin-top: 0.5rem;margin-bottom:1.5rem;display:flex;justify-content:center">
          <a-button @click="handleCancelReload" style="margin-left: 1rem; min-width:120px"> Đóng</a-button>
          <a-button @click="onSave" type="primary" style="min-width:120px">Lưu</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { GetFlightToMerge, GetByOrderMerge, OrderMergeUpdateFlight } from '@/api/order'
export default {
  name: 'FormGroup',
  props: {
    awbObj: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      visibleForm: false,
      loading: false,
      confirmLoading: false,
      showBtnReceivedAtFirst: false,
      showBtnMoveFlight: false,
      formSubmit: {
        flightDate: null,
        flightDateString: null,
        flightDateDisplay: null,
        flightId: ''
      },
      moment,
      endOpen: false,
      rules: {
        flightId: [
          { required: true, message: 'Chuyến bay không được phép để trống' }
        ],
        flightDate: [
          { required: true, message: 'Ngày chọn chuyến bay không được phép để trống' }
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
      listFlight: [],
      listOrder: []

    }
  },
  created () {
  },
  mounted () {
    this.fetchOrder()
  },
  computed: {
    awbWeight () {
      if (this.listOrder.length === 0) return 0
      return this.listOrder.map(item => item.weight).reduce((total, item) => (total + item))
    }
  },
  methods: {
    fetchOrder () {
      this.loading = true
      GetByOrderMerge({ orderMergeId: this.awbObj.orderMergeId }).then(res => {
        this.listOrder = res
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
    disabledDate (current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },

    onChangeDate (date, dateString) {
      this.formSubmit.flightDateString = date.format('YYYY-MM-DD')
      this.formSubmit.flightDateDisplay = date.format('DD/MM/YYYY')
      this.listFlight = []
      this.fetchFlight()
    },

    onSave (e) {
      e.preventDefault()
      const that = this
      that.$refs.acceptForm.validate(valid => {
        if (valid) {
          const $this = this
          $this.$confirm({
            title: 'Bạn chắc chắn muốn cập nhật AWB ?',
            onOk () {
              $this.doSave()
            },
            onCancel () {
            }
          })
        }
      })
    },
    doSave () {
      const params = {
        flightId: this.formSubmit.flightId,
        orderMergeId: this.awbObj.orderMergeId
      }
      this.loading = true
      this.listFlight = []
      OrderMergeUpdateFlight(params).then(res => {
        this.loading = false
        this.$notification.success({
          message: '',
          description:
              'Cập nhật AWB thành công',
          duration: 5
        })
        this.handleCancelReload()
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
    handleCancel () {
      this.$emit('closePopup')
    },
    handleCancelReload () {
      this.$emit('closePopupReload')
    },
    fetchFlight () {
      const params = {
        date: this.formSubmit.flightDateString,
        flightScheduleId: this.awbObj.flightScheduleId,
        fromProvince: this.awbObj.fromProvince,
        toProvince: this.awbObj.toProvince
      }
      this.loading = true
      this.listFlight = []
      GetFlightToMerge(params).then(res => {
        this.listFlight = res
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
    }

  }
}
</script>

<style scoped>

</style>
