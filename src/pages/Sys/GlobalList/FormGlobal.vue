<template>
  <a-form :form="form" @submit="handleSubmit" layout="vertical" class="contract-update-container form-update">
    <a-collapse v-model="activeKey" class="contract-information">
      <a-collapse-panel header="Thông tin chung" class="header-contant" key="1">
        <a-card style="width: 100%;" :bordered="false">

          <a-row :gutter="24" type="flex">
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-item label="Tên đối tác">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['name', {initialValue:partnerData.name,
                                         rules: [
                                           { required: true, message: 'Tên đối tác là bắt buộc' },
                                           {
                                             message: 'Tên đối tác tối đa 100 ký tự.',
                                             validator: (rule, value, cb) => utf8ByteCount(value) <100 ? cb() : cb('error'),
                                           }
                                         ]
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="3" :lg="3">
              <a-form-item label="Mã đối tác">
                <a-input
                  :disabled="!isEditable || !isCreate"
                  v-decorator="['partnerCode', {initialValue:partnerData.partnerCode,
                                                rules: [
                                                  { required: true, message: 'Mã đối tác là bắt buộc' },
                                                  {
                                                    message: 'Mã đối tác tối đa 40 ký tự.',
                                                    validator: (rule, value, cb) => utf8ByteCount(value) < 40 ? cb() : cb('error'),
                                                  }
                                                ]
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="3" :lg="3">
              <a-form-item label="MST / GPKD">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['tin', {initialValue:partnerData.tin,
                                        rules: [
                                          { required: true, message: 'MST / GPKD là bắt buộc' },
                                          {
                                            message: 'MST / GPKD tối đa 50 ký tự.',
                                            validator: (rule, value, cb) => utf8ByteCount(value) < 50 ? cb() : cb('error'),
                                          }
                                        ]
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="3" :lg="3">
              <a-form-item label="Điện thoại">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['tel', {
                    initialValue:partnerData.tel,
                    rules: [
                      { required: true, message: 'Điện thoại là bắt buộc' },
                      {
                        message: 'Điện thoại tối đa 15 ký tự.',
                        validator: (rule, value, cb) => utf8ByteCount(value) < 15 ? cb() : cb('error'),
                      }
                    ]
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="3" :lg="3">
              <a-form-item label="Fax">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['fax', {initialValue:partnerData.fax, rules: [
                    {
                      message: 'Fax tối đa 15 ký tự.',
                      validator: (rule, value, cb) => utf8ByteCount(value) < 15 ? cb() : cb('error'),
                    }
                  ]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-item label="Email">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['email', {initialValue:partnerData.email, rules: [
                    {
                      message: 'Email tối đa 50 ký tự.',
                      validator: (rule, value, cb) => utf8ByteCount(value) < 50 ? cb() : cb('error'),
                    },
                    {
                      message: 'Email không đúng định dạng.',
                      validator: (rule, value, cb) => validateEmail(value) ? cb() : cb('error'),
                    }
                  ]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" type="flex">
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-item label="Địa chỉ chi tiết">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['address', {initialValue:partnerData.address, rules: [{
                    message: 'Địa chỉ tối đa 500 ký tự.',
                    validator: (rule, value, cb) => utf8ByteCount(value) < 500 ? cb() : cb('error'),
                  }] }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <province-area :model-object="partnerData" :is-editable="isEditable" :form="form"></province-area>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model="activeKey2" style="margin-top: 8px">
      <a-collapse-panel header="Thông tin đại diện" class="header-contant" key="1">
        <a-card style="width: 100%;" :bordered="false">
          <a-row :gutter="24" type="flex">
            <a-col :xs="24" :md="4" :lg="4">
              <a-form-item label="Người đại diện">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['representName', {
                    initialValue:partnerData.representName,
                    rules: [
                      { required: true, message: 'Người đại diện là bắt buộc' },
                      {
                        message: 'Người đại diện tối đa 100 ký tự.',
                        validator: (rule, value, cb) => utf8ByteCount(value) <100 ? cb() : cb('error'),
                      }
                    ]
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="4" :lg="4">
              <a-form-item label="Loại giấy tờ">
                <a-select
                  :disabled="!isEditable"
                  style="width: 100%"
                  :allowClear="true"
                  v-decorator="['representIdType', {
                    initialValue: partnerData.representIdType,
                    rules: [{ required: true, message: 'Loại giấy tờ là bắt buộc' } ]
                  }]">
                  <a-select-option v-for="(item,idx) in listIdType" :key="'i-t-s-' + idx" :value="item.value">{{
                    item.name }}
                  </a-select-option>

                </a-select>
              </a-form-item>
            </a-col>

            <a-col :xs="24" :md="4" :lg="4">
              <a-form-item label="Số giấy tờ định danh">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['representIdNo', {
                    initialValue:partnerData.representIdNo,
                    rules: [
                      { required: true, message: 'Số giấy tờ định danh là bắt buộc' },
                      {
                        message: 'Số giấy tờ định danh tối đa 30 ký tự.',
                        validator: (rule, value, cb) => utf8ByteCount(value) < 30 ? cb() : cb('error'),
                      }
                    ]
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="4" :lg="4">
              <a-form-item label="Chức vụ">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['representTitle', {
                    initialValue:partnerData.representTitle,
                    rules: [
                      { required: true, message: 'Chức vụ là bắt buộc' },
                      {
                        message: 'Chức vụ tối đa 50 ký tự.',
                        validator: (rule, value, cb) => utf8ByteCount(value) < 50 ? cb() : cb('error'),
                      }
                    ]
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="4" :lg="4">
              <a-form-item label="Điện thoại">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['representTel', {initialValue:partnerData.representTel, rules: [
                    {
                      message: 'Điện thoại tối đa 15 ký tự.',
                      validator: (rule, value, cb) => utf8ByteCount(value) < 15 ? cb() : cb('error'),
                    }
                  ]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="4" :lg="4">
              <a-form-item label="Email">
                <a-input
                  :disabled="!isEditable"
                  v-decorator="['representEmail', {initialValue:partnerData.representEmail, rules: [
                    {
                      message: 'Email tối đa 50 ký tự.',
                      validator: (rule, value, cb) => utf8ByteCount(value) < 50 ? cb() : cb('error'),
                    },
                    {
                      message: 'Email không đúng định dạng.',
                      validator: (rule, value, cb) => validateEmail(value) ? cb() : cb('error'),
                    }
                  ]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model="activeKey3" style="margin-top: 8px" v-if="!isCreate">
      <a-collapse-panel header="Sản phẩm hợp tác" class="header-contant" key="1">
        <a-card style="width: 100%;" :bordered="false">
          <a-row :gutter="24" type="flex">
            <cooperate-product :table-data="partnerData.lstRevenueShared" row-key="partnerRevenueSharedId"/>

          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model="activeKey4" style="margin-top: 8px" v-if="!isCreate">
      <a-collapse-panel header="Sản phẩm hợp tác theo gói cước đặc thù" class="header-contant" key="1">
        <a-card style="width: 100%;" :bordered="false">
          <a-row :gutter="24" type="flex">
            <cooperate-product :table-data="partnerData.lstRevenueSharedSpecial" row-key="partnerRevenueSharedId"/>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>

    <a-row :gutter="24" type="flex" justify="space-around" align="middle" v-if="isEditable">
      <a-col
        :xs="24"
        :md="24"
        :lg="24"
        style=" margin-top: 0.5rem;margin-bottom:1.5rem;display:flex;justify-content:center">

        <a-button type="primary" html-type="submit" :loading="loading">Lưu</a-button>
        <a-button @click="gotoList" style="margin-left: 1rem; min-width:120px"> Quay lại</a-button>

      </a-col>
    </a-row>

  </a-form>
</template>

<script>
import _merge from 'lodash/merge'

import { createPartner, updatePartner } from '@/api/partner'
import { CREATE_SUCCESS_MSG, UPDATE_SUCCESS_MSG } from '@/constants'
import CooperateProduct from './CooperateProduct'
import ProvinceArea from '@/components/ProvinceArea'
import { commonMethods } from '@/store/helpers'
import { GLOBAL_PARTNER_STATUS_CODE, GLOBAL_PARTNER_ID_TYPE } from '@/constants/global_list'

export default {
  components: {
    CooperateProduct,
    ProvinceArea
  },
  props: {
    isEditable: {
      type: Boolean,
      default: true
    },
    partnerData: {
      type: Object,
      required: true
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      name: 'partner_form',
      onFieldsChange: (_, changedFields) => {
        if (changedFields.province !== undefined) {
          this.provinceCode = changedFields.province.value
        }

        if (changedFields.district !== undefined) {
          this.districtCode = changedFields.district.value
        }
      }
    })
  },
  name: 'FormPartner',
  data () {
    return {
      loading: false,
      isView: false,
      activeKey: 1,
      activeKey2: 1,
      activeKey3: 1,
      activeKey4: 1,
      channelType: null,
      listProvince: [],
      listDistrict: [],
      listPhoenix: [],
      provinceCode: '',
      districtCode: '',
      globalList: []

    }
  },
  computed: {

    listPartnerStatus () {
      return this.globalList.filter(item => item.code === GLOBAL_PARTNER_STATUS_CODE)
    },

    listIdType () {
      return this.globalList.filter(item => item.code === GLOBAL_PARTNER_ID_TYPE)
    },

    isCreate () {
      return this.$route.params.partnerId === undefined
    }
  },
  created () {
    this.fetchGlobalList().then(res => {
      this.globalList = res
    })

    this.partnerData.representIdType = this.partnerData.representIdType ? this.partnerData.representIdType + '' : ''
  },
  methods: {
    ...commonMethods,

    gotoList () {
      return this.$router.push({ name: 'partner' })
    },
    gotoDetail (partnerId) {
      return this.$router.push({ name: 'partner_detail', params: { partnerId: partnerId } })
    },
    submitClicked () {
      this.$refs.btnSubmit.click()
    },

    handleSubmit (e) {
      e.preventDefault()
      const $this = this
      this.$confirm({
        title: 'Bạn chắc chắn muốn cập nhật?',
        onOk () {
          $this.doUpdate()
        },
        onCancel () {
        }
      })
    },
    doUpdate () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          let appendData = { user: 'system' }
          if (this.partnerData.partnerId) {
            appendData = _merge(appendData, {
              partnerId: this.partnerData.partnerId,
              partnerCode: this.partnerData.partnerCode
            })
          }
          const params = _merge(values, appendData)
          if (this.partnerData.partnerId) {
            updatePartner(params).then(res => {
              this.$success({ title: UPDATE_SUCCESS_MSG })
              this.gotoDetail(this.partnerData.partnerId)
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
            createPartner(params).then(res => {
              this.$success({ title: CREATE_SUCCESS_MSG })
              this.gotoDetail(res.partnerId)
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
<style lang="less">

</style>
