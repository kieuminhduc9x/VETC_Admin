<template>
  <div>
    <div v-if="awbObj.listOrder && !awbCode">
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
          <a-row :gutter="24">
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Từ Tỉnh/TP:">
                {{ awbObj.fromProvince.provinceName }}
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Đến Tỉnh/TP:">
                {{ awbObj.toProvince.provinceName }}
              </a-form-model-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">
            <a-col :xs="24" :lg="12">
              <a-form-model-item prop="flightDate" label="Ngày chọn chuyến bay:" >
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
                {{ awbObj.listOrder.length }}
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Tổng khối lượng:">
                {{ awbWeight }}
              </a-form-model-item>
            </a-col>

          </a-row>
        </a-form-model>
      </a-card>
      <a-row :gutter="24" type="flex" justify="space-around" align="middle">
        <a-col
          :xs="24"
          :md="24"
          :lg="24"
          style=" margin-top: 0.5rem;margin-bottom:1.5rem;display:flex;justify-content:center">

          <a-button @click="handleOk" type="primary" style="margin-left: 1rem; min-width:120px">Tạo đơn gộp</a-button>
          <a-button @click="handleCancel" style="margin-left: 1rem; min-width:120px"> Quay lại</a-button>

        </a-col>
      </a-row>
    </div>
    <!-- gop awb thanh cong. show dialog chuyen tau bay -->
    <div v-if="awbCode">
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
          <a-row :gutter="24">
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Mã AWB:">
                {{ awbCodeText }}
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Ngày AWB:">
                {{ awbDate }}
              </a-form-model-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Từ Tỉnh/TP:">
                {{ awbObj.fromProvince.provinceName }}
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Đến Tỉnh/TP:">
                {{ awbObj.toProvince.provinceName }}
              </a-form-model-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Ngày chọn chuyến bay:">
                {{ formSubmit.flightDateDisplay }}
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Chuyến bay:">
                {{ awbObj.flightTimeFrame }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Số lượng đơn:">
                {{ awbObj.listOrder.length }}
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12">
              <a-form-model-item label="Tổng khối lượng:">
                {{ awbWeight }}
              </a-form-model-item>
            </a-col>

          </a-row>
        </a-form-model>
      </a-card>
      <a-row :gutter="24" type="flex" justify="space-around" align="middle">
        <a-col
          :xs="24"
          :md="24"
          :lg="24"
          style=" margin-top: 0.5rem;margin-bottom:1.5rem;display:flex;justify-content:center">
          <a-button @click="handleCancelReload" style="min-width:120px"> Đóng</a-button>
          <a-button v-if="showBtnReceivedAtFirst" @click="handleReceiveAtFirstAirport" type="primary" style="margin-left: 1rem; min-width:120px">Nhận AWB tại sân bay đầu</a-button>
          <a-button v-if="showBtnMoveFlight" @click="handleMoveFlight" type="primary" style="margin-left: 1rem; min-width:120px">Chuyển tàu bay</a-button>

        </a-col>
      </a-row>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import { GetFlightToMerge, MergeOrder, TransferToPlane, ReceiveAtFirstAirport } from '@/api/order'
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
      awbCode: null,
      awbCodeText: null,
      awbDate: null
    }
  },
  created () {
  },
  mounted () {

  },
  computed: {
    awbWeight () {
      return this.awbObj.listOrder.map(item => item.weight).reduce((total, item) => (total + item))
    }
  },
  methods: {
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
    handleMoveFlight (e) {
      e.preventDefault()
      const params = {
        orderMergeId: this.awbCode
      }
      this.loading = true
      TransferToPlane(params).then(res => {
        this.loading = false
        this.$notification.success({
          message: 'Chuyển tàu bay',
          description:
              'Chuyển tàu bay thành công',
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
    },
    handleReceiveAtFirstAirport (e) {
      e.preventDefault()
      const params = {
        orderMergeId: this.awbCode
      }
      this.loading = true
      ReceiveAtFirstAirport(params).then(res => {
        this.loading = false
        this.$notification.success({
          message: 'Nhận AWB tại sân bay đầu',
          description:
              'Nhận AWB tại sân bay đầu thành công',
          duration: 5
        })
        this.showBtnReceivedAtFirst = false
        this.showBtnMoveFlight = true
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
        flightId: this.formSubmit.flightId,
        listOrderId: this.awbObj.listOrder.map(item => item.orderId)
      }
      this.loading = true
      this.listFlight = []
      MergeOrder(params).then(res => {
        this.loading = false
        this.$notification.success({
          message: '',
          description:
            'Tạo AWB thành công',
          duration: 5
        })
        this.awbCode = res.orderMergeId
        this.awbCodeText = res.awbCode
        this.awbDate = res.createAt
        this.showBtnReceivedAtFirst = false
        this.showBtnMoveFlight = false
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
      this.awbCode = null
      this.$emit('closePopup')
    },
    handleCancelReload () {
      this.awbCode = null
      this.$emit('closePopupReload')
    },
    fetchFlight () {
      const params = {
        date: this.formSubmit.flightDateString,
        flightScheduleId: this.awbObj.flightScheduleId,
        fromProvince: this.awbObj.fromProvince.provinceCode,
        toProvince: this.awbObj.toProvince.provinceCode
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
