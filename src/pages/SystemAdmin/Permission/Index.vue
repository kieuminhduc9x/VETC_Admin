<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item :class="'active'">VETC - Phân quyền</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <div style="margin-top: 5px">
      <a-row :gutter="16">
        <a-col :xs="24" :lg="4" :md="4">
          <div>
            <a-menu
              style="width: 100%; border: 0.5px solid gray; border-radius: 5px"
              :default-selected-keys="['1']"
              @click="clickMenu"
            >
              <a-menu-item key="1">
                <span>Trạm trưởng</span>
              </a-menu-item>
              <a-menu-item key="2">
                <span>Kế toán</span>
              </a-menu-item>
              <a-menu-item key="3">
                <span>Hậu kiểm</span>
              </a-menu-item>
              <a-menu-item key="4">
                <span>Thu phí viên</span>
              </a-menu-item>
            </a-menu>
            <div style="display: flex; justify-content: flex-start; margin-top: 20px; padding: 0 15px ">
              <a-icon @click="add" type="plus-circle" style="font-size: 32px; color: #1890ff"></a-icon><span style="font-size: 16px; font-weight: bold; color: black; margin-left: 10px; margin-top: 5px">Thêm nhóm quyền</span>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :lg="16" :md="16">
          <a-card title="Chi Tiết Nhóm Quyền">
            <div style="padding: 20px 60px; overflow: auto; height: 450px">
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="12" :lg="12">
                  <div style="margin-top: 20px">
                    <a-button class="ant-btn-success">Quản trị</a-button>
                  </div>
                  <div v-for="item in options" :key="item.value" style="display: flex; justify-content: space-between; padding-left: 40px">
                    <span style="margin-top: 20px">{{ item.label }}</span>
                    <a-checkbox style="margin-top: 20px; margin-left: 120px">
                    </a-checkbox>
                  </div>
                  <div style="margin-top: 20px">
                    <a-button class="ant-btn-success">Kế toán</a-button>
                  </div>
                  <div v-for="item in options2" :key="item.value" style="display: flex; justify-content: space-between; padding-left: 40px">
                    <span style="margin-top: 20px">{{ item.label }}</span>
                    <a-checkbox style="margin-top: 20px">
                    </a-checkbox>
                  </div>
                  <div style="margin-top: 20px">
                    <a-button class="ant-btn-success">Phát hành</a-button>
                  </div>
                  <div v-for="item in options3" :key="item.value" style="display: flex; justify-content: space-between; padding-left: 40px">
                    <span style="margin-top: 20px">{{ item.label }}</span>
                    <a-checkbox style="margin-top: 20px">
                    </a-checkbox>
                  </div>
                  <div style="margin-top: 20px">
                    <a-button class="ant-btn-success">Quản lý kho vé</a-button>
                  </div>
                  <div v-for="item in options4" :key="item.value" style="display: flex; justify-content: space-between; padding-left: 40px">
                    <span style="margin-top: 20px">{{ item.label }}</span>
                    <a-checkbox style="margin-top: 20px">
                    </a-checkbox>
                  </div>
                  <div style="margin-top: 20px">
                    <a-button class="ant-btn-success">Xử lý chênh lệch</a-button>
                  </div>
                  <div v-for="item in options5" :key="item.value" style="display: flex; justify-content: space-between; padding-left: 40px">
                    <span style="margin-top: 20px">{{ item.label }}</span>
                    <a-checkbox style="margin-top: 20px">
                    </a-checkbox>
                  </div>
                  <div style="margin-top: 20px">
                    <a-button class="ant-btn-success">Thống kê báo cáo</a-button>
                  </div>
                  <div v-for="item in options6" :key="item.value" style="display: flex; justify-content: space-between; padding-left: 40px">
                    <span style="margin-top: 20px">{{ item.label }}</span>
                    <a-checkbox style="margin-top: 20px">
                    </a-checkbox>
                  </div>
                </a-col>
              </a-row>
            </div>
            <div style="display: flex; justify-content: flex-end; margin: 15px">
              <a-button class="ant-btn-success">Lưu</a-button>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout
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
        trans: '1',
        db: '1',
        fromDate: '2022-02-04 16:38:25',
        toDate: '2022-03-17 14:56:22',
        tramvao: '1',
        lanvao: '1',
        tramra: '1',
        lanra: '1',
        loaixe: '1',
        loaive: '1',
        loaitag: '1'
      },
      listCategory: [
        {
          key: '1',
          name: 'Trạm trưởng'
        },
        {
          key: '2',
          name: 'Kế toán'
        },
        {
          key: '3',
          name: 'Hậu kiểm'
        },
        {
          key: '4',
          name: 'Thu phí viên'
        }
      ],
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      keyMenu: '1',
      options: [
        { label: 'Quản trị tài khoản', value: '1' },
        { label: 'Phân quyền', value: '2' }
      ],
      options2: [
        { label: 'Kho vé', value: '1' },
        { label: 'Chốt ca', value: '2' },
        { label: 'Báo cáo', value: '3' }
      ],
      options3: [
        { label: 'Phát hành vé', value: '1' },
        { label: 'Phát hành mã HĐĐT', value: '2' },
        { label: 'Tra cứu HĐĐT', value: '3' }
      ],
      options4: [
        { label: 'Nhập/hủy vé', value: '1' },
        { label: 'Giao/thu vé', value: '2' },
        { label: 'Tra cứu sự kiện', value: '3' },
        { label: 'Kho vé', value: '4' },
        { label: 'Chốt kho vé', value: '5' }
      ],
      options5: [
        { label: 'Biên bản xử lý chênh lệch', value: '1' },
        { label: 'Xử lý giao dịch chênh lệch', value: '2' }
      ],
      options6: [
        { label: 'Giao ca nhân viên', value: '1' },
        { label: 'Giao ca trạm', value: '2' },
        { label: 'Giao ca kế toán', value: '3' },
        { label: 'Tra cứu giao ca', value: '4' },
        { label: 'Danh sách báo cáo', value: '5' },
        { label: 'Thống kê báo cáo ETC', value: '6' },
        { label: 'Giao ca ETC', value: '7' }
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
      this.keyMenu = key
    },
    add () {
      console.log('thêm')
    },
    changeCheckBox () {

    }
  }
}
</script>
