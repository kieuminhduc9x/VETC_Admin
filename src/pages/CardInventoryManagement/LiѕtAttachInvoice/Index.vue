<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Lập bảng kê </a-breadcrumb-item>
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
            <a-col :xs="24" :lg="6" :md="6">
              <a-form-model-item
                label="Ngày "
                prop="ngay"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  placeholder="Chọn thời gian"
                  v-model="form.ngay"
                  :format="'DD/MM/YYYY'"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="6" :md="6">
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
                <a-select
                  v-model="form.batdauca"
                >
                  <a-select-option v-for="item in lsBatdauca" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Kết thúc ca"
                prop="ketthucca"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.ketthucca"
                >
                  <a-select-option v-for="item in lsKetthucca" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="24" :md="24">
              <div style="display: flex; justify-content: center">
                <a-button class="ant-btn-success" >Tìm kiếm</a-button>
                <a-button class="ant-btn-success">Lập bảng kê</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <a-card>
        <a-row :gutter="16">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="Bảng kê hướng vào">
              <div style="display: flex; justify-content: flex-end; margin: 10px 0">
                <a-button class="ant-btn-success">Tính lại bảng kê</a-button>
                <a-button class="ant-btn-success">Trả kho</a-button>
              </div>
              <a-table
                ref="tb1"
                :columns="columnsListIn"
                :data-source="dataListIn"
                :rowKey=" (rowKey, index ) => index"
                :pagination="dataListIn.length === 0 ? false : paginationListIn"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChangeListIn"
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
              <br>
              <h3>Chi tiết</h3>
              <a-table
                ref="tb1"
                :columns="columnsListInDetail"
                :data-source="dataListInDetail"
                :rowKey=" (rowKey, index ) => index"
                :pagination="dataListInDetail.length === 0 ? false : paginationListInDetail"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChangeListInDetail"
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
            <a-tab-pane key="2" tab="Bảng kê hướng ra">
              <div style="display: flex; justify-content: flex-end; margin: 10px 0">
                <a-button class="ant-btn-success">Tính lại bảng kê</a-button>
                <a-button class="ant-btn-success">Xử lý CL</a-button>
                <a-button class="ant-btn-success">Nhập kho</a-button>
              </div>
              <a-table
                ref="tb1"
                :columns="columnsListOut"
                :data-source="dataListOut"
                :rowKey=" (rowKey, index ) => index"
                :pagination="dataListOut.length === 0 ? false : paginationListOut"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChangeListOut"
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
              <br>
              <h3>Chi tiết</h3>
              <a-table
                ref="tb1"
                :columns="columnsListOutDetail"
                :data-source="dataListOutDetail"
                :rowKey=" (rowKey, index ) => index"
                :pagination="dataListOutDetail.length === 0 ? false : paginationListOutDetail"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChangeListOutDetail"
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
import columnsListIn from './columnsListIn'
import columnsListOut from './columnsListOut'
import columnsListInDetail from './columnsListInDetail'
import columnsListOutDetail from './columnsListOutDetail'
import _merge from 'lodash/merge'
import moment from 'moment'

const ResizeableTitle1 = resizeableTitle(columnsListIn)
const ResizeableTitle2 = resizeableTitle(columnsListOut)
const ResizeableTitle3 = resizeableTitle(columnsListOutDetail)
const ResizeableTitle4 = resizeableTitle(columnsListInDetail)
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
        cell: ResizeableTitle1, ResizeableTitle2, ResizeableTitle3, ResizeableTitle4
      }
    }
    return {
      moment,
      columnsListIn,
      columnsListInDetail,
      columnsListOut,
      columnsListOutDetail,
      activeSearchKey: 1,
      activeResultKey: 1,
      paginationListIn: {
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
      paginationListInDetail: {
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
      paginationListOut: {
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
      paginationListOutDetail: {
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
        ngay: '2021-02-21',
        ca: '',
        batdauca: '1',
        ketthucca: '1'
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
      lsBatdauca: [
        {
          value: '1',
          name: '22/02/2021 06:05:00 - Làn 02'
        }
      ],
      lsKetthucca: [
        {
          value: '1',
          name: '22/02/2021 12:00:00 - Làn 02'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      dataListIn: [
        {
          ngay: '22/02/2021',
          ca: 'ca 2',
          nhanvien: 'Nguyễn Thanh Vân',
          lan: 'Làn 02',
          batdau: '06:05:00',
          ketthuc: '12:00:00',
          tram: 'Trạm B'
        }
      ],
      dataListInDetail: [
        {
          thietbi: 'Thẻ IC',
          tondau: '0',
          nhantrongca: '1,000',
          bantrongca: '900',
          tralaikho: '100',
          toncuoi: '0'
        }
      ],
      dataListOut: [
        {
          ngay: '22/02/2021',
          ca: 'ca 2',
          soluong: '300',
          thanhtien: '12,500,000',
          lan: 'Làn 02',
          batdau: '06:05:00',
          ketthuc: '12:00:00',
          tram: 'Trạm B'
        }
      ],
      dataListOutDetail: [
        {
          rowIndex: '1',
          loaixe: 'Xe loại 2',
          thietbi: 'Thẻ IC',
          tramvao: 'Trạm B',
          giave: '35,000',
          soluongcothe: '100',
          soluongkhongthe: '0',
          tongtien: '3,500,000'
        },
        {
          rowIndex: '2',
          loaixe: 'Xe loại 3',
          thietbi: 'Thẻ IC',
          tramvao: 'Trạm B',
          giave: '45,000',
          soluongcothe: '300',
          soluongkhongthe: '0',
          tongtien: '9,000,000'
        }
      ]
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

    handleTableChangeListIn (pagination, filters, sorter) {
      this.paginationListIn = pagination
    },
    handleTableChangeListInDetail (pagination, filters, sorter) {
      this.paginationListInDetail = pagination
    },
    handleTableChangeListOut (pagination, filters, sorter) {
      this.paginationListOut = pagination
    },
    handleTableChangeListOutDetail (pagination, filters, sorter) {
      this.paginationListOutDetail = pagination
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
