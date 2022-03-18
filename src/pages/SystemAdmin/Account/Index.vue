<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item :class="'active'">VETC - Quản lý tài khoản </a-breadcrumb-item>
        </a-breadcrumb>
        <menu-profile></menu-profile>
      </div>
    </template>
    <div>
      <a-row :gutter="16">
        <a-col :xs="24" :lg="24" :md="24">
          <a-card>
            <a-form-model
              :model="filter"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              labelAlign="left">
              <a-row :gutter="16">
                <a-col :xs="24" :md="6" :lg="6">
                  <a-form-model-item
                    label="Từ khóa"
                  >
                    <a-input v-model="filter.keyword">
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" :lg="6">
                  <div >
                    <a-button class="ant-btn-success">Tìm kiếm </a-button>
                  </div>
                </a-col>
              </a-row>
            </a-form-model>

          </a-card>
        </a-col>
        <a-col :xs="24" :lg="24" :md="24">
          <a-card style="width: 100%; border: none" class="vts-table-container">
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
        </a-col>
      </a-row>
    </div>
    <div style="margin-top: 5px">
      <a-card title="Chi tiết tài khoản" style="overflow: scroll; height: 450px; font-size: 12px; ">
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left"
          style="padding: 15px 5px">
          <a-row :gutter="16">
            <a-col :xs="24" :lg="6" :md="6">
              <div style="width: 80%; height: 250px">
                <img src="@/assets/image-fake/avatar.jpeg" alt="VETC" style="width: 100%; height: 100%; border: 0.5px solid gray;border-radius: 5px;">
              </div>
            </a-col>
            <a-col :xs="24" :lg="9" :md="9">
              <a-form-model-item
                label="Họ và tên"
                prop="fullname"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.fullname"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Tài khoản"
                prop="account"
                style="margin-bottom: 20px!important">
                <a-input
                  v-model="form.account"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Ngày sinh"
                prop="birthday"
                style="margin-bottom: 20px!important;">
                <a-date-picker
                  v-model="form.birthday"
                  format="DD/MM/YYYY"></a-date-picker>
              </a-form-model-item>
              <a-form-model-item
                label="Chức vụ"
                prop="position"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.position"
                >
                  <a-select-option v-for="item in listPosition" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Phân quyền"
                prop="permission"
                style="margin-bottom: 15px!important;">
                <a-select
                  v-model="form.permission"
                >
                  <a-select-option v-for="item in listPermission" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="9" :md="9">
              <a-form-model-item
                label="Mã thẻ"
                prop="code"
                style="margin-bottom: 15px!important;">
                <a-input v-model="form.code"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Mật khẩu"
                prop="password"
                style="margin-bottom: 15px!important;">
                <a-input v-model="form.password"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Email"
                prop="email"
                style="margin-bottom: 15px!important;">
                <a-input v-model="form.email"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Trạng thái"
                prop="status"
                style="margin-bottom: 15px!important;">
                <a-select
                  v-model="form.status"
                >
                  <a-select-option v-for="item in listStatus" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <div style="display: flex; justify-content: flex-end">
            <a-button class="ant-btn-success">Lưu</a-button>
          </div>
        </a-form-model>

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
  name: 'WarehouseManagement',
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
      filter: {
        keyword: ''
      },
      form: {
        fullname: 'Nguyễn Mạnh Hùng',
        code: '123456789',
        account: 'hungnm',
        password: '123456789',
        birthday: '2021-03-16',
        email: 'hungnm@gmail.com',
        position: '1',
        status: '1',
        permission: '1'
      },
      listPosition: [
        {
          value: '1',
          name: 'Trưởng ca'
        }
      ],
      listPermission: [
        {
          value: '1',
          name: 'Trưởng ca'
        }
      ],
      listStatus: [
        {
          value: '0',
          name: 'Khóa'
        },
        {
          value: '1',
          name: 'Hoạt động'
        }
      ],
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      data: [
        {
          rowIndex: 1,
          fullname: 'Nguyễn Mạnh Hùng',
          code: '123456789',
          account: 'hungnm',
          password: '123456789',
          birthday: '2021-03-16',
          email: 'hungnm@gmail.com',
          position: 'Trưởng ca',
          status: 'Hoạt động',
          permission: 'Trưởng ca'
        },
        {
          rowIndex: 2,
          fullname: 'Nguyễn Mạnh Hùng',
          code: '123456789',
          account: 'hungnm',
          password: '123456789',
          birthday: '2021-03-16',
          email: 'hungnm@gmail.com',
          position: 'Trưởng ca',
          status: 'Hoạt động',
          permission: 'Trưởng ca'
        },
        {
          rowIndex: 3,
          fullname: 'Nguyễn Mạnh Hùng',
          code: '123456789',
          account: 'hungnm',
          password: '123456789',
          birthday: '2021-03-16',
          email: 'hungnm@gmail.com',
          position: 'Trưởng ca',
          status: 'Hoạt động',
          permission: 'Trưởng ca'
        },
        {
          rowIndex: 4,
          fullname: 'Nguyễn Mạnh Hùng',
          code: '123456789',
          account: 'hungnm',
          password: '123456789',
          birthday: '2021-03-16',
          email: 'hungnm@gmail.com',
          position: 'Trưởng ca',
          status: 'Hoạt động',
          permission: 'Trưởng ca'
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
    showCreate () {
      this.visibleForm = true
      this.isCreate = true
      this.isUpdate = false
    },
    showUpdate (record) {
      this.visibleForm = true
      this.isCreate = false
      this.isUpdate = true
      this.findById(record.id)
      this.warehouseId = record.id
    },
    closeForm () {
      this.visibleForm = false
      this.modelObject = {}
      this.getData()
    },
    getData (value) {
      this.pagination = _merge(this.pagination, this.handlePaginationData(this.data))
    }

  }
}
</script>
