<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Kho vé </a-breadcrumb-item>
        </a-breadcrumb>
        <menu-profile></menu-profile>
      </div>
    </template>
    <div style="margin-top: 5px">
      <a-card>
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left">

          <a-row :gutter="16">
            <a-col :xs="24" :lg="16" :md="16">
              <a-form-model-item
                label="Đơn vị"
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
            </a-col>
            <a-col :xs="24" :lg="6" :md="6">
              <div style="display: flex; justify-content: flex-start">
                <a-button class="ant-btn-success">Tính lại</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
        <br>
        <h3>Tồn kho vé trạm</h3>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="16" :lg="16">
            <a-form-model
              :model="form"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              labelAlign="left">
              <a-form-model-item
                label="Trạm vào"
                prop="tramvao">
                <a-select
                  placeholder="Tất cả"
                  v-model="form.tramvao">
                  <a-select-option v-for="item in lsTramvao" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-form-model>
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
            </a-table>
          </a-col>
          <a-col :xs="24" :md="8" :lg="8">
            <h3>Chi tiết serial</h3>
            <a-table
              ref="tb1"
              :columns="columnsDetail"
              :data-source="dataDetail"
              :rowKey=" (rowKey, index ) => index"
              :pagination="dataDetail.length === 0 ? false : paginationDetail"
              :loading="loading"
              :scroll="{ x: '100%' }"
              :locale="{ emptyText: 'Chưa có dữ liệu' }"
              @change="handleTableChange"
              class="ant-table-bordered">
            </a-table>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="Tổng hợp vé đang giao cho nhân viên">
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="16" :lg="16">
            <a-form-model
              :model="formTotalTicket"
              :label-col="labelColTotal"
              :wrapper-col="wrapperColTotal"
              labelAlign="left">
              <a-row :gutter="16">
                <a-col :xs="24" :lg="12" :md="12">
                  <a-form-model-item
                    label="Nhân viên"
                    prop="nhanvien"
                    style="margin-bottom: 20px!important;">
                    <a-select
                      placeholder="Chọn nhân viên"
                      v-model="formTotalTicket.nhanvien"
                    >
                      <a-select-option v-for="item in lsNhanvien" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :lg="12" :md="12">
                  <a-form-model-item
                    label="Trạm vào"
                    prop="tramvao">
                    <a-select
                      placeholder="Tất cả"
                      v-model="form.tramvao">
                      <a-select-option v-for="item in lsTramvao" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <a-table
              ref="tb1"
              :columns="columnsTotal"
              :data-source="dataTotal"
              :rowKey=" (rowKey, index ) => index"
              :pagination="dataTotal.length === 0 ? false : pagination"
              :loading="loading"
              :scroll="{ x: '100%' }"
              :locale="{ emptyText: 'Chưa có dữ liệu' }"
              @change="handleTableChange"
              class="ant-table-bordered">
            </a-table>
          </a-col>
          <a-col :xs="24" :md="8" :lg="8">
            <h3 style="margin-top: 20px">Chi tiết serial</h3>
            <a-table
              ref="tb1"
              :columns="columnsDetail"
              :data-source="dataDetail"
              :rowKey=" (rowKey, index ) => index"
              :pagination="dataDetail.length === 0 ? false : paginationDetail"
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
import columnsTotal from './columnsTotal'
import _merge from 'lodash/merge'
import moment from 'moment'

const ResizeableTitle = resizeableTitle(columns)
const ResizeableTitle1 = resizeableTitle(columnsDetail)
const ResizeableTitle2 = resizeableTitle(columnsTotal)
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
        cell: ResizeableTitle, ResizeableTitle1, ResizeableTitle2
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
      paginationDetail: {
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
      columnsTotal,
      form: {
        tram: '1',
        tramvao: undefined
      },
      lsTram: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      lsTramvao: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      labelColTotal: { span: 6 },
      wrapperColTotal: { span: 14 },
      formTotalTicket: {
        nhanvien: undefined,
        tramvao: undefined
      },
      lsNhanvien: [
        {
          value: '1',
          name: 'Chọn nhân viên'
        }
      ],
      data: [
        {
          rowIndex: '1',
          loaive: 'Vé lượt loại 1',
          tramvao: 'Trạm A',
          menhgia: '35,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000'
        },
        {
          rowIndex: '2',
          loaive: 'Vé lượt loại 1',
          tramvao: 'Trạm C',
          menhgia: '50,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000'
        },
        {
          rowIndex: '3',
          loaive: 'Vé lượt loại 2',
          tramvao: 'Trạm A',
          menhgia: '60,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000'
        },
        {
          rowIndex: '4',
          loaive: 'Vé lượt loại 3',
          tramvao: 'Trạm A',
          menhgia: '70,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000'
        },
        {
          rowIndex: '5',
          loaive: 'Vé lượt loại 4',
          tramvao: 'Trạm A',
          menhgia: '100,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000'
        },
        {
          rowIndex: '6',
          loaive: 'Vé lượt loại 5',
          tramvao: 'Trạm A',
          menhgia: '150,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000'
        }
      ],
      dataDetail: [
        {
          tuserial: 'TC01/020000001',
          denserial: 'TC01/0200001000'
        }

      ],
      dataTotal: [
        {
          rowIndex: '1',
          loaive: 'Vé lượt loại 1',
          tramvao: 'Trạm A',
          menhgia: '35,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000',
          nhanvien: 'Lê Thanh Nga'
        },
        {
          rowIndex: '2',
          loaive: 'Vé lượt loại 1',
          tramvao: 'Trạm C',
          menhgia: '50,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000',
          nhanvien: 'Lê Thanh Nga'
        },
        {
          rowIndex: '3',
          loaive: 'Vé lượt loại 2',
          tramvao: 'Trạm A',
          menhgia: '60,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000',
          nhanvien: 'Lê Thanh Nga'
        },
        {
          rowIndex: '4',
          loaive: 'Vé lượt loại 3',
          tramvao: 'Trạm A',
          menhgia: '70,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000',
          nhanvien: 'Lê Thanh Nga'
        },
        {
          rowIndex: '5',
          loaive: 'Vé lượt loại 4',
          tramvao: 'Trạm A',
          menhgia: '100,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000',
          nhanvien: 'Lê Thanh Nga'
        },
        {
          rowIndex: '6',
          loaive: 'Vé lượt loại 5',
          tramvao: 'Trạm A',
          menhgia: '150,000',
          kyhieu: 'TC01/02',
          soluongton: '1,000',
          nhanvien: 'Lê Thanh Nga'
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
