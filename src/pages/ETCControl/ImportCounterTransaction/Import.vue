<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Đối soát ETC</a-breadcrumb-item>
          <a-breadcrumb-item >Import đối soát giao dịch</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Import </a-breadcrumb-item>
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
            <a-col :xs="24" :lg="8" :md="8">
              <a-form-model-item
                label="Chọn file"
                prop="tenfile"
                style="margin-bottom: 20px!important;">
                <a-input
                  v-model="form.tenfile"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="4" :md="4">
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <a-button> <a-icon type="upload" /> upload </a-button>
              </a-upload>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <div style="display: flex; justify-content: center; margin: 0px 0">
                <a-button class="ant-btn-success">Import</a-button>
                <a-button class="ant-btn-success">Đối soát</a-button>
                <a-button class="ant-btn-success">Xóa</a-button>
                <a-button class="ant-btn-success" @click="goToBack">Quay lại</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <a-card title="Danh sách giao dịch">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-table
              ref="tb1"
              :columns="columnsImport"
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
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import MenuProfile from '@/components/MenuProfile'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columnsImport from './columnsImport'
import _merge from 'lodash/merge'

const ResizeableTitle = resizeableTitle(columnsImport)
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
      columnsImport,
      form: {
        tenfile: ''
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      data: [
        {
          rowIndex: '1',
          magiaodich: '43546544',
          thoigianvaotram: '21/02/2021 07:00:00',
          thoigianratram: '21/02/2021 07:01:30',
          biensoxe: '30H-19322',
          etag: '87427483748',
          loaixe: 'Xe < 12 chỗ, x',
          tramvao: 'Trạm A',
          loaitram: 'Trạm kín',
          loaive: 'Vé lượt',
          loaigiave: 'Giá thường',
          sotaikhoan: 'E0198763837',
          trangthai: 'Trừ tiền thành công',
          tienthue: '31,500',
          tienchuathue: '3,500',
          tienbaogomthue: '35,000',
          lydo: '',
          nguongiaodich: 'ETC'
        },
        {
          rowIndex: '2',
          magiaodich: '43546466',
          thoigianvaotram: '21/02/2021 07:30:34',
          thoigianratram: '21/02/2021 07:31:40',
          biensoxe: '14A-35434',
          etag: '89894377483',
          loaixe: 'Xe < 12 chỗ, x',
          tramvao: 'Trạm C',
          loaitram: 'Trạm kín',
          loaive: 'Vé lượt',
          loaigiave: 'Giá thường',
          sotaikhoan: 'E0134676542',
          trangthai: 'Trừ tiền thành công',
          tienthue: '31,500',
          tienchuathue: '3,500',
          tienbaogomthue: '35,000',
          lydo: '',
          nguongiaodich: 'ETC'
        },
        {
          rowIndex: '3',
          magiaodich: '4353453',
          thoigianvaotram: '21/02/2021 10:20:00',
          thoigianratram: '21/02/2021 10:22:12',
          biensoxe: '29A-14674',
          etag: '12243483998',
          loaixe: 'Xe < 12 chỗ, x',
          tramvao: 'Trạm A',
          loaitram: 'Trạm kín',
          loaive: 'Vé lượt',
          loaigiave: 'Giá thường',
          sotaikhoan: 'E0134986573',
          trangthai: 'Trừ tiền thành công',
          tienthue: '31,500',
          tienchuathue: '3,500',
          tienbaogomthue: '35,000',
          lydo: '',
          nguongiaodich: 'ETC'
        },
        {
          rowIndex: '4',
          magiaodich: '4353453',
          thoigianvaotram: '21/02/2021 11:23:56',
          thoigianratram: '21/02/2021 11:24:20',
          biensoxe: '30H-97765',
          etag: '12438934893',
          loaixe: 'Xe 12-30 chỗ',
          tramvao: 'Trạm A',
          loaitram: 'Trạm kín',
          loaive: 'Vé lượt',
          loaigiave: 'Giá thường',
          sotaikhoan: 'E0176353533',
          trangthai: 'Trừ tiền thành công',
          tienthue: '45,000',
          tienchuathue: '5,000',
          tienbaogomthue: '50,000',
          lydo: '',
          nguongiaodich: 'ETC'
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
    goToBack () {
      this.$router.push({ name: 'import_counter_transaction' })
    }

  }
}
</script>
