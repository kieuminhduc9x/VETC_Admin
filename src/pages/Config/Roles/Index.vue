<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/config">Cấu hình</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Nhóm tài khoản </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh sách nhóm tài khoản" key="1">
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="12">
            <div style="display: flex; justify-content: flex-end;margin:35px">
            </div>
            <a-card style="width: 100%; border: none" class="vts-table-container">
              <a-row :gutter="16" type="flex">
                <a-col :span="24">
                  <a-table
                    ref="tb1"
                    :columns="columns"
                    :data-source="data"
                    :rowKey=" (record, index ) => index"
                    :pagination="data.length === 0 ? false : pagination"
                    :loading="loading"
                    :scroll="{ x: '100%' }"
                    :locale="{ emptyText: 'Chưa có dữ liệu' }"
                    @change="handleTableChange"
                    :rowClassName="selectRowTable"
                    class="ant-table-bordered"
                    :customRow="(record) => {
                      return {
                        on: {
                          click: (event) => {
                            this.clickRowData(record)
                          },
                        },
                      };
                    }">
                    <template slot="actionTitle">
                      <a-icon type="control" :style="{fontSize: '14px'}"/>
                    </template>
                    <template slot="rowIndex" slot-scope="text, record, index">
                      <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                    </template>
                    <template slot="code" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.code }}</span>
                        </template>
                        <span>{{ record.code }}</span>
                      </a-tooltip>
                    </template>
                    <template slot="name" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.name }}</span>
                        </template>
                        <span>{{ record.name }}</span>
                      </a-tooltip>
                    </template>
                    <template slot="createBy" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.createBy }}</span>
                        </template>
                        <span>{{ record.createBy }}</span>
                      </a-tooltip>
                    </template>
                    <template slot="createAt" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.createAt }}</span>
                        </template>
                        <span>{{ record.createAt }}</span>
                      </a-tooltip>
                    </template>
                  </a-table>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <div style="display: flex; justify-content: flex-end">
              <a-button
                :loading="loading"
                type="primary"
                class="btn-success uppercase"
                style="margin: 20px"
                @click="showCreate"
              >Thêm nhân viên
              </a-button>
            </div>
            <a-card style="width: 100%; border: none" class="vts-table-container">
              <a-row :gutter="16" type="flex">
                <a-col :span="24">
                  <a-table
                    ref="tb1"
                    :columns="columnsUser"
                    :data-source="dataUser"
                    :rowKey=" (rowKey, index ) => index"
                    :pagination="dataUser.length === 0 ? false : paginationUser"
                    :loading="loading"
                    :scroll="{ x: '100%' }"
                    :locale="{ emptyText: 'Chưa có dữ liệu' }"
                    @change="handleTableChange"
                    class="ant-table-bordered">
                    <template slot="actionTitle">
                      <a-icon type="control" :style="{fontSize: '14px'}"/>
                    </template>
                    <template slot="rowIndex" slot-scope="text, record, index">
                      <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                    </template>
                    <template slot="userName" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.userName }}</span>
                        </template>
                        <span>{{ record.userName }}</span>
                      </a-tooltip>
                    </template>
                    <template slot="fullName" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.fullName }}</span>
                        </template>
                        <span>{{ record.fullName }}</span>
                      </a-tooltip>
                    </template>
                    <template slot="email" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.email }}</span>
                        </template>
                        <span>{{ record.email }}</span>
                      </a-tooltip>
                    </template>
                    <template slot="phone" slot-scope="text, record">
                      <a-tooltip placement="bottomLeft">
                        <template slot="title">
                          <span>{{ record.phone }}</span>
                        </template>
                        <span>{{ record.phone }}</span>
                      </a-tooltip>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                      <a-popover >
                        <template slot="content">
                          <span>Xóa</span>
                        </template>
                        <a-icon @click="confirmRemoveUser(record)" type="delete" style="color: red"></a-icon>
                      </a-popover>
                    </template>
                  </a-table>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
        <div style="display: flex; justify-content: center; margin: 40px">
          <a-button type="default" @click="goToBack">Quay lại</a-button>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <form-warehouse
      v-if="visibleForm === true"
      :visibleForm="visibleForm"
      :isCreate="isCreate"
      :isUpdate="isUpdate"
      :isView="isView"
      :modelObject="modelObject"
      @closeForm="closeForm"
    ></form-warehouse>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import columnsUser from './columnsUser'
import _merge from 'lodash/merge'
import { commonMethods, authComputed } from '@/store/helpers'
import pdf from 'vue-pdf'
import FormWarehouse from './Form'
// import _ from 'lodash'
import {
  deleteWarehouseManagement
} from '@/api/warehouse-management'
import { searchRoles, findByIdRoles, removeUser } from '@/api/Config/roles'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    pdf,
    FormWarehouse
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
      data: [],
      dataUser: [],
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
      paginationUser: {
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
      columnsUser,
      dataPdf: '',
      loadingExport: false,
      loadingPdf: false,
      visibleForm: false,
      isCreate: false,
      isUpdate: false,
      isView: false,
      modelObject: {
        userId: '',
        roleId: ''
      }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.scrollBarOfTable()
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...commonMethods,
    findById (id) {
      findByIdRoles({ roleId: id }).then(rs => {
        if (rs) {
          this.modelObject = rs
          this.dataUser = rs.listUser
        }
      })
    },
    clickRowData (record) {
      this.data.forEach(item => {
        item.selected = false
      })
      this.findById(record.roleId)
      record.selected = true
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    getData () {
      const params = {}
      this.loading = true
      this.data = []
      searchRoles(params).then(res => {
        this.data = this.convertPropToDisplayDate(res)
        this.data.map(item => {
          item.selected = false
          return item
        })
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
        if (this.data.length > 0) {
          this.clickRowData(this.data[0])
        }
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
      }).finally(res => {
        this.loading = false
      })
    },
    showCreate () {
      this.visibleForm = true
      this.isCreate = true
      this.isUpdate = false
      this.isView = false
    },
    showUpdate (record) {
      this.visibleForm = true
      this.isCreate = false
      this.isUpdate = true
      this.isView = false
      this.findById(record.roleId)
    },
    showView (record) {
      this.visibleForm = true
      this.isCreate = false
      this.isUpdate = false
      this.isView = true
      this.findById(record.id)
    },
    closeForm () {
      this.visibleForm = false
      this.modelObject = {}
      this.getData()
    },
    onDeleteRow (record) {
      this.$confirm({
        title: 'Bạn muốn xóa bản ghi này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          if (record.id) {
            this.deleteGL(record.id)
          }
        },
        onCancel () {
        }
      })
    },
    deleteGL (id) {
      const $this = this
      this.loading = true
      deleteWarehouseManagement({ id: id })
        .then(rs => {
          $this.getData()
          this.$success({
            message: 'Quản lý nhà kho',
            description: 'Xóa nhà kho thành công',
            duration: 5
          })
        })
        .catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: '',
            description: msg,
            duration: 5
          })
        }).finally(res => {
          this.loading = false
        })
    },
    selectRowTable (record) {
      if (record.selected === true) {
        return 'bg-select-row'
      } else {
        return ''
      }
    },
    confirmRemoveUser (record) {
      this.$confirm({
        title: 'Bạn muốn xóa nhân viên này khỏi vai trò?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          if (record.userRoleId) {
            this.removeUser(record.userRoleId)
          }
        },
        onCancel () {
        }
      })
    },
    removeUser (id) {
      this.loading = true
      removeUser({ userRoleId: id })
        .then(rs => {
          this.getData()
          this.$success({
            content: 'Xóa nhân viên thành công',
            duration: 5
          })
        })
        .catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: '',
            description: msg,
            duration: 5
          })
        }).finally(res => {
          this.loading = false
        })
    },
    goToBack () {
      this.$router.push({ name: 'config' })
    }
  }
}
</script>
<style lang="less">
.bg-select-row{
  background-color: #e6f6ff;
}
</style>
