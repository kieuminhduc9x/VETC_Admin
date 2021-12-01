<template>
  <a-spin :spinning="loading" class="app-spinning">
    <a-card :bordered="false">
      <a-form-model
        :model="hubForm"
        :rules="rules"
        layout="inline"
        @submit="handleSubmit"
        ref="ruleForm">
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :sm="24" :md="12">
            <a-form-model-item
              label="Mã Quận/Huyện" >
              {{ areaSelected.districtCode }}
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12">
            <a-form-model-item
              label="Tên Quận/Huyện" >
              {{ areaSelected.districtName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex" style="margin-top: 20px">
          <a-col :xs="24" :sm="24" :md="12">
            <a-form-model-item
              label="Tên Hub"
              prop="hubId">
              <a-select
                :filter-option="filterSelectOption"
                :allowClear="true"
                show-search
                style="width: 200px"
                v-model="hubForm.hubId"
              >
                <a-select-option :value="null" default-value="" :key="'all'">-- Chọn Hub --</a-select-option>

                <a-select-option

                  v-for="item in listHub"
                  :key="'p-g-' + item.hubId"
                  :value="item.hubId">{{ item.hubName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12">
            <a-form-model-item
              label="Địa chỉ Hub" >
              {{ hubSelected.address }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" justify="space-around" align="middle" style="margin-top: 20px">
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
import { GetHubByProvince } from '@/api/hub'
import ProvinceArea from '@/components/ProvinceArea'
import _findIndex from 'lodash/findIndex'
import { UpdateDistrict } from '@/api/common'
export default {
  name: 'HubForm',
  components: {
    ProvinceArea
  },
  props: {

    areaSelected: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      activeKey: [1, 2, 3],
      loading: false,
      hubForm: {
        hubId: '',
        districtId: ''
      },
      rules: {
        hubId: [
          { required: true, message: 'Tên Hub không được phép trống' }
        ]
      },
      listHub: []
    }
  },
  computed: {
    hubSelected () {
      if (this.hubForm.hubId) {
        const idx = _findIndex(this.listHub, { hubId: this.hubForm.hubId })
        if (idx >= 0) {
          return this.listHub[idx]
        }
      }
      return {}
    }
  },
  created () {
    this.fetchHub()
    this.hubForm = {
      hubId: this.areaSelected.hubId,
      districtId: this.areaSelected.districtId
    }
  },
  methods: {
    phoneValidator,
    closePopup (payload) {
      this.$emit('closeModal', payload)
    },
    handleCancel (payload = {}) {
      this.closePopup(false)
    },
    fetchHub () {
      GetHubByProvince({ provinceCode: this.areaSelected.provinceCode, size: 1000 }).then(res => {
        this.listHub = res.data
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
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const $this = this
          $this.$confirm({
            title: 'Bạn chắc chắn muốn cập nhật địa bàn ?',
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
      UpdateDistrict(this.hubForm).then(res => {
        this.$notification.success({
          message: 'Cập nhật địa bàn',
          description:
              'Cập nhật địa bàn thành công',
          duration: 5
        })
        this.closePopup(this.hubSelected)
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
</script>
