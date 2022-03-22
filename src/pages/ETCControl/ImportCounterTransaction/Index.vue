<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Đối soát ETC</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Import đối soát giao dịch</a-breadcrumb-item>
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
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Ngày đối soát"
                prop="ngaydoisoat"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  placeholder="Chọn thời gian"
                  format="DD/MM/YYY"
                  v-model="form.ngaydoisoat"></a-date-picker>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Ngày bắt đầu"
                prop="ngaybatdau"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  placeholder="Chọn thời gian"
                  format="DD/MM/YYY"
                  v-model="form.ngaybatdau"></a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Ngày kết thúc"
                prop="ngayketthuc"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  placeholder="Chọn thời gian"
                  format="DD/MM/YYY"
                  v-model="form.ngayketthuc"></a-date-picker>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Tổng tiền"
                prop="tongtien"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.tongtien"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Tên file"
                prop="tenfile"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.tenfile"></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <div style="display: flex; justify-content: center; margin: 15px 0">
            <a-button class="ant-btn-success">Thêm</a-button>
            <a-button class="ant-btn-success">Tìm kiếm</a-button>
            <a-button class="ant-btn-success">Xuất excel</a-button>
          </div>
        </a-form-model>
      </a-card>
      <a-card title="Lịch sử đối soát">
        <a-row :gutter="16">
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
                    @click="goToImport"
                    type="upload"
                    :style="{color: 'blue', fontSize: '18px', marginLeft: '8px'}"
                  />
                </span>
                <span style="cursor: pointer">
                  <a-icon
                    type="form"
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
      form: {
        tram: '1',
        ngaydoisoat: '',
        ngaybatdau: '',
        ngayketthuc: '',
        tongtien: '',
        tenfile: ''
      },
      lsTram: [
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
          sophieu: '232',
          ngaybatdau: '21/02/2021 06:00:00',
          ngayketthuc: '21/02/2021 06:30:00',
          tentram: 'Trạm B',
          ngaylapbe: '21/02/2021',
          loaive: 'Vé lượt',
          ngaytao: '22/02/2021 13:14:00',
          nguoitao: 'Nguyễn Thanh Hòa',
          tongtien: '100,000,000',
          ghichu: ''
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
    goToImport () {
      this.$router.push({ name: 'import_counter_transaction_import' })
    }

  }
}
</script>
