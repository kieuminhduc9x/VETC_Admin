<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Xử lý chêch lệch</a-breadcrumb-item>
        </a-breadcrumb>
        <menu-profile></menu-profile>
      </div>
    </template>
    <div style="margin-top: 5px">
      <a-card title="Thông tin">
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left"
          style="padding: 15px 20px">
          <a-row :gutter="16">
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Thu phí viên"
                prop="thuphivien"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.thuphivien"
                >
                  <a-select-option v-for="item in lsThuphivien" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Ca"
                prop="ca"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.ca"
                >
                  <a-select-option v-for="item in lsCa" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Bắt đầu ca"
                prop="batdauca"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  v-model="form.batdauca"
                  format="DD/MM/YYYY hh:mm:ss"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Kết thúc ca"
                prop="ketthucca"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  v-model="form.ketthucca"
                  format="DD/MM/YYYY hh:mm:ss"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="24" :md="24">
              <div style="display: flex; justify-content: center">
                <a-button class="ant-btn-success" >Tìm kiếm</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <a-card>
        <a-row :gutter="16">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="Hủy giao dịch">
              <div style="display: flex; justify-content: flex-end; margin: 10px 0">
                <a-button class="ant-btn-success">Hủy giao dịch</a-button>
              </div>
              <a-table
                ref="tb1"
                :columns="columnsCancelTrans"
                :data-source="dataCancelTrans"
                :rowKey=" (rowKey, index ) => index"
                :pagination="dataCancelTrans.length === 0 ? false : paginationCancelTrans"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChangeCancelTrans"
                class="ant-table-bordered">
                <template slot="action">
                  <span style="cursor: pointer">
                    <a-icon
                      type="printer"
                      :style="{color: 'blue', fontSize: '18px', marginLeft: '8px'}"
                    />
                  </span>
                  <span style="cursor: pointer">
                    <a-icon
                      type="delete"
                      :style="{color: 'red', fontSize: '18px', marginLeft: '8px'}"
                    />
                  </span>
                </template>
              </a-table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Bán mới">
              <a-form-model
                :model="formNewSale"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                labelAlign="left"
                style="padding: 15px 20px">
                <a-row :gutter="16">
                  <a-col :xs="24" :lg="12" :md="12">
                    <a-form-model-item
                      label="Trạm vào"
                      prop="tramvao"
                      style="margin-bottom: 20px!important;">
                      <a-select
                        v-model="formNewSale.tramvao"
                      >
                        <a-select-option v-for="item in lsTramvao" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </a-col>
                  <a-col :xs="24" :lg="12" :md="12">
                    <a-form-model-item
                      label="Trạm ra"
                      prop="tramra"
                      style="margin-bottom: 20px!important;">
                      <a-select
                        v-model="formNewSale.tramra"
                      >
                        <a-select-option v-for="item in lsTramra" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </a-col>
                  <a-col :xs="24" :lg="12" :md="12">
                    <a-form-model-item
                      label="Thời gian bán"
                      prop="thoigianban"
                      style="margin-bottom: 20px!important;">
                      <a-date-picker
                        v-model="formNewSale.thoigianban"
                        format="DD/MM/YYYY hh:mm:ss"
                      >
                      </a-date-picker>
                    </a-form-model-item>
                  </a-col>
                  <a-col :xs="24" :lg="12" :md="12">
                    <a-form-model-item
                      label="Số lượng bán"
                      prop="soluong"
                      style="margin-bottom: 20px!important;">
                      <a-input
                        v-model="formNewSale.soluong"
                      >
                      </a-input>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <div style="display: flex; justify-content: center; margin: 10px 0">
                  <a-button class="ant-btn-success">Bán vé</a-button>
                </div>
              </a-form-model>
            </a-tab-pane>
          </a-tabs>
        </a-row>

      </a-card>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import MenuProfile from '@/components/MenuProfile'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columnsCancelTrans from './columnsCancelTrans'
import columnsNewSale from './columnsNewSale'
import _merge from 'lodash/merge'
import moment from 'moment'

const ResizeableTitle1 = resizeableTitle(columnsCancelTrans)
const ResizeableTitle2 = resizeableTitle(columnsNewSale)
export default {
  components: {
    MainLayout,
    MenuProfile
  },
  mixins: [TableEmptyText],
  name: 'InventoryReceivingVoucher',
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle1, ResizeableTitle2
      }
    }
    return {
      moment,
      columnsCancelTrans,
      columnsNewSale,
      activeSearchKey: 1,
      activeResultKey: 1,
      paginationCancelTrans: {
        current: 1,
        total: 1,
        pageSize: 15,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      loading: false,
      form: {
        thuphivien: '1',
        ca: '1',
        batdauca: '2021-02-22 06:05:00',
        ketthucca: '2021-02-22 12:00:00'
      },
      lsThuphivien: [
        {
          value: '1',
          name: 'Lê Thanh Nga'
        }
      ],
      lsCa: [
        {
          value: '1',
          name: 'Ca 1'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      dataCancelTrans: [
        {
          rowIndex: '1',
          thoigian: '22/02/2021 07:23:00',
          tramvao: 'Trạm A',
          tramra: 'Trạm B',
          bienso: '13H-13293',
          loaixe: 'Loại 1',
          giave: '35,000',
          loailoi: 'Chọn lại loại vé',
          mota: 'Đúng: Loại 2',
          trangthai: 'Đã hậu kiểm',
          giamsatvien: 'Nguyễn Lê Toàn',
          ngaygiamsat: '22/02/2021 07:25:00'
        }
      ],
      formNewSale: {
        tramvao: '',
        tramra: '',
        thoigianban: '',
        soluong: ''
      }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.scrollBarOfTable()
  },
  computed: {
  },
  methods: {

    handleTableChangeCancelTrans (pagination, filters, sorter) {
      this.paginationCancelTrans = pagination
    },
    getData (value) {
      this.pagination = _merge(this.pagination, this.handlePaginationData(this.data))
    },
    clickMenu (item, key) {
      console.log(item, key)
    }

  }
}
</script>
