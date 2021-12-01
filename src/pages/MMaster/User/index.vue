<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Danh mục người sử dụng</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm người sử dụng" key="1">
          <a-card style="width: 100%;border: none" class="search-container" >
            <a-row :gutter="16" type="flex" justify="center">

              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="provinceCode" label="Tỉnh/TP">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.provinceCode"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
                    <a-select-option
                      v-for="item in listProvinces"
                      :key="'p-g-' + item.provinceCode"
                      :value="item.provinceCode">{{ item.provinceName }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="userName" label="Tên đăng nhập">
                  <a-input v-model="filters.userName"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="email" label="Email">
                  <a-input v-model="filters.email"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="phone" label="Điện thoại">
                  <a-input v-model="filters.phone"/>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col
                :xs="24"
                :md="24"
                :lg="24"
                class="filter-item-container"
                style="display: flex;flex-wrap: wrap; margin-top: 17px; justify-content: center">
                <a-button type="primary" class="btn-success uppercase" @click="search">Tìm kiếm </a-button>
                <a-button class="btn-success uppercase" @click="resetForm" style="margin-left: 10px">Nhập lại </a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh sách người sử dụng" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row>

            <a-col :span="24" class="cus-flex-end">
              <a-button
                class="ant-btn ant-btn-primary"
                :style="{marginLeft: '8px'}"
                @click="addNew"
              >
                Thêm nhân viên
              </a-button>

            </a-col>
          </a-row>
          <a-row :gutter="16" type="flex">
            <a-col :span="24">
              <div class="wrapper1">
                <div class="div1"></div>
              </div>
              <a-table
                ref="tb1"
                :columns="columns"
                :data-source="data"
                :rowKey=" (rowKey, index ) => index"
                :pagination="data.length === 0 ? false : pagination"
                :loading="loading"

                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                class="ant-table-bordered">
                <template slot="actionTitle">
                  <a-icon type="control" :style="{fontSize: '14px'}"/>
                </template>
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <div >
                    <span @click="onEditRow(record)" class="vna-link">Sửa</span>

                    <span
                      @click="onDeleteRow(record)"
                      class="vna-link"
                      style="padding-left:12px;cursor: pointer">
                      Xóa
                    </span>
                    <span
                      @click="onResetPassword(record)"
                      class="vna-link"
                      style="padding-left:12px;cursor: pointer">
                      Reset pass
                    </span>

                  </div>
                </template>
                <ListHub slot="expandedRowRender" slot-scope="text" v-if="text.userId" :user-object="text"></ListHub>

              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-modal
      :title="modalTitle"
      :visible="modalSync"
      :maskClosable="false"
      :footer="null"
      width="50%"
      @cancel="handleCancelModal"
    >
      <model-form
        v-if="modalSync"
        :is-editable="modalIsEdit"
        :is-view="false"
        :is-create="modalIsCreate"
        @closeModal="handleCancelModal"
        :modelData="modalObjectEdit"></model-form>
    </a-modal>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import { SearchSecUser, RemoveSecUser, ResetPassword } from '@/api/user'
import { commonMethods, authComputed } from '@/store/helpers'
import Form from './Form'
import ListHub from './_List_Hub'

import _merge from 'lodash/merge'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    ModelForm: Form,
    ListHub
  },
  mixins: [TableEmptyText],
  name: 'HubStart',
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      modalTitle: 'Thêm mới nhân viên',
      modalSync: false,
      modalIsEdit: false,
      modalIsCreate: false,
      modalObjectEdit: {},
      activeSearchKey: 1,
      activeResultKey: 1,
      data: [],
      expandedRowKeys: [],

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
      filters: {
        provinceCode: '',
        userName: '',
        email: '',
        phone: ''
      },
      rules: {
        provinceCode: [
          // { required: true, message: 'Tỉnh/TP không được phép trống' }
        ]
      },
      endOpen: false,
      visible: false,
      confirmLoading: false,
      listProvinces: []
    }
  },
  created () {
    this.getProvinces()
    this.getData()
  },
  computed: {
    ...authComputed,
    formValidate () {
      return {
        items: this.data
      }
    }
  },
  methods: {
    ...commonMethods,
    handleCancelModal (reload = false) {
      this.modalSync = false
      if (reload) {
        this.getData()
      }
    },
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
        this.listToProvinces = res
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
      this.search()
    },
    onTrim (string) {
      return string.trim()
    },
    rowKey (record, index) {
      record.rowKey = index
      return record.rowKey
    },

    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    search (e) {
      e.preventDefault()
      this.$refs.ruleForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.pagination.current = 1
          this.getData()
        }
      })
    },
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = true
      this.data = []
      SearchSecUser(_merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
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
    openNotification (e) {
      e.preventDefault()
      this.$notification.success({
        message: 'Nhận vận đơn',
        description:
            'Nhận vận đơn thành công',
        duration: 5
      })
    },
    addNew () {
      this.modalTitle = 'Thêm mới nhân viên'
      this.modalIsCreate = true
      this.modalIsEdit = false
      this.modalSync = true
    },
    onEditRow (record) {
      this.modalObjectEdit = record
      this.modalTitle = 'Cập nhật nhân viên'
      this.modalIsCreate = false
      this.modalIsEdit = true
      this.modalSync = true
    },
    onDeleteRow (record, index) {
      this.$confirm({
        title: 'Bạn có muốn xóa nhân viên này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.deleteRow(record.userId)
        },
        onCancel () {
        }
      })
    },
    deleteRow (id) {
      const $this = this
      this.loading = true
      RemoveSecUser({ secUserId: id })
        .then(rs => {
          this.$notification.success({
            message: 'Xóa nhân viên',
            description:
              'Xóa nhân viên thành công',
            duration: 5
          })
          $this.getData()
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
    onResetPassword (record, index) {
      this.$confirm({
        title: 'Bạn có muốn đặt lại mật khẩu của nhân viên này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.resetPassword(record.userId)
        },
        onCancel () {
        }
      })
    },
    resetPassword (id) {
      const $this = this
      this.loading = true
      ResetPassword({ secUserId: id })
        .then(rs => {
          this.$notification.success({
            message: 'Đặt lại mật khẩu',
            description:
              'Đặt lại mật khẩu thành công',
            duration: 5
          })
          $this.getData()
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
    }
  }
}
</script>
