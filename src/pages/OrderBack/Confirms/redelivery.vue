<template>
  <div>
    <a-form-model layout="inline">
      <a-row :gutter="16" type="flex">
        <a-col :xs="24" :md="24" :lg="24">
          <a-form-model-item
            label="Mã vận đơn" >
            <span>{{ orderData.orderId }}</span>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="24" :lg="24">
          <a-form-model-item
            label="Thông tin người gửi" >
            <span>{{ orderData.senderName }} - {{ orderData.senderPhone }} - {{ orderData.fromFullAddress }}</span>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="24" :lg="24">
          <a-form-model-item
            label="Nơi gửi" >
            <span> {{ orderData.fromFullAddress }}</span>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="24" :lg="24">
          <a-form-model-item
            label="Nơi nhận" >
            <span> {{ orderData.toFullAddress }}</span>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="24" :lg="24">
          <a-form-model-item
            label="Mô tả hàng hóa" >
            <span>{{ orderData.productDesc }}</span>
          </a-form-model-item>
        </a-col>

        <a-col :xs="24" :md="24" :lg="24">
          <a-form-model-item
            label="Phí cước phát lại" >
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

import { GetReDeliveryFee, ReDelivery } from '@/api/order'

export default {
  props: {

    orderData: {
      required: true,
      type: Object
    }
  },
  name: 'ReDelivery',
  data () {
    return {
      fee: null,
      loading: false
    }
  },
  created () {

  },
  mounted () {
    this.getReDeliveryFee()
  },
  computed: {

  },
  methods: {
    handleSubmit () {
      this.loading = true
      ReDelivery({ orderId: this.orderData.orderId }).then(res => {
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
    getReDeliveryFee () {
      this.loading = true
      GetReDeliveryFee({ orderId: this.orderData.orderId })
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
    }
  }
}
</script>
