<template>
  <a-spin :spinning="loading" class="app-spinning">
    <a-card :bordered="false">
      <a-form-model
        :model="modelForm"
        :rules="rules"
        @submit="handleSubmit"
        ref="ruleForm">
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Mã chuyến bay"
              prop="flightCode">
              <a-input v-model="modelForm.flightCode"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="12" :lg="12" >
            <a-form-model-item label="Từ Tỉnh/TP" prop="fromProvince">
              <a-select
                :allowClear="true"
                :filter-option="filterSelectOption"
                show-search
                style="width: 100%"
                v-model="modelForm.fromProvince"
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
          <a-col :xs="24" :md="12" :lg="12" >
            <a-form-model-item prop="toProvince" label="Đến Tỉnh/TP">
              <a-select
                :filter-option="filterSelectOption"
                :allowClear="true"
                show-search
                style="width: 100%"
                v-model="modelForm.toProvince"
              >
                <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
                <a-select-option
                  v-for="item in listProvinces"
                  :key="'t-p-' + item.provinceCode"
                  :value="item.provinceCode">{{ item.provinceName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Thời gian cất cánh"
              prop="takeOff">
              <a-date-picker
                :disabled-date="disabledDate"
                v-model="modelForm.takeOff"
                :show-time="{ format: 'HH:mm' }"
                format="DD/MM/YYYY HH:mm"
                @change="onChangeTakeOff"
              />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Thời gian hạ cánh"
              prop="landing">
              <a-date-picker
                :disabled-date="disabledDate"
                v-model="modelForm.landing"
                :show-time="{ format: 'HH:mm' }"
                format="DD/MM/YYYY HH:mm"
                @change="onChangeLanding"
              />

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
import { FlightCreate, FlightUpdate } from '@/api/flight'
import { commonMethods, authComputed } from '@/store/helpers'
import moment from 'moment'
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
    objectEdit: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    }
  },
  data () {
    const validateSameProvince = (rule, value, callback) => {
      if (this.modelForm.fromProvince === this.modelForm.toProvince) {
        callback(new Error('Từ Tỉnh/TP và Đến Tỉnh/TP không được phép trùng'))
      } else {
        this.$refs.ruleForm.validateField('fromProvince')
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      const reg = new RegExp('^[A-Za-z0-9\\-_]+$', 'g')
      if (!reg.test(value)) {
        callback(new Error('Mã chuyến bay không đúng định dạng'))
      } else {
        this.$refs.ruleForm.validateField('flightCode')
        callback()
      }
    }
    return {
      activeKey: [1, 2, 3],
      loading: false,

      modelForm: {
        flightCode: '',
        fromProvince: '',
        toProvince: '',
        landingTime: '',
        takeOffTime: '',
        takeOff: null,
        landing: null
      },
      listProvinces: [],
      rules: {
        flightCode: [
          { required: true, message: 'Mã chuyến bay không được phép trống' },
          { validator: validateCode, trigger: 'change' }
        ],
        fromProvince: [
          { required: true, message: 'Từ Tỉnh/TP không được phép trống' },
          { validator: validateSameProvince, trigger: 'change' }

        ],
        toProvince: [
          { required: true, message: 'Đến Tỉnh/TP không được phép trống' }
        ],
        landing: [
          { required: true, message: 'Thời gian hạ cánh không được phép trống' }
        ],
        takeOff: [
          { required: true, message: 'Thời gian cất cánh không được phép trống' }
        ]
      }
    }
  },
  computed: {
    ...authComputed
  },
  created () {
    this.getProvinces()
    if (this.isEditable && this.objectEdit && this.objectEdit.flightId) {
      this.modelForm = {
        flightId: this.objectEdit.flightId,
        flightCode: this.objectEdit.flightCode,
        fromProvince: this.objectEdit.fromProvince,
        toProvince: this.objectEdit.toProvince,
        landingTime: moment(this.objectEdit.landingTime, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        landing: moment(this.objectEdit.landingTime, 'DD/MM/YYYY HH:mm'),
        takeOffTime: moment(this.objectEdit.takeOffTime, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        takeOff: moment(this.objectEdit.takeOffTime, 'DD/MM/YYYY HH:mm'),
        provinceCode: this.objectEdit.provinceCode
      }
    }
  },
  methods: {
    ...commonMethods,
    onChangeTakeOff (value, dateString) {
      this.modelForm.takeOffTime = value ? value.format('YYYY-MM-DD HH:mm') : null
    },
    disabledDate (current) {
      // Can not select days before today and today
      return current < moment().startOf('day')
    },
    onChangeLanding (value, dateString) {
      this.modelForm.landingTime = value ? value.format('YYYY-MM-DD HH:mm') : null
    },
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
      })
    },
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
            title: 'Bạn chắc chắn muốn ' + (this.modelForm.flightId ? 'cập nhật' : 'thêm mới') + ' chuyến bay ?',
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
      if (this.modelForm.flightId) {
        FlightUpdate(this.modelForm).then(res => {
          this.$notification.success({
            message: 'Cập nhật chuyến bay',
            description:
            'Cập nhật chuyến bay thành công',
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
        FlightCreate(this.modelForm).then(res => {
          this.$notification.success({
            message: 'Thêm mới chuyến bay',
            description:
            'Thêm mới chuyến bay thành công',
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
