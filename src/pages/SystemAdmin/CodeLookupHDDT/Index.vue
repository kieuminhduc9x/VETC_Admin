<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Quản trị hệ thống</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Tra cứu mã HĐĐT </a-breadcrumb-item>
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
          labelAlign="left"
          style="padding: 15px 20px">

          <a-row :gutter="16">
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Trạm vào"
                prop="tramvao"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.tramvao"
                  :disabled="true"
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
                  v-model="form.tramra"
                  :disabled="true"
                >
                  <a-select-option v-for="item in lsTramra" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Mã tra cứu HĐĐT"
                prop="code"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Biển số xe"
                prop="biensoxe"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.biensoxe"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Từ ngày"
                prop="tungay"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  placeholder="Chọn thời gian"
                  v-model="form.tungay"
                  format="DD/MM/YYYY"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Đến ngày"
                prop="denngay"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  placeholder="Chọn thời gian"
                  v-model="form.denngay"
                  format="DD/MM/YYYY"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="24" :md="24">
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
                    :style="{color: 'blue', fontSize: '18px', marginLeft: '8px'}"
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
        tramvao: '1',
        tramra: '1',
        code: 'LT023JFJGDSJFG',
        biensoxe: '',
        tungay: '',
        denngay: ''
      },
      lsTramvao: [
        {
          value: '1',
          name: '--Tất cả--'
        }
      ],
      lsTramra: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      data: [
        {
          rowIndex: '1',
          thoigian: '20/02/2022',
          tramvao: 'Trạm A',
          tramra: 'Trạm B',
          bienso: '13H-13293',
          matracuu: 'LT023JFJGDSJFG',
          loaive: 'Vé lượt loại 1',
          thuphivien: 'Lê Thanh Vân'
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
