<template>
  <public-layout>
    <a-card style="width: 100%;border: none;padding: 20px 20px 60px 20px;" class="search-container">
      <div>
        <a-row :gutter="16">
          <a-col :xs="12" :md="12" :lg="12">
            <p style="color: #076885; font-weight: 500; font-size: 18px; text-transform: uppercase">Theo dõi thông tin đơn hàng</p>
            <a-row :gutter="16">
              <a-col :xs="24" :md="12" :lg="12">
                <a-card style="width: 100%;border: none; padding: 20px" class="search-container">
                  <a-divider orientation="left">
                    <span class="block-header">Nơi gửi</span>
                  </a-divider>
                  <p style="font-size: 16px">{{ formData.senderName + ' - ' + formData.senderPhone }}</p>
                  <p style="color:#787878;font-size: 14px">{{ formData.fromFullAddress }}</p>
                </a-card>
              </a-col>
              <a-col :xs="24" :md="12" :lg="12">
                <a-card style="width: 100%;border: none; padding: 20px" class="search-container">
                  <a-divider orientation="left">
                    <span class="block-header">Nơi nhận</span>
                  </a-divider>
                  <p style="font-size: 16px">{{ formData.receiverName + ' - ' + formData.receiverPhone }}</p>
                  <p style="color:#787878;font-size: 14px">{{ formData.toFullAddress }}</p>
                </a-card>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :xs="24" :md="24" :lg="24">
                <a-card style="width: 100%;border: none" class="search-container">
                  <a-divider orientation="left">
                    <span class="block-header">Thông tin vận chuyển</span>
                  </a-divider>
                  <a-steps direction="vertical" :current="currentSteps" progress-dot>
                    <a-step v-for="(item, key) in listOrderTrans" :key="key" :title="item.shippingStatusDetail" />
                  </a-steps>
                </a-card>
              </a-col>
            </a-row>
          </a-col>

          <a-col :xs="12" :md="12" :lg="12">
            <div style="width: 100%; height: auto">
              <img src="@/assets/banner-VNAE.png" style="width: 100%; height: auto" alt="">
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="12" :md="12" :lg="12">
          </a-col>
        </a-row>
      </div>
    </a-card>

  </public-layout>
</template>

<script>
import PublicLayout from '@/pages/layouts/PublicLayout'
import { commonMethods, authComputed } from '@/store/helpers'
import { findByIdTracking } from '@/api/tracking'

export default {
  components: {
    PublicLayout
  },
  name: 'SalesRevenue',
  data () {
    return {
      activeKey: [1, 2, 3, 4],
      listOrderTrans: [],
      currentSteps: '',
      formData: {}
    }
  },
  created () {
    this.findById()
  },
  mounted () {
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...commonMethods,
    findById () {
      findByIdTracking({ vnaMallNumber: this.$route.params.orderId }).then(rs => {
        this.formData = rs
        this.listOrderTrans = rs.listOrderTrans
        this.currentSteps = this.listOrderTrans.length
      })
    }
  }
}
</script>
<style type="text/css">
.ant-steps-item-content{
  width: 90%!important;
}
.ant-steps-item-title {
  width: 100% !important
}
</style>
