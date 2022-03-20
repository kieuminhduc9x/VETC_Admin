<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Đối soát ETC</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Tạo giao dịch ETC</a-breadcrumb-item>
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
                  format="DD/MM/YYY"
                  v-model="form.ngaydoisoat"></a-date-picker>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Mã giao dịch"
                prop="magiaodich"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.magiaodich"></a-input>
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
          </a-row>
          <div style="display: flex; justify-content: center; margin: 15px 0">
            <a-button class="ant-btn-success" @click="showModalCreate">Thêm</a-button>
            <a-button class="ant-btn-success">Tìm kiếm</a-button>
          </div>
        </a-form-model>
      </a-card>
      <a-card title="Danh sách giao dịch">
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
    <modal-create
      v-if="visibleModal === true"
      :visible-modal="visibleModal"
      :is-create="isCreate"
      :is-update="isUpdate"
      :modelObject="modelObject"
      @closeModal="closeModal"></modal-create>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import MenuProfile from '@/components/MenuProfile'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import ModalCreate from '@/pages/ETCControl/CreateTransactionETC/ModalCreate'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    MenuProfile,
    ModalCreate
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
        magiaodich: '',
        biensoxe: ''
      },
      lsTram: [
        {
          value: '1',
          name: 'Liêm Tuyền'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      data: [
        {
          rowIndex: '1',
          magiaodich: '43546544',
          maetag: '87427483748',
          thoigiangiaodich: '22/02/2021 06:30:00',
          lanxe: 'Làn 01',
          nhanvien: 'Vũ Đạt',
          ca: 'Ca 2',
          giave: '35,000',
          biensoxe: '30H-19322',
          trangthaibe: 'commit',
          trangthaihaukiem: 'commit',
          loaive: 'Vé thường',
          loaibienso: 'Biển trắng',
          ghichu: ''
        }
      ],
      visibleModal: false,
      isCreate: false,
      isUpdate: false,
      modelObject: {}
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
    },
    showModalCreate () {
      this.visibleModal = true
      this.isCreate = true
      this.isUpdate = false
    },
    closeModal () {
      this.visibleModal = false
    }

  }
}
</script>
