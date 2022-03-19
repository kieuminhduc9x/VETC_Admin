<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Tính tồn kho thẻ </a-breadcrumb-item>
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
            <a-col :xs="24" :lg="8" :md="8">
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
            </a-col>
            <a-col :xs="24" :lg="8" :md="8">
              <a-form-model-item
                label="Ngày chốt"
                prop="ngaychot"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  v-model="form.ngaychot"
                  :format="'DD/MM/YYYY'"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="6" :md="6">
              <div style="display: flex; justify-content: flex-start">
                <a-button class="ant-btn-success">Tính tồn kho</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <a-card title="Danh sách ngày đã chốt">
        <a-form-model
          :model="formChotNgay"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left"
          style="padding: 15px 20px">

          <a-row :gutter="16">
            <a-col :xs="24" :lg="8" :md="8">
              <a-form-model-item
                label="Trạm"
                prop="tram"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="formChotNgay.tram"
                  :disabled="true"
                >
                  <a-select-option v-for="item in lsTramChotNgay" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="6" :md="6">
              <a-form-model-item
                label="Từ ngày"
                prop="tungay"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  v-model="formChotNgay.tungay"
                  format="DD/MM/YYYY"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="6" :md="6">
              <a-form-model-item
                label="Đến ngày"
                prop="denngay"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  v-model="formChotNgay.denngay"
                  format="DD/MM/YYYY"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="4" :md="4">
              <div style="display: flex; justify-content: center;">
                <a-button class="ant-btn-success">Tìm kiếm</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
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
              <template slot="action">
                <span style="cursor: pointer">
                  <a-icon
                    type="printer"
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
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import MenuProfile from '@/components/MenuProfile'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
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
      form: {
        tram: '1',
        ngaychot: ''
      },
      lsTram: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formChotNgay: {
        tram: '1',
        tungay: '',
        denngay: ''
      },
      lsTramChotNgay: [
        {
          value: '1',
          name: 'Liêm Tuyền'
        }
      ],
      data: [
        {
          ngaychot: '21/02/2022',
          thietbi: 'Thẻ IC',
          tondau: '1,000',
          nhaptutrungtam: '2,000',
          nhaptrakho: '3,000',
          xuatchonhanvien: '0',
          xuatchotramkhac: '0',
          xuattratrungtam: '0',
          xuathuy: '0',
          toncuoi: '15,000'
        },
        {
          ngaychot: '21/02/2022',
          thietbi: 'Thẻ IC',
          tondau: '10,000',
          nhaptutrungtam: '0',
          nhaptrakho: '3,000',
          xuatchonhanvien: '0',
          xuatchotramkhac: '0',
          xuattratrungtam: '0',
          xuathuy: '0',
          toncuoi: '13,000'
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
