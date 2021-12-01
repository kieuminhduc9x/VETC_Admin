<template>
  <a-spin :spinning="loading" class="app-spinning">
    <a-card :bordered="false">
      <a-form-model
        :model="hubForm"
        :rules="rules"
        @submit="handleSubmit"
        ref="ruleForm">
        <a-row :gutter="16" type="flex">
          <a-col :xs="24">
            <a-form-model-item
              label="Tên Hub"
              prop="hubName">
              <a-input v-model="hubForm.hubName"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <province-area :model-object="hubForm"></province-area>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-model-item
              label="Địa chỉ chi tiết"
              prop="address">
              <a-input v-model="hubForm.address"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-model-item
              label="Điện thoại"
              prop="phone">
              <a-input v-model="hubForm.phone"/>
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
import { InsertHub, UpdateHub } from '@/api/hub'
import ProvinceArea from '@/components/ProvinceArea'
import { formatPhone } from '@/utils/common'

export default {
  name: 'HubForm',
  components: {
    ProvinceArea
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
    hubData: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    }
  },
  data () {
    const validateHubName = (rule, value, callback) => {
      if (value) {
        const reg = new RegExp('^[a-zA-Z0-9_aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ .-]*$', 'g')
        if (reg.test(value) === false) {
          callback(new Error('Tên Hub không hợp lệ'))
        } else {
          callback()
        }
      }
      callback()
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
      hubForm: {
        address: '',
        districtCode: '',
        hubName: '',
        phone: '',
        precinctCode: '',
        provinceCode: ''
      },
      rules: {
        hubName: [
          { required: true, message: 'Tên Hub không được phép trống', trigger: 'blur' },
          { validator: validateHubName, trigger: 'change' }
        ],
        address: [
          { required: true, message: 'Địa chỉ chi tiết không được phép trống', trigger: 'blur' }
        ],
        provinceCode: [
          { required: true, message: 'Tỉnh/TP không được phép trống', trigger: 'change' }
        ],
        districtCode: [
          { required: true, message: 'Quận/Huyện không được phép trống', trigger: 'change' }
        ],
        phone: [
          { required: true, message: 'Điện thoại không được phép trống', trigger: 'blur' },
          { validator: validatePhoneInput, trigger: 'blur' }
        ],
        precinctCode: [
          { required: true, message: 'Xã/Phường không được phép trống', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    if (this.isEditable && this.hubData && this.hubData.hubId) {
      this.hubForm = {
        hubId: this.hubData.hubId,
        phone: this.hubData.phone,
        address: this.hubData.address,
        districtCode: this.hubData.districtCode,
        hubName: this.hubData.hubName,
        precinctCode: this.hubData.precinctCode,
        provinceCode: this.hubData.provinceCode
      }
    }
  },
  methods: {
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
            title: 'Bạn chắc chắn muốn ' + (this.hubForm.hubId ? 'cập nhật' : 'thêm mới') + ' Hub?',
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
      if (this.hubForm.hubId) {
        UpdateHub(this.hubForm).then(res => {
          this.$notification.success({
            message: 'Cập nhật Hub',
            description:
            'Cập nhật Hub thành công',
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
        InsertHub(this.hubForm).then(res => {
          this.$notification.success({
            message: 'Thêm mới Hub',
            description:
            'Thêm mới Hub thành công',
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
      }
    }
  }
}
</script>
