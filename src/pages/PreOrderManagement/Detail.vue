<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/pre-order-management">Đơn đặt hàng</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Chi tiết đơn đặt hàng</a-breadcrumb-item>
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
              </a-table>
            </a-col>
            <a-col :xs="24" :md="8" :lg="8">
              <a-divider orientation="left">
                <span class="block-header">Lịch sử tác động</span>
              </a-divider>
              <a-steps direction="vertical" progress-dot size="small" style="overflow: auto; height: 650px">
                <a-step v-for="(item, key) in form.listTrans" :key="key" >
                  <template slot="title">
                    <div style="display: flex; justify-content: space-between;  margin-bottom: 5px ;">
                      <span>{{ item.createAt }}</span>
                      <a-icon type="file" style="margin-top: 5px; color: #2393ff" @click="showListFile(item)"></a-icon>
                    </div>
                  </template>
                  <template slot="description">
                    <a v-if="item.voucherId" @click="goToDetailVoucher(item.voucherId)">{{ item.description }}</a>
                    <a v-else >{{ item.description }}</a>
                  </template>
                </a-step>

              </a-steps>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="24" :lg="24">
              <div style="display: flex; justify-content: center; margin-top: 50px">
                <a-button type="default" @click="goToOrderManagement">Quay lại</a-button>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-spin>
    </a-form-model>
    <list-file
      v-if="visibleDrawerListFile === true"
      :visibleDrawerListFile="visibleDrawerListFile"
      :listFile="listFile"
      @closeDrawerListFile="closeDrawerListFile"
    ></list-file>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import TableEmptyText from '@/utils/table-empty-text'
import { commonMethods, authComputed } from '@/store/helpers'
import moment from 'moment'
import columnDetail from './columnDetail'
import { getByIdPreOrder } from '@/api/pre-order'
import _ from 'lodash'
import ListFile from './ListFile'

export default {
  components: {
    MainLayout,
    ListFile
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
      },
      visibleDrawerListFile: false,
      listFile: []
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
          this.pagination = _.merge(this.pagination, this.handlePaginationData(rs.listDetail))
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
    goToDetailVoucher (id) {
      this.$router.push({ name: 'voucher_management.detail', params: { id: id } })
    },
    goToOrderManagement () {
      this.$router.push({ name: 'pre_order_management' })
    },
    showListFile (record) {
      this.visibleDrawerListFile = true
      this.listFile = record.listDocument
    },
    closeDrawerListFile () {
      this.visibleDrawerListFile = false
      this.listFile = []
    }
  }
}
</script>
<style type="less">
.ant-steps-item-content{
  width: 90%!important
}
.ant-steps-navigation .ant-steps-item:after {
  display: none;
}
.block-header {
  color: #076885 !important;
  font-weight: bold;
}
.ant-steps-item-title{
  width: 90%!important;
}
</style>
