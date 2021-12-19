<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/config">Cấu hình</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Tài khoản</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <template>
      <div style="padding: 3rem">
        <a-row :gutter="16">
          <a-col :xs="24" :md="8" :lg="8">
            <h3 style="font-weight: bold;color: #076885">Danh sách tài khoản</h3>
            <p style="color: #076885">Bạn có thể cấp quyền quản lý cửa hàng cho người khác</p>
            <a-button type="primary" style="margin: 15px 0" @click="goToCreate">
              <a-icon type="plus-circle"></a-icon>Thêm tài khoản</a-button>
            <p style="color: #076885">Bạn có thể đăng xuất các nhân viên quản trị khỏi website cửa hàng của bạn</p>
          </a-col>
          <a-col :xs="24" :md="16" :lg="16">
            <div style="margin: 10px 0">
              <a-row :gutter="16">
                <a-col :sx="24" :md="12" :lg="12"></a-col>
                <a-col :sx="24" :md="12" :lg="12">
                  <a-input placeholder="Tìm kiếm tài khoản">
                    <a-icon slot="prefix" type="search"></a-icon>
                  </a-input>
                </a-col>
              </a-row>
            </div>
            <a-card style="border: none">
              <a-table
                :columns="columns"
                :dataSource="data"
                :rowKey=" (rowKey, index ) => index"
                :pagination="data.length === 0 ? false : pagination"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                bordered>
                <template slot="name" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      {{ record.fullName }}
                    </template>
                    <span style="display: block;color: #076885; font-weight: bold; text-align: left; cursor: pointer" @click="goToUpdate(record)">{{ record.fullName }}</span>
                  </a-tooltip>
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      {{ record.email }}
                    </template>
                    <span><img src="@/assets/mail.svg" alt="MAIL" style="margin-right: 5px">{{ record.email }}</span>
                  </a-tooltip>
                </template>
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="roleName" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      {{ record.roleName }}
                    </template>
                    {{ record.roleName }}
                  </a-tooltip>
                </template>
                <template slot="actionTitle">
                  <a-icon type="control" />
                </template>
                <template slot="operation" slot-scope="text, record">
                  <a-icon @click="deleteRecord(record)" type="delete" style="color: red"/>
                </template>
              </a-table>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="24" :lg="24">
            <div style="display: flex; justify-content: center; margin: 20px 0">
              <a-button type="default" @click="goToConfig">Quay lại</a-button>
            </div>
          </a-col>
        </a-row>
      </div>
    </template>
  </main-layout>
</template>
<script>
import MainLayout from '@/pages/layouts/MainLayout'
import columns from './columns'
import { searchAccount, deleteAccount } from '@/api/Config/accounts'
import _ from 'lodash'

export default {
  components: {
    MainLayout
  },
  data () {
    return {
      columns,
      data: [
        {
          name: 'Kiều Minh Đức',
          email: 'kieuduc1999tn@gmail.com',
          role: 'Quyền thêm người dùng'
        }
      ],
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
      filters: {
        name: ''
      },
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    goToCreate () {
      this.$router.push({ name: 'config.account.create' })
    },
    goToUpdate (record) {
      this.$router.push({ name: 'config.account.update', params: { id: record.userId } })
    },
    search () {

    },
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = false
      this.data = []
      searchAccount(_.merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _.merge(this.pagination, this.handlePaginationData(res))
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
    deleteRecord (record) {
      const $this = this
      this.$confirm({ content: 'Bạn chắc chắn muốn xóa tài khoản này?',
        onOk () {
          $this.deleteAccount(record)
        }
      })
    },
    deleteAccount (record) {
      const params = {
        secUserId: record.userId
      }
      this.loading = true
      deleteAccount(params).then(rs => {
        if (rs) {
          this.$success({ content: 'Xóa tài khoản thành công' })
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
    goToConfig () {
      this.$router.push({ name: 'config' })
    }
  }
}
</script>
