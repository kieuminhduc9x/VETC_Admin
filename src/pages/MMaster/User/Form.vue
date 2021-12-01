<template>
  <a-spin :spinning="loading" class="app-spinning">
    <a-card :bordered="false">
      <a-form-model
        :model="modelForm"
        :rules="rules"
        @submit="handleSubmit"
        ref="ruleForm">
        <a-row :gutter="16" type="flex">
          <a-col :xs="12">
            <a-form-model-item
              label="Tên đăng nhập"
              prop="userName">
              <a-input v-model="modelForm.userName"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="12">
            <a-form-model-item
              label="Tên đầy đủ"
              prop="fullName">
              <a-input v-model="modelForm.fullName"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="12">
            <a-form-model-item
              label="Điện thoại"
              prop="phone">
              <a-input v-model="modelForm.phone"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="12">
            <a-form-model-item prop="province" label="Tỉnh/TP">
              <a-select
                :filter-option="filterSelectOption"
                :allowClear="true"
                show-search
                style="width: 100%"
                v-model="modelForm.province"
              >
                <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
                <a-select-option
                  v-for="item in listProvinces"
                  :key="'p-g-' + item.provinceCode"
                  :value="item.provinceCode">{{ item.provinceName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="12">
            <a-form-model-item
              label="Email"
              prop="email">
              <a-input v-model="modelForm.email"/>
            </a-form-model-item>
          </a-col>

        </a-row>
        <a-row :gutter="24" type="flex" justify="space-around" align="middle" v-if="isEditable || isCreate">
          <a-col
            :xs="24"
            :md="24"
            :lg="24"
            class="cus-flex-center"
          >
            <a-button
              @click="handleCancel"
              style=" min-width:120px">Đóng</a-button>
            <a-button
              type="primary"
              style="margin-left: 1rem;"
              @click="handleSubmit"
              :loading="loading">Lưu</a-button>

          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
  </a-spin>
</template>
<script>
import { phoneValidator } from '@/utils/helpers'
import { InsertSecUser, UpdateSecUser } from '@/api/user'
import _cloneDeep from 'lodash/cloneDeep'
import { commonMethods } from '@/store/helpers'
import { formatPhone } from '@/utils/common'

export default {
  name: 'ModelForm',
  components: {
  },
  props: {
    isCreate: {
      type: Boolean,
      required: true
    },
    isEditable: {
      type: Boolean,
      required: true
    },
    isView: {
      type: Boolean,
      required: true
    },
    modelData: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    }
  },
  data () {
    const validateUsernameInput = (rule, value, callback) => {
      const numbersOnly = /^[A-Za-z0-9]+$/
      if (value && !(numbersOnly.test(value))) {
        callback(new Error('Tên đăng nhập không hợp lệ'))
      } else {
        this.$refs.ruleForm.validateField('userName')
        callback()
      }
    }
    const validatePhoneInput = (rule, value, callback) => {
      if (value) {
        const phoneFormatted = formatPhone(value)
        const numbersOnly = /^[0-9]+$/
        if (!(numbersOnly.test(phoneFormatted))) {
          callback(new Error('Số điện thoại không đúng định dạng'))
        } else if (phoneFormatted.length !== 9) {
          callback(new Error('Số điện thoại không đúng định dạng'))
        } else {
          this.$refs.ruleForm.validateField('phone')
          callback()
        }
      } else {
        this.$refs.ruleForm.validateField('phone')
        callback()
      }
    }
    return {
      activeKey: [1, 2, 3],
      loading: false,
      modelForm: {
        userName: '',
        fullName: '',
        province: '',
        phone: '',
        email: ''
      },
      listProvinces: [],
      rules: {
        userName: [
          { required: true, message: 'Tên đăng nhập không được phép trống' },
          { validator: validateUsernameInput, trigger: 'blur' }

        ],
        province: [
          { required: true, message: 'Tỉnh/TP không được phép trống' }

        ],
        fullName: [
          { required: true, message: 'Tên đầy đủ không được phép trống' }

        ],
        phone: [
          { required: true, message: 'Điện thoại không được phép trống' },
          { validator: validatePhoneInput, trigger: 'blur' }

        ],
        email: [
          { required: true, message: 'Email không được phép trống' }

        ]
      }
    }
  },
  created () {
    this.getProvinces()
    if (this.isEditable && this.modelData && this.modelData.userId) {
      this.modelForm = {
        userName: this.modelData.userName,
        fullName: this.modelData.fullName,
        province: this.modelData.province,
        roleId: this.modelData.roleId,
        phone: this.modelData.phone,
        email: this.modelData.email,
        userId: this.modelData.userId,
        status: this.modelData.status
      }
    }
  },
  methods: {
    ...commonMethods,
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
        this.listToProvinces = res
      })
    },
    phoneValidator,
    gotoList (reload = false) {
      this.$emit('closeModal', reload)
    },
    handleCancel () {
      this.$emit('closeModal', false)
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const $this = this
          $this.$confirm({
            title: 'Bạn chắc chắn muốn ' + (this.modelForm.userId ? 'cập nhật' : 'thêm mới') + ' nhân viên ?',
            onOk () {
              $this.doUpdate()
            },
            onCancel () {
            }
          })
        }
      })
    },

    doUpdate () {
      this.loading = true
      if (this.modelForm.userId) {
        const params = _cloneDeep(this.modelForm)
        delete params.password
        UpdateSecUser(params).then(res => {
          this.$notification.success({
            message: 'Cập nhật nhân viên',
            description:
            'Cập nhật nhân viên thành công',
            duration: 5
          })
          this.gotoList(true)
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
        InsertSecUser(this.modelForm).then(res => {
          this.$notification.success({
            message: 'Thêm mới nhân viên',
            description:
            'Thêm mới nhân viên thành công',
            duration: 5
          })
          this.gotoList(true)
        }).catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: '',
            description: msg,
            duration: 5
          })
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
  }
}
</script>
