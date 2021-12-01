<template>
  <div>
    <a-form-model
      layout="inline"
      :model="modelForm"
      :rules="rules">
      <a-row :gutter="16" type="flex">

        <a-col :xs="24" :md="24" :lg="24">
          <a-form-model-item
            label="Hoàn về địa chỉ gửi" >
            <span>{{ orderData.senderName }} - {{ orderData.senderPhone }} - {{ orderData.fromFullAddress }}</span>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="24" :lg="24">
          <a-divider orientation="left">
            <span class="block-header">Thông tin đơn hàng</span>
          </a-divider>
        </a-col>
        <a-col :xs="24" :md="12" :lg="12">
          <a-row :gutter="16" type="flex">
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label="Ngày yêu cầu hoàn hàng" >
                <span> {{ currentTime }}</span>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label="Mã đơn hàng" >
                <span> {{ orderData.orderId }}</span>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label="Mô tả" >
                <span> {{ orderData.productDesc }}</span>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24" :md="12" style="display: flex; justify-content: flex-start">
          <img src="~@/assets/qr.png" width="120px">
        </a-col>
      </a-row>
      <a-row :gutter="16" type="flex">
        <a-col :xs="24" :md="24" :lg="12">
          <a-divider orientation="left">
            <span class="block-header">Nơi gửi</span>
          </a-divider>
          <a-form-model-item
            label="Tên HUB" >
            <span> {{ orderData.currentHubName }}</span>
          </a-form-model-item>
          <a-form-model-item
            label="Địa chỉ HUB" >
            <span> {{ orderData.currentHubAddress }}</span>
          </a-form-model-item>
          <a-form-model-item
            label="SĐT HUB" >
            <span> {{ orderData.currentHubPhone }}</span>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="24" :lg="12">
          <a-divider orientation="left">
            <span class="block-header">Nơi nhận</span>
          </a-divider>
          <a-form-model-item
            label="Tên người nhận" >
            <span> {{ orderData.receiverName }}</span>
          </a-form-model-item>
          <a-form-model-item
            label="Địa chỉ" >
            <span> {{ orderData.fromFullAddress }}</span>
          </a-form-model-item>
          <a-form-model-item
            label="SĐT" >
            <span> {{ orderData.senderPhone }}</span>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="16" type="flex">
        <a-col :xs="24" :md="24" :lg="24">
          <a-divider orientation="left">
            <span class="block-header">Khung giờ vận chuyển</span>
          </a-divider>
          <a-form-model-item prop="fligtScheduleId" label="Khung giờ bay">
            <a-select
              :filter-option="filterSelectOption"
              :allowClear="true"
              show-search
              style="width: 250px"
              v-model="modelForm.flightScheduleId"
              @change="getTransferReturnFee"
            >
              <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --
              </a-select-option>
              <a-select-option
                v-for="item in listFlightSchedule"
                :key="'t-p-' + item.flightScheduleId"
                :value="item.flightScheduleId">{{ item.fromTime + ' - ' + item.toTime }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            v-if="modelForm.flightScheduleId"
            label="Tổng tiền" >
            <span> {{ fee }}</span>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="24" type="flex" justify="space-around" align="middle">
        <a-col
          :xs="24"
          :md="24"
          :lg="24"
          class="cus-flex-center"
        >

          <a-button
            type="primary"
            style="margin-left: 1rem;"
            @click="handleSubmit"
            :loading="loading">Xác nhận</a-button>

        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>

import { TransferReturn, GetTransferReturnFee } from '@/api/order'
import { GetFlightSchedule } from '@/api/flight'
import moment from 'moment'

export default {
  props: {

    orderData: {
      required: true,
      type: Object
    }
  },
  name: 'TransferReturn',
  data () {
    return {
      fee: null,
      loading: false,
      currentTime: moment().format('YYYY-MM-DD'),
      listFlightSchedule: [],
      modelForm: {
        flightScheduleId: ''
      },
      rules: {
        flightScheduleId: [
          { required: true, message: 'Khung giờ bay không được phép trống', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
    this.getScheduleFlight()
  },
  computed: {

  },
  methods: {
    handleSubmit () {
      this.loading = true
      TransferReturn({ orderId: this.orderData.orderId }).then(res => {
        this.$notification.success({
          message: 'Cập nhật đơn hàng',
          description:
              'Cập nhật trạng thái đơn hàng thành công',
          duration: 5
        })
        this.gotoList()
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
    gotoList () {
      this.$emit('updateDone')
    },
    getTransferReturnFee () {
      if (!this.modelForm.flightScheduleId) {
        this.fee = null
        return
      }
      this.loading = true
      GetTransferReturnFee({ orderId: this.orderData.orderId, flightScheduleId: this.modelForm.flightScheduleId })
        .then(rs => {
          this.fee = rs.fee
        })
        .catch(err => {
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
    getScheduleFlight () {
      const params = {
        fromProvince: this.orderData.fromProvince,
        toProvince: this.orderData.toProvince
      }
      GetFlightSchedule(params).then(rs => {
        this.listFlightSchedule = rs
      })
    }
  }
}
</script>
