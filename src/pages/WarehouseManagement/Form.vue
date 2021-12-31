<template>
  <a-drawer
    :visible="visible"
    :title="isCreate === true? 'Thêm mới' : 'Cập nhật'"
    @close="closeForm"
    width="850"
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
              :rules="[]">
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
          <a-col :xs="24" :md="12" :lg="12"></a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <div style="margin: 10px 0">
              <a-button :disabled="disabledAddUser" type="primary" @click="addRowUser">
                <a-icon type="plus-circle"></a-icon>
              </a-button>
            </div>
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
            <a-form-model ref="formUserValidate" :model="formUser">
              <a-table
                :columns="columnsStaff"
                :data-source="form.listUser"
                :rowKey=" (record, index ) => index"
                :pagination="paginationStaff"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                class="ant-table-bordered">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ index + 1 }} </span>
                </template>
                <template slot="userName" slot-scope="text, record, index">
                  <a-form-model-item
                    v-if="record.editable === true"
                    :prop="'items.' + index + '.id'"
                  >
                    <a-select
                      @change="changeUser(record)"
                      v-model="record.id">
                      <a-select-option v-for="item in listUser" :key="item.id" :value="item.id">
                        {{ item.userName + '-' + item.fullName }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <template v-else>
                    {{ record.userName + '-' + record.fullName }}
                  </template>
                </template>
                <template slot="actionTitle">
                  <a-icon type="control" :style="{fontSize: '14px'}"/>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                  <div v-if="record.editable">
                    <span @click="saveRowUser(record)" style="padding-right:12px;cursor: pointer">
                      <a-icon
                        type="save"
                        :style="{color: '#F98500',fontSize: '14px'}"
                      />
                    </span>
                    <span @click="deleteRowUser(index)" style="cursor: pointer">
                      <a-icon
                        type="delete"
                        :style="{color: '#ee0033', fontSize: '14px'}"
                      />
                    </span>
                  </div>
                  <div v-else>
                    <span @click="showEditRowUser(record.id)" style="padding-right:12px;cursor: pointer">
                      <a-icon
                        type="form"
                        :style="{color: '#ee0033',fontSize: '14px'}"
                      />
                    </span>
                    <span @click="deleteRowUser(index)" style="cursor: pointer">
                      <a-icon
                        type="delete"
                        :style="{color: '#ee0033', fontSize: '14px'}"
                      />
                    </span>
                  </div>
                </template>
              </a-table>
            </a-form-model>
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
import { listUserNotInWarehouse } from '@/api/Config/accounts'

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
    },
    warehouseId: {
      type: Number,
      required: true
    }
  },
  computed: {
    form () {
      return this.modelObject
    },
    formUser () {
      return {
        items: this.modelObject.listUser
      }
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
      listUser: [],
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
      },
      disabledAddUser: false
    }
  },
  created () {
    this.getListProvince()
    this.getListWarehouse()
    this.getListManage()
    this.getListUserNotInWarehouse(this.warehouseId)
  },
  mounted () {
    if (this.visibleForm === true) {
      this.visible = true
    } else {
      this.visible = false
    }
  },
  methods: {
    phoneValidator,
    checkEmail,
    checkCode,
    changeUser (record) {
      if (record) {
        const user = this.listUser.find(item => item.id === record.id)
        record.userName = user.userName
        record.fullName = user.fullName
      }
    },
    getListUserNotInWarehouse (id) {
      listUserNotInWarehouse(id).then(rs => {
        this.listUser = rs
      })
    },
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
    },
    appendRowEmpty (numberRow) {
      if (this.form.listUser.length + numberRow > this.paginationStaff.pageSize) {
        this.form.listUser.splice(this.paginationStaff.pageSize - numberRow, numberRow)
      }
      for (let i = 0; i < numberRow; i++) {
        const newData = {
          id: '',
          userName: '',
          fullName: '',
          editable: true
        }
        this.form.listUser = [newData, ...this.form.listUser]
        this.expandedRowKeys = []
      }
    },
    addRowUser () {
      this.appendRowEmpty(1)
      this.disabledAddUser = true
    },
    showEditRowUser (id) {
      const newData = [...this.form.listUser]
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].editable) {
          this.saveRowUser(newData[i])
        }
        if (newData[i].id === id) {
          newData[i].editable = true
        }
      }
      this.form.listUser = newData
    },
    saveRowUser (record) {
      record.editable = false
      this.disabledAddUser = false
    },
    deleteRowUser (index) {
      this.form.listUser.splice(index, 1)
    }
  }
}
</script>
