<template>
  <a-card style="width: 100%;border: none" class="search-container" >
    <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel header="Thông tin" key="1">
        <a-card style="width: 100%;border: none" class="search-container" >
          <a-row :gutter="16" type="flex" justify="center">
            <a-col :span="24" class="cus-flex-end">
              <a-button
                class="ant-btn ant-btn-primary"
                :style="{marginLeft: '8px'}"
                @click="onEditRow"
              >
                Cập nhật
              </a-button>

            </a-col>
            <a-col :xs="24" :md="10"><strong>Mã Quận/Huyện:</strong> {{ areaSelected.districtCode }}</a-col>
            <a-col :xs="24" :md="14"><strong>Tên Quận/Huyện:</strong> {{ areaSelected.districtName }}</a-col>
          </a-row>
          <a-row :gutter="16" type="flex" justify="center" style="margin-top: 20px">
            <a-col :xs="24" :md="10"><strong>Hub:</strong> {{ areaSelected.hubName }}</a-col>
            <a-col :xs="24" :md="14"><strong>Địa chỉ Hub:</strong> {{ areaSelected.hubAddress }}</a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" class="collapse-left" style="margin-top: 20px">
      <a-collapse-panel header="Danh mục địa phận" key="1">
        <a-card style="width: 100%;border: none" class="search-container" >
          <a-table
            ref="tb1"
            :columns="columns"
            :data-source="precincts"
            :rowKey=" (rowKey, index ) => index"
            :pagination="pagination"
            :loading="loading"
            :scroll="{ x: 'max-content' }"
            :locale="{ emptyText: 'Chưa có dữ liệu' }"
            @change="handleTableChange"
            class="ant-table-bordered">

            <template slot="rowIndex" slot-scope="text, record, index">
              <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
            </template>

          </a-table>
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
      <area-form
        v-if="modalSync"

        @closeModal="handleCancelModal"
        :areaSelected="areaSelected"></area-form>

    </a-modal>
  </a-card>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import Form from './form'
const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    AreaForm: Form
  },
  props: {
    areaSelected: {
      type: Object,
      required: true
    }
  },
  mixins: [TableEmptyText],
  name: 'DistrictInfo',
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      activeSearchKey: 1,
      activeResultKey: 1,
      expandedRowKeys: [],

      loading: false,
      columns,
      rules: {},
      endOpen: false,
      visible: false,
      modalSync: false,
      pagination: {
        current: 1,
        total: this.areaSelected.length,
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
  computed: {
    modalTitle () {
      return 'Cập nhật địa bàn'
    },
    precincts () {
      return this.areaSelected.children.map(item => {
        return {
          precinctCode: item.precinctCode,
          precinctName: item.precinctName,
          districtName: item.districtName,
          provinceName: item.provinceName
        }
      })
    }
  },
  methods: {
    handleCancelModal (payload = false) {
      if (payload) {
        this.areaSelected.hubId = payload.hubId
        this.areaSelected.hubName = payload.hubName
        this.areaSelected.hubAddress = payload.address
      }
      this.modalSync = false
    },
    onEditRow () {
      this.modalSync = true
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
    }

  }
}
</script>
