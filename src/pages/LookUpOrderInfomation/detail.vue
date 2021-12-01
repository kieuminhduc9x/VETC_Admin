<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/" @click.prevent="gotoList">Tra cứu thông tin đơn hàng</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Chi tiết thông tin đơn hàng</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <template>
      <div style="height: 10px"></div>
      <a-card style="width: 100%; padding: 20px">
        <a-row :gutter="16">
          <a-col :xs="24" :md="24" :lg="24">
            <div style="display: flex; justify-content: space-between">
              <div>
                <a-button
                  style="padding: 0; font-weight: bold"
                  class="btn-success uppercase"
                  icon="arrow-left"
                  type="link"
                  @click="gotoList"
                  :loading="loading">Quay lại
                </a-button>
              </div>
              <div style="display: flex; justify-content: flex-end">
                <a-dropdown>
                  <a-menu slot="overlay">
                    <a-menu-item
                      key="1"
                      v-if="modelDetail.orderStatus !== '4'"
                      @click="showDeliverySuccessfully">
                      Xác nhận giao hàng
                    </a-menu-item>
                    <a-menu-item
                      key="2"
                      v-if="modelDetail.orderStatus === '5'|| modelDetail.orderStatus === '8'"
                      @click="orderDeliveryAgain">
                      Đặt giao hàng lại
                    </a-menu-item>
                    <a-menu-item
                      key="3"
                      v-if="modelDetail.orderStatus === '2'"
                      @click="showCancelTransportCompanyOrder">
                      Hủy vận đơn đối tác
                    </a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px"> Thao tác <a-icon type="down" /> </a-button>
                </a-dropdown>
                <a-dropdown style="margin-left: 1rem">
                  <a-menu slot="overlay">
                    <a-menu-item key="1" @click="printBill"> In Bill </a-menu-item>
                    <a-menu-item key="2"> Xuất hóa đơn </a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px" > In <a-icon type="down" /> </a-button>
                </a-dropdown>
              </div>
            </div>
          </a-col>
        </a-row>
        <form-detail :loading="loading || loadingDelivery || loadingCancelTransport" :model-detail="modelDetail"></form-detail>
      </a-card>
      <a-modal
        :visible="visibleModalDelivery"
        :title="'Xác nhận giao hàng'"
        @ok="submitDelivery"
        @cancel="closeModalDelivery"
        :okText="'Xác nhận'"
        :confirm-loading="loadingDelivery"
        width="500px">
        <a-spin :spinning="loadingDelivery">
          <a-form-model
            :model="formDelivery"
            ref="ruleFormDelivery"
            layout="vertical">
            <a-row :gutter="16">
              <a-col :xs="24" :md="24" :lg="24">
                <a-form-model-item
                  prop="note"
                  label="Ghi chú"
                  :rules="[
                    {
                      required: true,
                      message: 'Ghi chú không được để trống',
                      trigger: 'change'
                    }
                  ]">
                  <a-textarea
                    v-model="formDelivery.note"
                    @blur="DeepTrimValue(formDelivery)"
                    style="width:100%">

                  </a-textarea>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </a-spin>
      </a-modal>
      <a-modal
        :visible="visibleCancelTransportCompanyOrder"
        :title="'Hủy vận đơn đối tác'"
        @ok="submitCancelTransportCompanyOrder"
        @cancel="closeCancelTransportCompanyOrder"
        :okText="'Xác nhận'"
        :confirm-loading="loadingCancelTransport"
        width="500px">
        <a-spin :spinning="loadingCancelTransport">
          <a-form-model
            :model="formCancelTransportCompanyOrder"
            ref="ruleFormCancelTransportCompanyOrder"
            layout="vertical">
            <a-row :gutter="16">
              <a-col :xs="24" :md="24" :lg="24">
                <a-form-model-item
                  prop="reason"
                  label="Lý do"
                  :rules="[
                    {
                      required: true,
                      message: 'Lý do không được để trống',
                      trigger: 'change'
                    }
                  ]">
                  <a-textarea
                    v-model="formCancelTransportCompanyOrder.reason"
                    @blur="DeepTrimValue(formCancelTransportCompanyOrder)"
                    style="width:100%">

                  </a-textarea>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </a-spin>
      </a-modal>
    </template>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../utils/table-empty-text'
import FormDetail from './form'
import columns from './columns'
import { deliverySuccess, GetByIdForAdmin, orderDeliveryAgain, cancelTransportCompanyOrder } from '@/api/order'
import { previewReport } from '@/api/report'
import pdf from 'vue-pdf'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    FormDetail,
    pdf
  },
  mixins: [TableEmptyText],
  name: 'OrderDetail',
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      modelDetail: {},
      loading: false,
      awbObj: {},
      visibleModalDelivery: false,
      formDelivery: {
        note: ''
      },
      loadingDelivery: false,
      loadingCancelTransport: false,
      visibleCancelTransportCompanyOrder: false,
      formCancelTransportCompanyOrder: {
        reason: ''
      },
      loadingPdf: false
    }
  },
  created () {
    this.findById()
  },
  computed: {

  },
  methods: {
    gotoList () {
      this.$router.push({ name: this.$route.query.from ? this.$route.query.from : 'search_order' })
    },
    findById () {
      this.loading = true
      GetByIdForAdmin({ orderId: this.$route.params.id }).then(rs => {
        this.modelDetail = rs
        this.modelDetail.productDesc = String(rs.productDesc).replaceAll('.', '<br/>')
        this.awbObj = {
          toProvince: this.modelDetail.toProvince,
          toProvinceName: this.modelDetail.toProvinceName,
          fromProvince: this.modelDetail.fromProvince,
          fromProvinceName: this.modelDetail.fromProvinceName,
          weight: this.modelDetail.weight,
          orderId: this.modelDetail.orderId,
          flightCode: this.modelDetail.flightCode
        }
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
    orderDeliveryAgain () {
      const $this = this
      this.$confirm({ content: 'Bạn chắc chắn muốn đặt giao hàng lại?',
        onOk () {
          $this.submitOrderDeliveryAgain()
        }
      })
    },
    submitOrderDeliveryAgain () {
      const params = {
        lang: 'VI',
        orderId: this.$route.params.id
      }
      orderDeliveryAgain(params).then(rs => {
        if (rs) {
          const $this = this
          this.$success({ content: 'Đặt giao hàng lại thành công',
            onOk () {
              $this.findById()
            }
          })
        }
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
      }).finally(res => {
      })
    },
    showDeliverySuccessfully () {
      this.visibleModalDelivery = true
    },
    closeModalDelivery () {
      this.visibleModalDelivery = false
      this.formDelivery.note = ''
      this.findById()
    },
    submitDelivery () {
      this.$refs.ruleFormDelivery.validate(valid => {
        if (valid) {
          const params = {
            note: this.formDelivery.note,
            orderId: this.$route.params.id
          }
          this.loadingDelivery = true
          deliverySuccess(params).then(rs => {
            if (rs) {
              this.$success({ content: 'Xác nhận giao hàng thành công' })
              this.closeModalDelivery()
            }
          }).catch(err => {
            const mes = this.handleApiError(err)
            this.$error({ content: mes })
          }).finally(rs => {
            this.loadingDelivery = false
          })
        }
      })
    },
    showCancelTransportCompanyOrder () {
      this.visibleCancelTransportCompanyOrder = true
    },
    closeCancelTransportCompanyOrder () {
      this.visibleCancelTransportCompanyOrder = false
      this.formCancelTransportCompanyOrder.reason = ''
      this.findById()
    },
    submitCancelTransportCompanyOrder () {
      this.$refs.ruleFormCancelTransportCompanyOrder.validate(valid => {
        if (valid) {
          const params = {
            orderId: this.$route.params.id,
            reason: this.formCancelTransportCompanyOrder.reason
          }
          this.loadingCancelTransport = true
          cancelTransportCompanyOrder(params).then(rs => {
            if (rs) {
              this.$success({ content: 'Hủy vận đơn đối tác thành công' })
              this.closeCancelTransportCompanyOrder()
            }
          }).catch(err => {
            const mes = this.handleApiError(err)
            this.$error({ content: mes })
          }).finally(rs => {
            this.loadingCancelTransport = false
          })
        }
      })
    },
    printBill () {
      const params = {
        fileType: 'pdf',
        params: {
          orderId: this.modelDetail.orderId, // orderId
          vnaMallOrderNumber: this.modelDetail.vnaMallOrderNumber, // vnaMallOrderNumber
          createdAt: this.modelDetail.createAt, // createdAt
          transportCompanyName: this.modelDetail.transportCompanyName, // transportCompanyName
          totalProductPrice: this.modelDetail.totalProductPrice, // totalProductPrice
          discount: this.modelDetail.discount, // discount
          shippingFee: this.modelDetail.totalAmount, // lotusAmount
          totalAmount: this.modelDetail.totalAmount, // totalAmount
          cod: this.modelDetail.cod || 0, // cod
          senderName: this.modelDetail.senderName, // senderName
          senderPhone: this.modelDetail.senderPhone, // senderPhone
          senderAddress: this.modelDetail.fromFullAddress,
          receiverName: this.modelDetail.receiverName, // receiverName
          receiverPhone: this.modelDetail.receiverPhone, // receiverPhone
          receiverAddress: this.modelDetail.toFullAddress // receiverAddress
        },
        reportName: 'vna_mall_bill'
      }
      this.loadingPdf = true
      previewReport(params).then(rs => {
        var file = new Blob([rs], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file)
        window.open(fileURL)
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$error({ content: msg })
      }).finally(res => {
        this.loadingPdf = false
      })
    }
  }
}
</script>
<style>
    .code-box {
        border-left: 1px solid #ebedf0;
        border-bottom: 1px solid #ebedf0;
        border-right: 1px solid #ebedf0;
        border-radius: 2px;
        display: inline-block;
        width: 100%;
        position: relative;
        margin: 0 0 16px;
        transition: all .2s;
        background: #ffffff;
    }

    .ant-steps-item-content {
        width: max-content !important;
    }
</style>
