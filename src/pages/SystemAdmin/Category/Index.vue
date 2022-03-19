<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Quản trị hệ thống</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">VETC - Danh mục </a-breadcrumb-item>
        </a-breadcrumb>
        <menu-profile></menu-profile>
      </div>
    </template>
    <div style="margin-top: 5px">
      <a-row :gutter="16">
        <a-col :xs="24" :lg="4" :md="4">
          <a-menu
            style="width: 256px; border: 0.5px solid gray; border-radius: 5px"
            :default-selected-keys="['1']"
            @click="clickMenu"
          >
            <a-menu-item key="1">
              <span>Loại xe</span>
            </a-menu-item>
            <a-menu-item key="2">
              <span>Loại vé</span>
            </a-menu-item>
            <a-menu-item key="3">
              <span>Bảng giá</span>
            </a-menu-item>
            <a-menu-item key="4">
              <span>Chức danh</span>
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :xs="24" :lg="20" :md="20">
          <a-card title="Chi tiết danh mục">
            <a-card style="width: 100%; border: none" class="vts-table-container">
              <a-row :gutter="16" type="flex">
                <div style="margin: 15px">
                  <a-button class="ant-btn-success">Thêm mới</a-button>
                </div>
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
                      <span style="padding-right:12px;cursor: pointer">
                        <a-icon
                          type="edit"
                          :style="{color: 'blue',fontSize: '18px'}"
                        />
                      </span>
                      <span style="cursor: pointer">
                        <a-icon
                          type="minus-circle"
                          :style="{color: 'blue', fontSize: '18px'}"
                        />
                      </span>
                    </template>
                  </a-table>
                </a-col>
              </a-row>
            </a-card>
          </a-card>
        </a-col>
      </a-row>
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
      form: {

      },
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      data: [
        {
          carType: '1',
          description: 'Xe dưới 12 chỗ ngồi; xe tải có tải trọng dưới 2 tấn; các loại xe buýt vận tải khách hàng công cộng'
        },
        {
          carType: '2',
          description: 'Xe từ 12 ghế ngồi đến 30 ghế; xe tải có tải trọng từ 2 tấn đến dưới 4 tấn'
        },
        {
          carType: '3',
          description: 'Xe từ 31 ghế ngồi trở lên; xe tải có tải trọng từ 4 tấn đến dưới 10 tấn;'
        },
        {
          carType: '4',
          description: 'Xe tải có tải trọng từ 10 tấn đến dưới 18 tấn; xe chở hàng bằng container 20 fit '
        },
        {
          carType: '5',
          description: 'Xe tải có tải trọng từ 18 tấn trở lên; xe chở hàng bằng container 40 fit'
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
    clickMenu (item, key) {
      console.log(item, key)
    }

  }
}
</script>
