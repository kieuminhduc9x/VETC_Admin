<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Quản lý phiếu xuất </a-breadcrumb-item>
        </a-breadcrumb>
        <menu-profile></menu-profile>
      </div>
    </template>
    <div style="margin-top: 5px">
      <a-card title="Thông tin phiếu xuất">
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left">

          <a-row :gutter="16">
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Trạm"
                prop="tram"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.tram"
                  :disabled="true"
                >
                  <a-select-option v-for="item in lsTram" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Số phiếu"
                prop="sophieu"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.sophieu"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Phương thức"
                prop="phuongthuc"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.phuongthuc"
                >
                  <a-select-option :key="'all'" :value="'all'">
                    -- Tất cả --
                  </a-select-option>
                  <a-select-option v-for="item in lsPhuongthuc" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Người nhận"
                prop="nguoilap"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.nguoilap"
                >
                  <a-select-option :key="'all'" :value="'all'">
                    -- Tất cả --
                  </a-select-option>
                  <a-select-option v-for="item in lsNguoinhan" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-row :gutter="16">
                <a-col :xs="24" :md="12" :lg="12">
                  <a-form-model-item
                    label="Từ ngày"
                    prop="tungay"
                    style="margin-bottom: 20px!important;">
                    <a-date-picker
                      v-model="form.tungay"
                      format="DD/MM/YYYY"></a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" :lg="12">
                  <a-form-model-item
                    label="Đến ngày"
                    prop="denngay"
                    style="margin-bottom: 20px!important;">
                    <a-date-picker
                      v-model="form.denngay"
                      format="DD/MM/YYYY"></a-date-picker>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-form-model-item
                label="Số chứng từ"
                prop="sochungtu"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.sochungtu"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Ca"
                prop="ca"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.ca"
                >
                  <a-select-option :key="'all'" :value="'all'">
                    -- Tất cả --
                  </a-select-option>
                  <a-select-option v-for="item in lsCa" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Xuất đến"
                prop="xuatden"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.xuatden"
                >
                  <a-select-option :key="'all'" :value="'all'">
                    -- Tất cả --
                  </a-select-option>
                  <a-select-option v-for="item in lsXuatden" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <div style="display: flex; justify-content: center">
                <a-button class="ant-btn-success">Thêm phiếu xuất</a-button>
                <a-button class="ant-btn-success">Tìm kiếm</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <a-card title="Danh sách phiếu xuất">
        <div slot="extra">
          <a-button class="ant-btn-success">Excel</a-button>
        </div>
        <a-row :gutter="16" type="flex">
          <a-col :span="24">
            <a-table
              ref="tb1"
              :columns="columns"
              :data-source="data"
              :rowKey=" (rowKey, index ) => index"
              :pagination="data.length === 0 ? false : pagination"
              :loading="loading"
              :scroll="{ x: '100%' }"
              :locale="{ emptyText: 'Chưa có dữ liệu' }"
              @change="handleTableChange"
              class="ant-table-bordered">
              <template slot="ngaylap" slot-scope="text, record">
                {{ moment(record.ngaylap).format('DD/MM/YYYY') }}
              </template>
              <template slot="action">
                <span style="cursor: pointer">
                  <a-icon
                    type="printer"
                    :style="{color: 'blue', fontSize: '14px', marginLeft: '8px'}"
                  />
                </span>
                <span style="cursor: pointer">
                  <a-icon
                    type="edit"
                    :style="{color: 'blue', fontSize: '14px', marginLeft: '8px'}"
                  />
                </span>
                <span style="cursor: pointer">
                  <a-icon
                    type="delete"
                    :style="{color: 'red', fontSize: '14px', marginLeft: '8px'}"
                  />
                </span>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="Chi tiết phiếu xuất">
        <a-row :gutter="16" type="flex">
          <a-col :span="24">
            <a-table
              ref="tb1"
              :columns="columnsDetail"
              :data-source="dataDetail"
              :rowKey=" (rowKey, index ) => index"
              :pagination="dataDetail.length === 0 ? false : pagination"
              :loading="loading"
              :scroll="{ x: '100%' }"
              :locale="{ emptyText: 'Chưa có dữ liệu' }"
              @change="handleTableChange"
              class="ant-table-bordered">
            </a-table>
          </a-col>
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
import columns from './columns'
import columnsDetail from './columnsDetail'
import _merge from 'lodash/merge'
import moment from 'moment'

const ResizeableTitle = resizeableTitle(columns)
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
        cell: ResizeableTitle
      }
    }
    return {
      moment,
      activeSearchKey: 1,
      activeResultKey: 1,
      pagination: {
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
      columns,
      columnsDetail,
      form: {
        tram: '1',
        sophieu: 'PN20022022001',
        phuongthuc: 'all',
        nguoilap: 'all',
        tungay: '2022-03-16',
        denngay: '2022-03-16',
        ca: 'all',
        sochungtu: '123456789',
        xuatden: 'all'
      },
      lsTram: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      lsPhuongthuc: [
        {
          value: '1',
          name: 'Xuất thẻ cho nhân viên'
        },
        {
          value: '2',
          name: 'Xuất trả thẻ hỏng'
        },
        {
          value: '3',
          name: 'Xuất cho trạm khác'
        }
      ],
      lsNguoinhan: [
        {
          value: '1',
          name: 'Hoàng My'
        }
      ],
      lsCa: [
        {
          value: '1',
          name: 'Ca 2'
        }
      ],
      lsXuatden: [
        {
          value: '1',
          name: 'Xuất thẻ cho nhân viên'
        },
        {
          value: '2',
          name: 'Xuất trả thẻ hỏng'
        },
        {
          value: '3',
          name: 'Xuất cho trạm khác'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formDetail: {
        thietbi: '1',
        soluong: '',
        inphieuxuat: false
      },
      lsThietbi: [
        {
          value: '1',
          name: 'Thẻ IC'
        }
      ],
      data: [
        {
          rowIndex: '1',
          tram: 'Trạm B',
          sophieu: 'PN20022022001',
          sochungtu: '123456789',
          ngaylap: '2021-02-20',
          nguoilap: 'Nguyễn Hạnh',
          nguoigiao: 'Hoàng My',
          xuatden: 'Hà Thanh Vân',
          ca: '2',
          phuongthuc: 'Nhập thẻ mới từ trung tâm',
          ghichu: ''
        },
        {
          rowIndex: '2',
          tram: 'Trạm B',
          sophieu: 'PN20022022001',
          sochungtu: '123456789',
          ngaylap: '2021-02-20',
          nguoilap: 'Nguyễn Hạnh',
          nguoigiao: 'Hoàng My',
          xuatden: 'Hà Thanh Vân',
          ca: '2',
          phuongthuc: 'Nhập thẻ mới từ trung tâm',
          ghichu: ''
        }
      ],
      dataDetail: [
        {
          rowIndex: '1',
          thietbi: 'Thẻ IC',
          soluong: '1,000'
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

    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
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
