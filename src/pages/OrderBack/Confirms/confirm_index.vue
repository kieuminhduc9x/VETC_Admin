<template>
  <div>
    <a-tabs type="card" @change="changeTab">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="history" />
          Phát lại
        </span>
        <re-delivery :order-data="modelDetail" @updateDone="updateDone"></re-delivery>
      </a-tab-pane>
      <a-tab-pane key="2" >
        <span slot="tab">
          <a-icon type="user" />
          Khách hàng tới nhận
        </span>
        <customer-received :order-data="modelDetail" @updateDone="updateDone"> </customer-received>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="sync" />
          Hoàn hàng
        </span>
        <transfer-return :order-data="modelDetail" @updateDone="updateDone"> </transfer-return>
      </a-tab-pane>
      <a-tab-pane key="4">
        <span slot="tab">
          <a-icon type="delete" />
          Tiêu hủy
        </span>
        <order-destroy :order-data="modelDetail" @updateDone="updateDone"> </order-destroy>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CustomerReceived from './customer_received'
import OrderDestroy from './destroy_order'
import ReDelivery from './redelivery'
import TransferReturn from './transfer_return'
import { GetByIdForAdmin } from '@/api/order'
export default {
  props: {

    modelDetail: {
      required: true,
      type: Object
    }
  },
  name: 'OrderBackConfirm',
  components: {
    CustomerReceived,
    OrderDestroy,
    TransferReturn,
    ReDelivery
  },
  data () {
    return {
      activeTab: 1
      // modelDetail: null
    }
  },
  created () {
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    changeTab (key) {
      this.activeTab = key
    },
    updateDone (key) {
      this.$emit('updateDone')
    },
    findById () {
      this.loading = true
      GetByIdForAdmin({ orderId: this.orderData.orderId })
        .then(rs => {
          this.modelDetail = rs
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
