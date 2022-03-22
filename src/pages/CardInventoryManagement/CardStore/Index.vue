<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Kho thẻ </a-breadcrumb-item>
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
        <h3>Tồn kho hiện tại</h3>
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
            </a-table>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="Tổng hợp thẻ đang giao cho nhân viên">
        <a-form-model
          :model="formTotalCard"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left">

          <a-row :gutter="16">
            <a-col :xs="24" :lg="16" :md="16">
              <a-form-model-item
                label="Nhân viên"
                prop="nhanvien"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="formTotalCard.nhanvien"
                >
                  <a-select-option v-for="item in lsNhanvien" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
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
        tram: '1'
      },
      lsTram: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formTotalCard: {
        nhanvien: '1'
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
          tram: 'Trạm B',
          thietbi: 'Thẻ IC',
          soluongthe: '3,000'
        }
      ],
      dataDetail: [
        {
          rowIndex: '1',
          thietbi: 'Thẻ IC',
          soluong: '1,000',
          nguoiduocgiao: 'Hà Thanh Vân'
        },
        {
          rowIndex: '2',
          thietbi: 'Thẻ IC',
          soluong: '2,000',
          nguoiduocgiao: 'Trần Quốc Nghĩa'
        },
        {
          rowIndex: '3',
          thietbi: 'Thẻ IC',
          soluong: '1,500',
          nguoiduocgiao: 'Nguyễn Thị Hồng Vân'
        },
        {
          rowIndex: '4',
          thietbi: 'Thẻ IC',
          soluong: '1,200',
          nguoiduocgiao: 'Lê Khánh Huy'
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
