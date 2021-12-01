<template>
  <div>
    <a-row :gutter="16">
      <a-col :xs="24" :md="20" >

        <div style="padding-top: 20px; padding-bottom: 20px">
          <span style="font-size: 18px;font-weight: 500">Mã vận đơn: {{ modelDetail.orderId }}</span>
          <span style="padding-left: 50px; font-size: 18px;font-weight: 500">Trạng thái: {{ modelDetail.orderStatusName }}</span>
        </div>
        <a-steps :current="currentStep" >
          <a-step v-for="item in listOrderStatusNotDup" :title="item.name" :key="item.value"/>
        </a-steps>
      </a-col>
      <a-col :xs="24" :md="4" style="display: flex; justify-content: flex-end">
        <img src="~@/assets/qr.png" width="120px">
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :xs="24" :md="12" >
        <a-divider orientation="left">
          <span class="block-header">Nơi gửi</span>
        </a-divider>
        <div style="font-size: 18px;font-weight: 500">{{ modelDetail.senderName }} - {{ modelDetail.senderPhone }}</div>
        <div style="font-size: 14px;font-weight: 300; padding-top:15px">{{ modelDetail.fromFullAddress }} </div>
      </a-col>
      <a-col :xs="24" :md="12" >
        <a-divider orientation="left">
          <span class="block-header">Nơi nhận</span>
        </a-divider>
        <div style="font-size: 18px;font-weight: 500">{{ modelDetail.receiverName }} - {{ modelDetail.receiverPhone }}</div>
        <div style="font-size: 14px;font-weight: 300; padding-top:15px">{{ modelDetail.toFullAddress }} </div>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="padding-top:20px">
      <a-col :xs="24" :md="12" >
        <a-divider orientation="left">
          <span class="block-header">Thông tin vận đơn</span>
        </a-divider>
      </a-col>
    </a-row>

    <a-row :gutter="16" >
      <a-col :xs="24" :md="12" >
        <div style="font-size: 14px;font-weight: 300; padding-top:15px">Khối lượng (Kg): {{ modelDetail.weight }} </div>
        <div style="font-size: 14px;font-weight: 300; padding-top:15px">Chuyến bay: {{ modelDetail.flightCode }} </div>
        <div style="font-size: 14px;font-weight: 300; padding-top:15px">Loại hoàng hóa: {{ modelDetail.productName }} </div>
        <div style="font-size: 14px;font-weight: 300; padding-top:15px">Mô tả: {{ modelDetail.productDesc }} </div>
      </a-col>
      <a-col :xs="24" :md="12" >
        <div style="font-size: 18px;font-weight: bold; padding-top:15px; color: #076885 !important">Tổng tiền: {{ modelDetail.amount | numberFormat }} </div>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="padding-top:20px" v-if="modelDetail.bsvCard">
      <a-col :xs="24" :md="12" >
        <a-divider orientation="left">
          <span class="block-header">Thẻ bông sen vàng</span>
        </a-divider>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :xs="24" :md="12" >
        <div style="font-size: 14px;font-weight: 300; padding-top:15px">Số thẻ: {{ modelDetail.bsvCard }} </div>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="padding-top:20px">
      <a-col :xs="24" :md="12" >
        <a-divider orientation="left" >
          <span class="block-header">  Thông tin vận chuyển</span>
        </a-divider>
      </a-col>
    </a-row>
    <a-row :gutter="16" >
      <a-col :xs="24" :md="24" >
        <a-steps direction="vertical" v-if="modelDetail && modelDetail.listOrderTrans" :current="modelDetail.listOrderTrans.length" progress-dot >
          <a-step v-for="(item, key) in modelDetail.listOrderTrans" :key="key" :title="item.shippingStatusDetail" :description="item.shippingStatusDesc" />

        </a-steps>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import { SearchGlobalListValue } from '@/api/global_list'
import { GLOBAL_LIST_STATUS_ACTIVE, SHIPPING_STATUS, GLOBAL_SHIPPING_STATUS_CANCEL, GLOBAL_SHIPPING_STATUS_DONE, ORDER_STATUS } from '@/constants/global_list'

export default {
  components: {
  },
  props: {
    modelDetail: {
      type: Object,
      required: true
    }
  },
  name: 'OrderDetailComponent',
  data () {
    return {
      listShippingStatus: [],
      listOrderStatus: [],
      GLOBAL_SHIPPING_STATUS_DONE,
      GLOBAL_SHIPPING_STATUS_CANCEL
    }
  },
  created () {
    this.fetchShippingStatus()
    this.fetchOrderStatus()
  },
  computed: {
    listShippingStatusNotDup () {
      var seen = []
      var out = []
      var len = this.listShippingStatus.length
      for (var i = 0; i < len; i++) {
        var item = this.listShippingStatus[i]
        if (seen.filter(tmp => tmp.description === item.description).length === 0) {
          seen.push(item)
          out.push(item)
        }
      }
      if (this.modelDetail.shippingStatus === GLOBAL_SHIPPING_STATUS_DONE) {
        out = out.filter(item => item.value !== GLOBAL_SHIPPING_STATUS_CANCEL)
      }
      if (this.modelDetail.shippingStatus === GLOBAL_SHIPPING_STATUS_CANCEL) {
        out = out.filter(item => item.value !== GLOBAL_SHIPPING_STATUS_DONE)
      }
      return out
    },
    listOrderStatusNotDup () {
      let out = []
      if (this.modelDetail.orderStatus === '6') {
        out = this.listOrderStatus.filter(item => item.value !== '5')
      } else if (this.modelDetail.orderStatus === '5') {
        out = this.listOrderStatus.filter(item => item.value !== '6' && item.value !== '4')
      } else {
        out = this.listOrderStatus.filter(item => item.value !== '5' && item.value !== '6')
      }
      return out
    },
    currentStep () {
      let status = parseInt(this.modelDetail.orderStatus)
      if (status === 7) {
        status = 4
      }
      if (status === 6) {
        status = 5
      }
      return status
    }
  },
  methods: {
    fetchShippingStatus () {
      SearchGlobalListValue({ globalListCode: SHIPPING_STATUS, status: GLOBAL_LIST_STATUS_ACTIVE })
        .then(rs => {
          this.listShippingStatus = rs
        })
        .catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: '',
            description: msg,
            duration: 5
          })
        }).finally(res => {
        })
    },
    fetchOrderStatus () {
      SearchGlobalListValue({ globalListCode: ORDER_STATUS, status: GLOBAL_LIST_STATUS_ACTIVE })
        .then(rs => {
          this.listOrderStatus = rs
        })
        .catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: '',
            description: msg,
            duration: 5
          })
        }).finally(res => {
        })
    }
  }
}
</script>
<style>
  .ant-steps-item-title {

  }
  .ant-steps-item-content {
    width: max-content !important;
  }
  .ant-steps-navigation .ant-steps-item:after {
    display: none;
  }
  .block-header {
    color: #076885 !important;
    font-weight: bold;
  }
</style>
