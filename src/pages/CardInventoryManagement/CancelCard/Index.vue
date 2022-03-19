<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Hủy thẻ </a-breadcrumb-item>
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
              <a-form-model-item
                label="Biển số xe"
                prop="biensoxe"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.biensoxe"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Ngày lập"
                prop="ngaylap"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  v-model="form.ngaylap"
                  format="DD/MM/YYYY"></a-date-picker>
              </a-form-model-item>
              <a-form-model-item
                label="Làn"
                prop="lan"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.lan"
                >
                  <a-select-option v-for="item in lsLan" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Trạng thái"
                prop="trangthai"
                style="margin-bottom: 15px!important;">
                <a-select
                  v-model="form.trangthai"
                >
                  <a-select-option :key="'all'" :value="'all'">
                    --Tất cả--
                  </a-select-option>
                  <a-select-option v-for="item in lsTrangthai" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <div style="display: flex; justify-content: center;margin-top: 20px ">
            <a-button class="ant-btn-success" style="margin-right: 20px">Tìm kiếm</a-button>
          </div>
        </a-form-model>
      </a-card>
      <a-card title="Danh sách giao dịch mất thẻ">
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
              class="ant-table-bordered"
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
              <template slot="action">
                <span style="cursor: pointer">
                  <a-icon
                    type="delete"
                    :style="{color: 'red', fontSize: '18px'}"
                  />
                </span>
              </template>
            </a-table>
            <div style="display: flex; justify-content: flex-end;margin-top: 20px ">
              <a-button class="ant-btn-success" style="margin-right: 20px">Hủy thẻ</a-button>
              <a-button class="ant-btn-success" style="margin-right: 20px">In biên bản</a-button>
            </div>
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
      selectedRowKeys: [],
      form: {
        tram: '1',
        ca: '1',
        biensoxe: '',
        ngay: '2022-16-03',
        lan: '1',
        trangthai: 'all'
      },
      lsTram: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      lsLan: [
        {
          value: '1',
          name: 'Lan 02'
        }
      ],
      lsCa: [
        {
          value: '1',
          name: 'Ca 2'
        }
      ],
      lsTrangthai: [
        {
          value: '1',
          name: 'Chưa xử lý'
        },
        {
          value: '2',
          name: 'Đã hậu kiểm'
        },
        {
          value: '3',
          name: 'Đã khóa thẻ'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      data: [
        {
          rowIndex: '1',
          thoigian: '2022-02-20',
          tramvao: 'Trạm A',
          tramra: 'Trạm B',
          biensoxe: '30A-12893',
          loaive: 'Vé lượt loại 1',
          giave: '35,000',
          thuphivien: 'Lê Thanh Nga',
          tinhtrang: 'Chưa xử lý',
          phanloai: 'Lái xe làm mất'
        },
        {
          rowIndex: '2',
          thoigian: '2022-02-20',
          tramvao: 'Trạm A',
          tramra: 'Trạm B',
          biensoxe: '14H-97673',
          loaive: 'Vé lượt loại 1',
          giave: '35,000',
          thuphivien: 'Lê Thanh Nga',
          tinhtrang: 'Đã hậu kiểm',
          phanloai: 'Lái xe làm mất'
        },
        {
          rowIndex: '2',
          thoigian: '2022-02-20',
          tramvao: 'Trạm A',
          tramra: 'Trạm B',
          biensoxe: '18T-43933',
          loaive: 'Vé lượt loại 1',
          giave: '35,000',
          thuphivien: 'Lê Thanh Nga',
          tinhtrang: 'Đã khóa thẻ',
          phanloai: 'Lái xe làm mất'
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
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }

  }
}
</script>
