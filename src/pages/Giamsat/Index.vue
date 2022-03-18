<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item :class="'active'">VETC - Giám sát </a-breadcrumb-item>
        </a-breadcrumb>
        <menu-profile></menu-profile>
      </div>
    </template>
    <div>
      <a-row :gutter="16">
        <a-col :xs="24" :lg="4" :md="4">
          <a-card>
            <a-form-model
              :model="form"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              labelAlign="left">
              <a-row :gutter="16">
                <a-col :xs="24" :md="24" :lg="24">

                  <a-form-model-item
                    label="Loại GD"
                  >
                    <a-select v-model="form.trans">
                      <a-select-option v-for="item in listTrans" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Đặc biệt"
                  >
                    <a-select v-model="form.db">
                      <a-select-option v-for="item in listDB" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">

                  <a-form-model-item
                    label="Từ ngày"
                  >
                    <a-date-picker
                      :format="'YYYY-MM-DD HH:mm:ss'"
                      v-model="form.fromDate">
                    </a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">

                  <a-form-model-item
                    label="Đến ngày"
                  >
                    <a-date-picker
                      :format="'YYYY-MM-DD HH:mm:ss'"
                      v-model="form.toDate">
                    </a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Trạm vào"
                  >
                    <a-select v-model="form.tramvao">
                      <a-select-option v-for="item in listTramvao" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Làn vào"
                  >
                    <a-select v-model="form.lanvao">
                      <a-select-option v-for="item in listLanvao" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Trạm ra"
                  >
                    <a-select v-model="form.tramra">
                      <a-select-option v-for="item in listTramra" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Làn ra"
                  >
                    <a-select v-model="form.lanra">
                      <a-select-option v-for="item in listLanra" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Loại xe"
                  >
                    <a-select v-model="form.loaixe">
                      <a-select-option v-for="item in listLoaixe" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Loại vé"
                  >
                    <a-select v-model="form.loaive">
                      <a-select-option v-for="item in listLoaive" :key="item.id" :value="item.id">
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Etag/UID"
                  >
                    <a-input v-model="form.uid">
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-model-item
                    label="Biển số"
                  >
                    <a-input v-model="form.bienso">
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="24" :lg="24">
                  <div style="display: flex; justify-content: flex-end; padding: 10px">
                    <a-button class="ant-btn-success">Tìm kiếm </a-button>
                  </div>
                </a-col>
              </a-row>
            </a-form-model>

          </a-card>
        </a-col>
        <a-col :xs="24" :lg="10" :md="10">
          <div style="background-color: #8E97A9; height: 470px; position: relative">
            <img src="@/assets/image-fake/2022-03-17_16.28.04_vao.jpg" alt="VETC" style="width: 100%; height: 100%">
            <div style="width: 40%; height: 120px; position: absolute; bottom: 80px; right: 0">
              <a-card title="30F23365" style="background-color: #8E97A9; color: white; height: 100%">
                <a-button slot="extra" class="ant-btn-gray"><a-icon type="play-circle" /></a-button>
                <img src="@/assets/image-fake/2022-03-17_16.27.42_vao.jpg" alt="VETC" style="width: 100%; height: 100%">
              </a-card>
            </div>
            <div style="width: 100%; height:80px; padding: 20px; position: absolute; bottom: 0; right: 0; background-color: white">
              <p>Mã GD: 13595524 - vào 04/02/2022 14:26:55 - ra 17/03/2022 14:56:22</p>
              <p>E - 3416214B88C8B60002000196-30F223365T - VL1 - 34,000</p>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :lg="10" :md="10">
          <div style="background-color: #8E97A9; height: 470px; position: relative">
            <img src="@/assets/image-fake/2022-03-17_16.22.23.jpg" alt="VETC" style="width: 100%; height: 100%">
            <div style="width: 40%; height: 120px; position: absolute; bottom: 80px; right: 0">
              <a-card title="30F23365" style="background-color: #8E97A9; color: white; height: 100%">
                <a-button slot="extra" class="ant-btn-gray"><a-icon type="play-circle" /></a-button>
                <img src="@/assets/image-fake/2022-03-17_16.22.50.jpg" alt="VETC" style="width: 100%; height: 100%">
              </a-card>
            </div>
            <div style="width: 100%; height:80px; padding: 20px; position: absolute; bottom: 0; right: 0; background-color: white">
              <p>Trạm vào Pháp Vân_Làn 5- Trạm ra Thường Tín_Làn 1</p>
              <p>Làn: 2 - Tổ 3 - Trần Thị Nam - Giao dịch thành công</p>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div style="margin-top: 5px">
      <a-row :gutter="16">
        <a-col :xs="24" :lg="4" :md="4">
          <a-card style="overflow: scroll; height: 220px; font-size: 12px">
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>
            <div style="border: 0.5px solid gray; border-radius: 5px; height: auto; padding: 5px">
              <p>14018342 - ETC - Vào PV 16/03/2022 16:38:25 - Ra TT 16/03/2022 17:45:33 - VLL1 - 34000</p>
            </div>

          </a-card>
        </a-col>
        <a-col :xs="24" :lg="20" :md="20">
          <a-card style="width: 100%; border: none" class="vts-table-container">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
              <div>
                <a-button class="ant-btn-success">Không lỗi</a-button>
                <a-button class="ant-btn-yellow" style="margin-left: 20px">Sai biển số</a-button>
                <a-button class="ant-btn-yellow" style="margin-left: 20px">Nhần chặng</a-button>
                <a-button class="ant-btn-yellow" style="margin-left: 20px">Sai loại xe</a-button>
                <a-dropdown style="margin-left: 20px">
                  <a-menu slot="overlay">
                    <a-menu-item key="1">Loại 1 </a-menu-item>
                    <a-menu-item key="2">Loại 2</a-menu-item>
                    <a-menu-item key="3">Loại 3 </a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px"> Loại khác <a-icon type="down" /> </a-button>
                </a-dropdown>
              </div>
              <div>
                <a-dropdown style="margin-left: 20px">
                  <a-menu slot="overlay">
                    <a-menu-item key="1">Thêm mới</a-menu-item>
                    <a-menu-item key="2">Cập nhật</a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px" class="ant-btn-green"> Hành động <a-icon type="down" /> </a-button>
                </a-dropdown>
              </div>
            </div>
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
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import MenuProfile from '@/components/MenuProfile'

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
      listTrans: [
        {
          id: '1',
          value: 'ETC'
        }
      ],
      listDB: [
        {
          id: '1',
          value: 'Tất cả'
        }
      ],
      listTramvao: [
        {
          id: '1',
          value: 'Pháp Vân'
        }
      ],
      listLanvao: [
        {
          id: '1',
          value: '1'
        }
      ],
      listTramra: [
        {
          id: '1',
          value: 'Thường tín'
        }
      ],
      listLanra: [
        {
          id: '1',
          value: '1'
        }
      ],
      listLoaixe: [
        {
          id: '1',
          value: '1'
        }
      ],
      listLoaive: [
        {
          id: '1',
          value: 'Vé lượt'
        }
      ],
      listLoaitag: [
        {
          id: '1',
          value: 'Bình thường'
        }
      ],
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      data: [
        {
          code: 123456,
          uid: '12312H7999SD783123',
          timein: '16/03/2022 14:30:12',
          timeout: '16/03/2022 14:30:12',
          tramvao: 'Pháp Vân',
          lanvao: '1',
          tramra: 'Thường Tín',
          lanra: '2',
          bsvao: '30F23365',
          bsra: '30F23365',
          gia: '34000'
        },
        {
          code: 123457,
          uid: '12312H7999SD783123',
          timein: '16/03/2022 14:30:12',
          timeout: '16/03/2022 14:30:12',
          tramvao: 'Pháp Vân',
          lanvao: '1',
          tramra: 'Thường Tín',
          lanra: '2',
          bsvao: '30F23365',
          bsra: '30F23365',
          gia: '34000'
        },
        {
          code: 123458,
          uid: '12312H7999SD783123',
          timein: '16/03/2022 14:30:12',
          timeout: '16/03/2022 14:30:12',
          tramvao: 'Pháp Vân',
          lanvao: '1',
          tramra: 'Thường Tín',
          lanra: '2',
          bsvao: '30F23365',
          bsra: '30F23365',
          gia: '34000'
        },
        {
          code: 123459,
          uid: '12312H7999SD783123',
          timein: '16/03/2022 14:30:12',
          timeout: '16/03/2022 14:30:12',
          tramvao: 'Pháp Vân',
          lanvao: '1',
          tramra: 'Thường Tín',
          lanra: '2',
          bsvao: '30F23365',
          bsra: '30F23365',
          gia: '34000'
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
