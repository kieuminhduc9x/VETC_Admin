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
      <a-card style="border: none; padding: 25px">
        <a-row :gutter="16">
          <a-col :xs="24" :md="16" :lg="16">
            <a-divider orientation="left">
              <span class="block-header">Thông tin đơn đặt hàng</span>
            </a-divider>
            <a-descriptions>
              <a-descriptions-item label="Mã đơn tổng: ">
                {{ form.parentNo }}
              </a-descriptions-item>
              <a-descriptions-item label="Mã đơn hàng:">
                {{ form.no }}
              </a-descriptions-item>
              <a-descriptions-item label="Ngày tạo::">
                {{ form.createAt }}
              </a-descriptions-item>
              <a-descriptions-item label="Ngày đặt hàng:">
                {{ form.completeAt }}
              </a-descriptions-item>
              <a-descriptions-item label="Trạng thái:">
                {{ form.statusName }}
              </a-descriptions-item>
            </a-descriptions>
            <a-divider orientation="left">
              <span class="block-header">Danh sách phiếu nhập xuất</span>
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
            <a-steps direction="vertical" size="small" :current="1">
              <a-step title="Finished" >
                <a-icon slot="icon" type="user" />
                <template slot="description">
                  <span>Nhắc nhở lần 1</span>
                </template>
              </a-step>
              <a-step title="In Progress" description="This is a description." />
              <a-step title="Waiting" description="This is a description." />
            </a-steps>
          </a-col>
        </a-row>
      </a-card>
    </a-form-model>

  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import TableEmptyText from '@/utils/table-empty-text'
import { commonMethods, authComputed } from '@/store/helpers'
import moment from 'moment'
import columnDetail from './columnDetail'
import { getByIdPreOrder } from '@/api/pre-order'

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
  },
  mounted () {
    this.scrollBarOfTable()
    this.getDetail()
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
      getByIdPreOrder({ preOrderId: this.$route.params.id }).then(rs => {
        if (rs) {
          this.form = rs
          this.data = rs.listDetail
        }
      })
    }
  }
}
</script>
