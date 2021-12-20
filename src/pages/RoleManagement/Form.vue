<template>
  <a-drawer
    :visible="visible"
    :title="isCreate === true? 'Thêm mới' : 'Cập nhật'"
    @close="closeForm"
    width="800"
    :destroy-on-close="false"
    :mask-closable="false"
  >
    <a-spin :spinning="loading">
      <a-form-model :model="form" ref="ruleForm">
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Mã kho"
              prop="code"
              :rules="[
                {
                  required: true,
                  message: 'Mã kho là bắt buộc',
                  trigger: 'change'
                },
                {
                  validator: checkCode,
                  trigger: 'change'
                },
                {
                  max: 200,
                  message: 'Nhập tối đa 200 ký tự',
                  trigger: 'change'
                }
              ]">
              <a-input v-model="form.code" @blur="DeepTrimValue(form)"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Tên kho"
              prop="name"
              :rules="[
                {
                  required: true,
                  message: 'Tên kho là bắt buộc',
                  trigger: 'change'
                },
                {
                  max: 250,
                  message: 'Nhập tối đa 250 ký tự',
                  trigger: 'change'
                }
              ]">
              <a-input v-model="form.name" @blur="DeepTrimValue(form)"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Tỉnh/Tp"
              prop="province"
              :rules="[
                {
                  required: true,
                  message: 'Tỉnh/TP là bắt buộc',
                  trigger: 'change'
                },
              ]">
              <a-select v-model="form.province" >
                <a-select-option v-for="item in listProvince" :key="item.provinceCode" :value="item.provinceCode">
                  {{ item.provinceName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Kho cấp trên"
              prop="parentId"
              :rules="[
                {
                  required: true,
                  message: 'Kho cấp trên là bắt buộc',
                  trigger: 'change'
                },
              ]">
              <a-select v-model="form.parentId" >
                <a-select-option v-for="item in listWarehouse" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Người quản lý"
              prop="managerId"
              :rules="[
                {
                  required: true,
                  message: 'Người quản lý là bắt buộc',
                  trigger: 'change'
                }
              ]">
              <a-select v-model="form.managerId" >
                <a-select-option v-for="item in listManage" :key="item.id" :value="item.id">
                  {{ item.fullName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Số điện thoại"
              prop="phone"
              :rules="[
                {
                  validator: phoneValidator,
                  trigger: 'change'
                }
              ]">
              <a-input v-model="form.phone"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Email kho"
              prop="email"
              :rules="
                [
                  {
                    required: true,
                    message: 'Email kho là bắt buộc',
                    trigger:'change'
                  },
                  {
                    validator: checkEmail,
                    trigger: 'change'
                  }
                ]">
              <a-input v-model="form.email"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Địa chỉ"
              prop="address"
              :rules="[
                {
                  required: true,
                  message: 'Địa chỉ là bắt buộc',
                  trigger: 'change'
                },
                {
                  max: 500,
                  message: 'Nhập tối đa 500 ký tự',
                  trigger: 'change'
                }
              ]">
              <a-textarea v-model="form.address" @blur="DeepTrimValue(form)"></a-textarea>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" v-if="isUpdate === true">
          <a-col :xs="24" :md="12" :lg="12">
            <a-table
              :columns="columnsDevice"
              :data-source="form.listScanDevice"
              :rowKey=" (rowKey, index ) => index"
              :pagination="paginationDevice"
              :scroll="{ x: '100%' }"
              :locale="{ emptyText: 'Chưa có dữ liệu' }"
              class="ant-table-bordered">
              <template slot="rowIndex" slot-scope="text, record, index">
                <span>{{ index + 1 }} </span>
              </template>
            </a-table>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <a-table
              :columns="columnsStaff"
              :data-source="form.listUser"
              :rowKey=" (rowKey, index ) => index"
              :pagination="paginationStaff"
              :scroll="{ x: '100%' }"
              :locale="{ emptyText: 'Chưa có dữ liệu' }"
              class="ant-table-bordered">
              <template slot="rowIndex" slot-scope="text, record, index">
                <span>{{ index + 1 }} </span>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px',
      }"
    >
      <a-button type="primary" style="marginRight: 8px" @click="submitData" >
        {{ isCreate === true? 'Thêm mới' : 'Cập nhật' }}
      </a-button>
      <a-button @click="closeForm">
        Đóng
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import { phoneValidator, checkEmail, checkCode } from '@/utils/helpers'
import {
  createWarehouseManagement,
  searchWarehouseManagement,
  updateWarehouseManagement
} from '@/api/warehouse-management'
import { listProvince } from '@/api/common'
import { SearchUser } from '@/api/user'
import columnsStaff from './columnsStaff'
import columnsDevice from './columnsDevice'

export default {
  components: {

  },
  props: {
    visibleForm: {
      type: Boolean,
      required: true,
      default: false
    },
    isCreate: {
      type: Boolean,
      required: true,
      default: false
    },
    isUpdate: {
      type: Boolean,
      required: true,
      default: false
    },
    modelObject: {
      type: Object,
      required: true
    }
  },
  computed: {
    form () {
      return this.modelObject
    }
  },
  mounted () {
    if (this.visibleForm === true) {
      this.visible = true
    } else {
      this.visible = false
    }
  },
  data () {
    return {
      columnsStaff,
      columnsDevice,
      visible: false,
      listWarehouse: [],
      listProvince: [],
      listManage: [],
      loading: false,
      paginationDevice: {
        current: 1,
        total: 1,
        pageSize: 10,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      paginationStaff: {
        current: 1,
        total: 1,
        pageSize: 10,
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
    this.getListProvince()
    this.getListWarehouse()
    this.getListManage()
  },
  methods: {
    phoneValidator,
    checkEmail,
    checkCode,
    getListProvince () {
      listProvince().then(rs => {
        if (rs) {
          this.listProvince = rs
        }
      })
    },
    getListManage () {
      SearchUser({ pagination: false }).then(rs => {
        if (rs) {
          this.listManage = rs.data
        }
      })
    },
    getListWarehouse (value) {
      this.loading = true
      const params = {
        pagination: false
      }
      searchWarehouseManagement(params).then(res => {
        this.listWarehouse = res.data
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
    closeForm () {
      this.visibleForm = false
      this.form = {}
      this.$emit('closeForm')
    },
    submitData () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = this.form
          if (this.isCreate === true) {
            this.loading = true
            createWarehouseManagement(params).then(rs => {
              if (rs) {
                this.$success({ content: 'Thêm mới thành công' })
                this.closeForm()
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
          } else {
            this.loading = true
            updateWarehouseManagement(params).then(rs => {
              if (rs) {
                this.$success({ content: 'Cập nhật thành công' })
                this.closeForm()
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
          }
        }
      })
    }
  }
}
</script>
