<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/" @click.prevent="gotoList">{{ fromTitle }}</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Thông tin chi tiết vận đơn</a-breadcrumb-item>
      </a-breadcrumb>
      <div style="height: 10px"></div>
      <a-card style="width: 100%; padding: 20px">
        <order-detail-component :model-detail="modelDetail"></order-detail-component>
        <a-row :gutter="16">
          <a-col
            :xs="24"
            :md="24"
            :lg="24"
            class="filter-item-container"
            style="display: flex;flex-wrap: wrap; margin-top: 17px; justify-content: center">
            <a-button class="btn-success uppercase" @click="gotoList" :loading="loading">Quay lại
            </a-button>
            <a-button
              class="btn-success uppercase"
              :loading="loading"
              style="margin-left: 10px"
              type="primary"
              @click="onConfirmReceipt"
              v-if="modelDetail.shippingStatus === shippingStatusFirstBikeReceid">Nhận hàng tại Hub đầu
            </a-button>
            <a-button
              class="btn-success uppercase"
              :loading="loading"
              style="margin-left: 10px"
              type="primary"
              @click="onShowPopupGroupAWB"
              v-if="modelDetail.shippingStatus === shippingStatusFirstHub">Gộp vào AWB
            </a-button>
            <a-button
              class="btn-success uppercase"
              :loading="loading"
              style="margin-left: 10px"
              type="primary"
              @click="onHandleDeliveryLastBike"
              v-if="modelDetail.shippingStatus === shippingStatusLastBike">Giao cho bike
            </a-button>
            <a-button
              class="btn-success uppercase"
              :loading="loading"
              style="margin-left: 10px"
              type="primary"
              @click="onHandleReceiveOrderBack"
              v-if="(modelDetail.shippingStatus === shippingStatusBikeEnd) && (modelDetail.orderStatus === '3')">Nhận đơn hoàn tại HUB cuối
            </a-button>
            <a-button
              class="btn-success uppercase"
              :loading="loading"
              style="margin-left: 10px"
              type="primary"
              @click="onHandleTransferToReceiverInLastHub"
              v-if="(modelDetail.shippingStatus === '17')">Giao hàng
            </a-button>
          </a-col>
        </a-row>
      </a-card>
      <a-modal
        title="Gộp vận đơn hàng không AWB"
        :visible="showSelectAWBForm"
        :footer="null"
        width="80%"
        :maskClosable="false"
        @cancel="handleCancelGroup"
      >
        <FormSelectAWB :awbObj="awbObj" @closePopupReload="handlClosePopupGroupAndReload"/>
      </a-modal>
    </template>

  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../utils/table-empty-text'
import OrderDetailComponent from '@/components/Order/detail'
import columns from './columns'
import { GetByIdForAdmin, ConfirmReceiptOrderInFirstHub, DeliveryOrderToLastBike, LastHubReceiveOrderBack, TransferToReceiverInLastHub } from '@/api/order'
import { GLOBAL_SHIPPING_STATUS_FIRST_BIKE_RECEIVED, GLOBAL_SHIPPING_STATUS_BIKE_END, GLOBAL_SHIPPING_STATUS_FIRST_HUB, GLOBAL_SHIPPING_STATUS_LAST_BIKE, GLOBAL_SHIPPING_STATUS_CANCEL } from '@/constants/global_list'
import FormSelectAWB from '../GroupAWB/FormSelectAWB'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    OrderDetailComponent,
    FormSelectAWB
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
      showSelectAWBForm: false,
      shippingStatusFirstBikeReceid: GLOBAL_SHIPPING_STATUS_FIRST_BIKE_RECEIVED,
      shippingStatusFirstHub: GLOBAL_SHIPPING_STATUS_FIRST_HUB,
      shippingStatusLastBike: GLOBAL_SHIPPING_STATUS_LAST_BIKE,
      shippingStatusCancel: GLOBAL_SHIPPING_STATUS_CANCEL,
      shippingStatusBikeEnd: GLOBAL_SHIPPING_STATUS_BIKE_END,
      loading: false,
      awbObj: {}
    }
  },
  created () {
    this.findById()
  },
  computed: {
    fromTitle () {
      let title = ''
      const fromSource = this.$route.query.from
      switch (fromSource) {
        case 'awbflight':
          title = 'Chuyển AWB ra tàu bay tại Hub đầu'
          break
        case 'hubstart':
          title = 'Nhận vận đơn tại Hub đầu'
          break
        case 'hubend':
          title = 'Nhận AWB tại Hub cuối'
          break
        case 'groupawb':
          title = 'Gộp vận đơn hàng không AWB tại Hub đầu'
          break
        case 'bikehubend':
          title = 'Đặt Bike giao hàng cho Đơn hàng tại Hub cuối'
          break
        case 'bikehubendreceipt':
          title = 'GIAO VẬN ĐƠN CHO BIKE TẠI HUB CUỐI'
          break
        case 'order_back':
          title = 'QUẢN LÝ ĐƠN HOÀN'
          break

        default:
          title = 'Tra cứu thông tin vận đơn'
          break
      }
      return title
    }
  },
  methods: {
    onShowPopupGroupAWB () {
      this.showSelectAWBForm = true
    },
    handleCancelGroup () {
      this.showSelectAWBForm = false
    },
    handlClosePopupGroupAndReload () {
      this.showSelectAWBForm = false
      this.findById()
    },
    gotoList () {
      this.$router.push({ name: this.$route.query.from ? this.$route.query.from : 'order' })
    },
    findById () {
      this.loading = true
      GetByIdForAdmin({ orderId: this.$route.params.id })
        .then(rs => {
          this.modelDetail = rs
          this.awbObj = {
            toProvince: this.modelDetail.toProvince,
            toProvinceName: this.modelDetail.toProvinceName,
            fromProvince: this.modelDetail.fromProvince,
            fromProvinceName: this.modelDetail.fromProvinceName,
            weight: this.modelDetail.weight,
            orderId: this.modelDetail.orderId,
            flightCode: this.modelDetail.flightCode
          }
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
    onConfirmReceipt () {
      this.$confirm({
        title: 'Bạn chắc chắn muốn nhận mã vận đơn: ' + this.modelDetail.orderId + '?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.confirmReceipt(this.modelDetail)
        },
        onCancel () {
        }
      })
    },
    confirmReceipt (record) {
      this.loading = true
      ConfirmReceiptOrderInFirstHub({ orderId: record.orderId })
        .then(rs => {
          this.$notification.success({
            message: 'Nhận vận đơn',
            description:
              'Nhận vận đơn thành công',
            duration: 5
          })
          this.findById()
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
    onHandleReceiveOrderBack () {
      this.$confirm({
        title: 'Bạn chắc chắn muốn nhận lại đơn hàng?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.receiveOrderBack()
        },
        onCancel () {
        }
      })
    },
    receiveOrderBack () {
      LastHubReceiveOrderBack({ orderId: this.modelDetail.orderId })
        .then(rs => {
          this.$notification.success({
            message: 'Nhận lại đơn hàng',
            description:
              'Nhận lại đơn hàng thành công',
            duration: 5
          })
          this.findById()
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
    onHandleDeliveryLastBike () {
      this.$confirm({
        title: 'Bạn chắc chắn muốn giao cho bike?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.deliveryLastBike()
        },
        onCancel () {
        }
      })
    },
    deliveryLastBike () {
      DeliveryOrderToLastBike({ orderId: this.modelDetail.orderId })
        .then(rs => {
          this.$notification.success({
            message: 'Giao cho bike',
            description:
              'Giao cho bike thành công',
            duration: 5
          })
          this.findById()
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
    onHandleTransferToReceiverInLastHub () {
      this.$confirm({
        title: 'Bạn chắc chắn muốn giao hàng?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.transferToReceiverInLastHub()
        },
        onCancel () {
        }
      })
    },
    transferToReceiverInLastHub () {
      TransferToReceiverInLastHub({ orderId: this.modelDetail.orderId })
        .then(rs => {
          this.$notification.success({
            message: 'Giao hàng',
            description:
              'Giao hàng thành công',
            duration: 5
          })
          this.findById()
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
