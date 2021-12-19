<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Quản lý đơn đặt hàng</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-form-model
      ref="ruleForm"
      :model="form"
      layout="vertical">
      <a-spin :spinning="loading">
        <a-card style="border: none; padding: 25px">
          <a-row :gutter="16">
            <a-col :xs="24" :md="16" :lg="16">
              <a-divider orientation="left">
                <span class="block-header">Thông tin đơn đặt hàng</span>
              </a-divider>
              <a-descriptions>
                <a-descriptions-item label="Mã đơn tổng ">
                  {{ form.parentNo }}
                </a-descriptions-item>
                <a-descriptions-item label="Mã đơn hàng">
                  {{ form.no }}
                </a-descriptions-item>
                <a-descriptions-item label="Ngày tạo">
                  {{ form.createAt }}
                </a-descriptions-item>
                <a-descriptions-item label="Ngày đặt hàng">
                  {{ form.completeAt }}
                </a-descriptions-item>
                <a-descriptions-item label="Trạng thái">
                  {{ form.statusName }}
                </a-descriptions-item>
              </a-descriptions>
              <a-divider orientation="left">
                <span class="block-header">Danh sách kiện hàng</span>
              </a-divider>
              <!--            <div class="wrapper1">-->
              <!--              <div class="div1"></div>-->
              <!--            </div>-->
              <a-table
                :columns="columnDetail"
                :data-source="data"
                :rowKey=" (rowKey, index ) => index"
                :pagination="data.length === 0 ? false : pagination"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                :size="'large'"
                style="border: none; margin-top: 25px">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="actionTitle" >
                  <a-icon type="control"></a-icon>
                </template>
                <template slot="operation" >
                  <a-popover >
                    <template slot="content" >
                      <span>Chi tiết</span>
                    </template>
                    <a-icon type="eye" style=" color: #086885"></a-icon>
                  </a-popover>
                </template>
              </a-table>
            </a-col>
            <a-col :xs="24" :md="8" :lg="8">
              <a-divider orientation="left">
                <span class="block-header">Lịch sử tác động</span>
              </a-divider>
              <a-steps direction="vertical" progress-dot size="small">
                <a-step v-for="(item, key) in form.listTrans" :key="key" >
                  <template slot="title">
                    <span>{{ item.createAt }}</span>
                  </template>
                  <template slot="description">
                    <a v-if="item.voucherId" @click="goToDetailVoucher(item.voucherId)">{{ item.description }}</a>
                    <a v-else >{{ item.description }}</a>
                  </template>
                </a-step>

              </a-steps>
            </a-col>
          </a-row>
        </a-card>
      </a-spin>
    </a-form-model>

  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import TableEmptyText from '@/utils/table-empty-text'
import { commonMethods, authComputed } from '@/store/helpers'
import moment from 'moment'
import columnDetail from './columnDetail'
import { getByIdPreOrder, getListVoucher } from '@/api/pre-order'

export default {
  components: {
    MainLayout
  },
  mixins: [TableEmptyText],
  name: 'WarehouseManagement',
  data () {
    return {
      moment,
      columnDetail,
      activeKey: [1],
      form: {},
      loading: false,
      data: [],
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
      }
    }
  },
  created () {
    this.getDetail()
    // this.getListVoucher()
  },
  mounted () {
    this.scrollBarOfTable()
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...commonMethods,
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
    },
    getDetail () {
      this.loading = true
      getByIdPreOrder({ preOrderId: this.$route.params.id }).then(rs => {
        if (rs) {
          this.form = rs
          this.data = rs.listDetail
          this.loading = false
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
    // getListVoucher () {
    //   this.loading = true
    //   getListVoucher(this.$route.params.id).then(rs => {
    //     if (rs) {
    //       this.data = rs
    //       this.loading = false
    //     }
    //   }).catch(err => {
    //     const msg = this.handleApiError(err)
    //     this.$notification.error({
    //       message: '',
    //       description: msg,
    //       duration: 5
    //     })
    //   }).finally(res => {
    //     this.loading = false
    //   })
    // },
    goToDetailVoucher (id) {
      this.$router.push({ name: 'import_export_management.detail', params: { id: id } })
    }
  }
}
</script>
<style type="less">
.ant-steps-item-content{
  width: 90%!important
}
</style>
