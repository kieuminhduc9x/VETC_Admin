<template>
  <div>
    <a-spin :spinning="loading">
      <a-row :gutter="16">
        <a-col :xs="24" :md="20" >

          <div style="padding-top: 20px;">
            <span style="font-size: 18px;font-weight: 500">Mã vận đơn: {{ modelDetail.orderId }}</span>
            <span style="padding-left: 50px; font-size: 18px;font-weight: 500">Trạng thái: <span style="font-weight: bold" :class="modelDetail.orderStatus === '5' ? 'color-red' : modelDetail.orderStatus === '4' ? 'color-green' : modelDetail.orderStatus === '3' ? 'color-blue' : 'color-yellow'"> {{ modelDetail.orderStatusName }}</span></span>
          </div>
          <!--          <a-steps :current="currentStep" >-->
          <!--            <a-step v-for="item in listOrderStatusNotDup" :title="item.name" :key="item.value"/>-->
          <!--          </a-steps>-->
        </a-col>

      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="10" >
          <a-divider orientation="left">
            <span class="block-header">Nơi gửi</span>
          </a-divider>
          <div style="font-size: 18px;font-weight: 500">{{ modelDetail.senderName }} - {{ modelDetail.senderPhone }}</div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">{{ modelDetail.fromFullAddress }} </div>
        </a-col>
        <a-col :xs="24" :md="10" >
          <a-divider orientation="left">
            <span class="block-header">Nơi nhận</span>
          </a-divider>
          <div style="font-size: 18px;font-weight: 500">{{ modelDetail.receiverName }} - {{ modelDetail.receiverPhone }}</div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">{{ modelDetail.toFullAddress }} </div>
        </a-col>
        <a-col :xs="24" :md="4" >
          <div style="display: flex; justify-content: flex-end">
            <img :src="modelDetail.qrCode" width="120px">
          </div>
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
          <div style="font-size: 14px;font-weight: 300; padding-top:10px">Loại hoàng hóa: {{ modelDetail.productName }}</div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">Mô tả:
            <p v-html="modelDetail.productDesc"></p>
          </div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">
            Khối lượng (Kg): {{ modelDetail.weight }}
          </div>
        </a-col>
        <a-col :xs="24" :md="4" >
        </a-col>
        <a-col :xs="24" :md="8" >
          <div style="font-size: 14px; padding-top:10px; display: flex; justify-content: flex-end">
            <div style="width: 100%">
              Ghi chú:
              <a-textarea
                v-model="modelDetail.note"
                :auto-size="{ minRows: 3, maxRows: 5 }"></a-textarea>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16" style="padding-top:20px">
        <a-col :xs="24" :md="12" >
          <a-divider orientation="left">
            <span class="block-header">Thông tin đơn hàng</span>
          </a-divider>
        </a-col>
        <a-col :xs="24" :md="12" >
          <a-divider orientation="left">
            <span class="block-header">Thông tin xuất hóa đơn</span>
          </a-divider>
        </a-col>
      </a-row>
      <a-row :gutter="16" >
        <a-col :xs="24" :md="12" >
          <div style="font-size: 14px;font-weight: 300; padding-top:10px">Tổng tiền: </div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">Giảm giá: </div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">Phí vận chuyển: {{ this.formatPrice1(modelDetail.lotusAmount) + 'đ' }}</div>
          <div style="font-size: 18px;font-weight: bold; padding-top:15px; color: #076885 !important">Tổng giá trị đơn hàng: {{ this.formatPrice1(modelDetail.lotusAmount) + 'đ' }} </div>
        </a-col>
        <a-col :xs="24" :md="12" >
          <div style="font-size: 14px;font-weight: 300; padding-top:10px">Công ty đặt hóa đơn: {{ this.modelDetail.transportCompanyName }}</div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">Mã số thuế: {{ this.modelDetail.vnaMallOrderNumber }}</div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">Địa chỉ: {{ this.modelDetail.toFullAddress }}</div>
          <div style="font-size: 14px;font-weight: 300; padding-top:15px">Email: {{ this.modelDetail.email }}</div>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="padding-top:20px">
        <a-col :xs="24" :md="24" :lg="24">
          <a-divider orientation="left" >
            <span class="block-header">  Thông tin vận chuyển</span>
          </a-divider>
        </a-col>
      </a-row>
      <a-row :gutter="16" >
        <a-col :xs="24" :md="24" >
          <a-steps direction="vertical" v-if="modelDetail && modelDetail.listOrderTrans" :current="modelDetail.listOrderTrans.length" progress-dot >
            <a-step v-for="(item, key) in modelDetail.listOrderTrans" :key="key" >
              <template v-if="item.transportCompanyLink !== null" slot="title">
                <a :href="item.transportCompanyLink" target="_blank">{{ item.shippingStatusDetail }}</a>
              </template>
              <template v-else slot="title">
                <p style="width: 100%!important;">{{ item.shippingStatusDetail }}</p>
              </template>
            </a-step>

          </a-steps>
        </a-col>

      </a-row>
    </a-spin>
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
    },
    loading: {
      type: Boolean,
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
      out = this.modelDetail.listOrderStatusGeneral
      return out
    },
    currentStep () {
      const status = this.modelDetail.listOrderStatusGeneral.filter(item => item.isActive === true)
      return status.length
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
<style type="text/css">
.ant-steps-dot .ant-steps-item-content, .ant-steps-dot.ant-steps-small .ant-steps-item-content{
  width: 90%!important;
}
  .ant-steps-navigation .ant-steps-item:after {
    display: none;
  }
  .block-header {
    color: #076885 !important;
    font-weight: bold;
  }
.color-red {
  color: red!important;
}
.color-green {
  color: #22c993!important;
}
.color-blue {
  color: #36a3f7!important;
}
.color-yellow {
  color: #fdbd41!important;
}
</style>
