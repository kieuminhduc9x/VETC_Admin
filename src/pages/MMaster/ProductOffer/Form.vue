<template>
  <a-spin :spinning="loading" class="app-spinning">
    <a-card :bordered="false">
      <a-form-model
        :model="modelForm"
        :rules="rules"
        @submit="handleSubmit"
        ref="ruleForm">

        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="12" :lg="12">
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
          <a-col :xs="24" :md="12" :lg="12">
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
              label="Thời gian bắt đầu"
              prop="fromTime">
              <a-time-picker
                placeholder="Chọn thời gian"
                style="width: 100%"
                format="HH:mm"
                v-model="modelForm.fromTimeMoment"
                :show-time="false"
                @change="onChangeFromTime"
              />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Thời gian kết thúc"
              prop="toTime">
              <a-time-picker
                placeholder="Chọn thời gian"
                style="width: 100%"
                format="HH:mm"
                v-model="modelForm.toTimeMoment"
                :show-time="false"
                @change="onChangeToTime"
              />

            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Trọng lượng kg đầu tiên"
              prop="firstWeight">
              <a-input-number
                style="width: 100%"
                v-model="modelForm.firstWeight"
              />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Giá block kg đầu tiên"
              prop="firstPrice">
              <a-input-number
                style="width: 100%"
                v-model="modelForm.firstPrice"
              />

            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Giá mỗi kg tiếp theo"
              prop="nextPrice">
              <a-input-number
                style="width: 100%"
                v-model="modelForm.nextPrice"
              />

            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Ngày hiệu lực"
              prop="startDate">
              <a-date-picker
                placeholder="dd/mm/yyyy"
                :disabled-date="disabledDate"
                v-model="modelForm.startDateMoment"
                :show-time="false"
                format="DD/MM/YYYY"
                @change="onChangeStaDate"
              />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item
              label="Ngày hết hiệu lực"
              prop="endDate">
              <a-date-picker
                placeholder="dd/mm/yyyy"
                :disabled-date="disabledDate"
                v-model="modelForm.endDateMoment"
                :show-time="false"
                format="DD/MM/YYYY"
                @change="onChangeEndDate"
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
              style=" min-width:120px">Đóng
            </a-button>
            <a-button
              type="primary"
              style="margin-left: 1rem;"
              @click="handleSubmit"
              :loading="loading">Lưu
            </a-button>

          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
  </a-spin>
</template>
<script>
import { commonMethods, authComputed } from '@/store/helpers'
import { ProductOfferCreate, ProductOfferUpdate } from '@/api/product_offer'
import moment from 'moment'

export default {
  name: 'ModelForm',
  components: {},
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
    const validatefirstWeightMin = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('Trọng lượng đầu tiên phải lớn hơn hơn 0 Kg'))
      } else {
        this.$refs.ruleForm.validateField('firstWeight')
        callback()
      }
    }
    const validatefirstPriceMin = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('Giá block đầu tiên không được phép âm'))
      } else {
        this.$refs.ruleForm.validateField('firstPrice')
        callback()
      }
    }
    const validatenextPriceMin = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('Giá mỗi kg tiếp theo không được phép âm'))
      } else {
        this.$refs.ruleForm.validateField('nextPrice')
        callback()
      }
    }
    const validateEndDate = (rule, value, callback) => {
      if (moment(this.modelForm.startDate + ' ' + this.modelForm.fromTime, 'YYYY-MM-DD HH:mm').isAfter(moment(this.modelForm.endDate + ' ' + this.modelForm.toTime, 'YYYY-MM-DD HH:mm'))) {
        callback(new Error('Ngày hiệu lực không được lớn hơn Ngày hết hiệu lực'))
      } else {
        this.$refs.ruleForm.validateField('endDate')
        callback()
      }
    }
    return {
      activeKey: [1, 2, 3],
      loading: false,
      listProvinces: [],
      modelForm: {
        fromProvince: '',
        toProvince: '',
        fromTime: '',
        fromTimeMoment: '',
        toTime: '',
        toTimeMoment: '',
        firstWeight: '',
        firstPrice: '',
        nextPrice: '',
        startDate: '',
        startDateMoment: '',
        endDate: '',
        endDateMoment: ''
      },
      rules: {
        fromProvince: [
          { required: true, message: 'Từ Tỉnh/TP không được phép trống', trigger: 'change' },
          { validator: validateSameProvince, trigger: 'change' }
        ],
        toProvince: [
          { required: true, message: 'Đến Tỉnh/TP không được phép trống', trigger: 'change' }
        ],
        fromTime: [
          { required: true, message: 'Thời gian bắt đầu không được phép trống', trigger: 'change' }
        ],
        toTime: [
          { required: true, message: 'Thời gian kết thúc không được phép trống', trigger: 'change' }
        ],
        firstWeight: [
          { required: true, message: 'Trọng lượng kg đầu tiên không được phép trống', trigger: 'change' },
          { validator: validatefirstWeightMin, trigger: 'change' }
        ],
        firstPrice: [
          { required: true, message: 'Giá block kg đầu tiên không được phép trống', trigger: 'change' },
          { validator: validatefirstPriceMin, trigger: 'change' }
        ],
        nextPrice: [
          { required: true, message: 'Giá mỗi kg tiếp theo không được phép trống', trigger: 'change' },
          { validator: validatenextPriceMin, trigger: 'change' }
        ],
        startDate: [
          { required: true, message: 'Ngày hiệu lực không được phép trống', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: 'Ngày hết hiệu lực không được phép trống' },
          { validator: validateEndDate, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...authComputed
  },
  created () {
    this.getProvinces()
    if (this.isEditable && this.objectEdit && this.objectEdit.productOfferId) {
      this.modelForm = {
        productOfferId: this.objectEdit.productOfferId,
        fromProvince: this.objectEdit.fromProvince,
        toProvince: this.objectEdit.toProvince,
        fromTime: this.objectEdit.fromTime,
        fromTimeMoment: this.objectEdit.fromTime ? moment(this.objectEdit.fromTime, 'HH:mm') : null,
        toTime: this.objectEdit.toTime,
        toTimeMoment: this.objectEdit.toTime ? moment(this.objectEdit.toTime, 'HH:mm') : null,
        firstWeight: this.objectEdit.firstWeight,
        firstPrice: this.objectEdit.firstPrice,
        nextPrice: this.objectEdit.nextPrice,
        startDate: this.objectEdit.startDate ? moment(this.objectEdit.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
        startDateMoment: this.objectEdit.startDate ? moment(this.objectEdit.startDate, 'DD/MM/YYYY') : null,
        endDate: this.objectEdit.endDate ? moment(this.objectEdit.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
        endDateMoment: this.objectEdit.endDate ? moment(this.objectEdit.endDate, 'DD/MM/YYYY') : null

      }
    }
  },
  methods: {
    ...commonMethods,
    disabledDate (current) {
      // Can not select days before today and today
      return current < moment().startOf('day')
    },
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
      })
    },
    onChangeStaDate (value, dateString) {
      this.modelForm.startDate = value ? value.format('YYYY-MM-DD') : null
    },
    onChangeEndDate (value, dateString) {
      this.modelForm.endDate = value ? value.format('YYYY-MM-DD') : null
    },
    onChangeFromTime (value, dateString) {
      this.modelForm.fromTime = dateString
    },
    onChangeToTime (value, dateString) {
      this.modelForm.toTime = dateString
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
            title: 'Bạn chắc chắn muốn ' + (this.modelForm.productOfferId ? 'cập nhật' : 'thêm mới') + ' giá vận đơn hàng không ?',
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
      if (this.modelForm.productOfferId) {
        ProductOfferUpdate(this.modelForm).then(res => {
          this.$notification.success({
            message: 'Cập nhật giá vận đơn hàng không',
            description:
                'Cập nhật giá vận đơn hàng không thành công',
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
        ProductOfferCreate(this.modelForm).then(res => {
          this.$notification.success({
            message: 'Thêm mới giá vận đơn hàng không',
            description:
                'Thêm mới giá vận đơn hàng không thành công',
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
