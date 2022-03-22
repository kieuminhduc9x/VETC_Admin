<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <div style="display: flex; justify-content: space-between">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item >Kế toán</a-breadcrumb-item>
          <a-breadcrumb-item :class="'active'">Phiếu nhập vé</a-breadcrumb-item>
        </a-breadcrumb>
        <menu-profile></menu-profile>
      </div>
    </template>
    <div style="margin-top: 5px">
      <a-card title="Thông tin phiếu nhập">
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left">

          <a-row :gutter="16">
            <a-col :xs="24" :lg="12" :md="12">
              <a-form-model-item
                label="Đơn vị"
                prop="donvi"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.donvi"
                >
                  <a-select-option v-for="item in lsDonvi" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Số phiếu"
                prop="sophieu"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.sophieu"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Phương thức"
                prop="phuongthuc"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.phuongthuc"
                >
                  <a-select-option v-for="item in lsPhuongthuc" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Người nhận"
                prop="nguoinhan"
                style="margin-bottom: 20px!important;">
                <a-select
                  v-model="form.nguoinhan"
                >
                  <a-select-option v-for="item in lsNguoinhan" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :lg="12" :md="12">
              <a-row :gutter="16">
                <a-col :xs="24" :md="12" :lg="12">
                  <a-form-model-item
                    label="Ngày lập"
                    prop="ngaylap"
                    style="margin-bottom: 20px!important;">
                    <a-date-picker
                      v-model="form.ngaylap"
                      format="DD/MM/YYYY"></a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" :lg="12">
                  <a-form-model-item
                    label="Ca"
                    prop="ca"
                    style="margin-bottom: 20px!important;">
                    <a-select
                      v-model="form.ca"
                    >
                      <a-select-option v-for="item in lsCa" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-form-model-item
                label="Số chứng từ"
                prop="sochungtu"
                style="margin-bottom: 20px!important;">
                <a-input v-model="form.sochungtu"></a-input>
              </a-form-model-item>
              <a-form-model-item
                label="Nhập từ"
                prop="nhaptu"
                style="margin-bottom: 15px!important;">
                <a-select
                  v-model="form.nhaptu"
                >
                  <a-select-option v-for="item in lsNhaptu" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="Ghi chú"
                prop="ghichu"
                style="margin-bottom: 20px!important;">
                <a-textarea v-model="form.ghichu"></a-textarea>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <a-card title="Chi tiết phiếu nhập">
        <a-form-model
          :model="formDetail"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left"
          style="padding: 15px 20px">
          <a-row :gutter="16">
            <a-col :xs="24" :md="16" :lg="16">
              <a-row :gutter="16">
                <a-col :xs="24" :lg="12" :md="12">
                  <a-form-model-item
                    label="Lộ trình"
                    prop="lotrinh"
                    style="margin-bottom: 20px!important;">
                    <a-select
                      v-model="formDetail.lotrinh"
                      placeholder="Chọn lộ trình"
                    >
                      <a-select-option v-for="item in lsLotrinh" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :lg="12" :md="12">
                  <a-form-model-item
                    label="Loại vé"
                    prop="lotrinh"
                    style="margin-bottom: 20px!important;">
                    <a-select
                      placeholder="Chọn loại vé"
                      v-model="formDetail.lotrinh">
                      <a-select-option v-for="item in lsLoaive" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :xs="24" :lg="12" :md="12">
                  <a-form-model-item
                    label="Từ Serial"
                    prop="tuserial"
                    style="margin-bottom: 20px!important;">
                    <a-input
                      v-model="formDetail.tuserial"
                      placeholder="Nhập từ Serial"
                    >
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :lg="12" :md="12">
                  <a-form-model-item
                    label="Đến Serial"
                    prop="denserial"
                    style="margin-bottom: 20px!important;">
                    <a-input
                      placeholder="Nhập đến Serial"
                      v-model="formDetail.denserial">
                    </a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :xs="24" :lg="24" :md="24">
                  <a-form-model-item
                    label="Số lượng"
                    prop="soluong"
                    style="margin-bottom: 20px!important;">
                    <a-input
                      v-model="formDetail.soluong">
                    </a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :xs="24" :lg="8" :md="8">
              <div style="display: flex; justify-content: center">
                <a-button class="ant-btn-success">Thêm vào DS</a-button>
                <a-button class="ant-btn-success">Import file</a-button>
              </div>
            </a-col>
          </a-row>
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
                <template slot="action">
                  <span style="cursor: pointer">
                    <a-icon
                      type="delete"
                      :style="{color: 'red', fontSize: '18px'}"
                    />
                  </span>
                </template>
              </a-table>
              <div style="display: flex; justify-content: flex-end;margin-top: 20px ">
                <a-checkbox :checked="formDetail.inphieunhap" v-model="formDetail.inphieunhap">
                  <span>In phiếu nhập</span>
                </a-checkbox>
              </div>
              <div style="display: flex; justify-content: flex-end;margin-top: 20px ">
                <a-button class="ant-btn-success" style="margin-right: 20px">Xem trước</a-button>
                <a-button class="ant-btn-success" style="margin-right: 20px">Lưu phiếu</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>

      </a-card>

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
  name: 'InventoryReceivingVoucher',
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
        donvi: '1',
        sophieu: 'PN20022022001',
        phuongthuc: '1',
        nguoinhan: '1',
        ngaylap: '2022-03-16',
        ca: '1',
        sochungtu: '123456789',
        nhaptu: '1',
        ghichu: ''
      },
      lsDonvi: [
        {
          value: '1',
          name: 'Trạm B'
        }
      ],
      lsPhuongthuc: [
        {
          value: '1',
          name: 'Nhập thẻ mới từ trung tâm'
        },
        {
          value: '2',
          name: 'Nhập thẻ từ trạm khác'
        },
        {
          value: '3',
          name: 'Nhập thẻ dư từ nhân viên'
        },
        {
          value: '4',
          name: 'Nhập thẻ hư từ nhân viên'
        }
      ],
      lsNguoinhan: [
        {
          value: '1',
          name: 'Hoàng My'
        }
      ],
      lsCa: [
        {
          value: '1',
          name: 'Ca 2'
        }
      ],
      lsNhaptu: [
        {
          value: '1',
          name: 'Tien Phong'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formDetail: {
        lotrinh: undefined,
        loaive: undefined,
        tuserial: '',
        denserial: '',
        soluong: ''
      },
      lsLotrinh: [],
      lsLoaive: [],
      data: [
        {
          rowIndex: '1',
          lotrinh: 'Trạm A - Trạm B',
          loaive: 'Vé lượt loại 2',
          menhgia: '1,000',
          kyhieu: 'TC01/02',
          tuserial: '0000001',
          denserial: '0001000',
          soluong: '1,000'
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
