<template>
  <a-drawer
    :visible="visible"
    :title="isCreate === true? 'Thêm mới' : 'Cập nhật'"
    @close="closeForm"
    width="600"
    :destroy-on-close="false"
    :mask-closable="false"
  >
    <a-spin :spinning="loading">
      <a-form-model :model="form" ref="ruleForm">
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Kho hàng"
              prop="warehouseCode"
              :rules="[
                {
                  required: true,
                  message: 'Kho hàng là bắt buộc',
                  trigger: 'change'
                }
              ]">
              <a-select
                v-model="form.warehouseCode"
                :allowClear="true"
                show-search
                :filter-select-option="filterSelectOption">
                <a-select-option v-for="item in listWarehouse" :key="item.code" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Số thuê bao"
              prop="phone"
              :rules="[
                {
                  required: true,
                  message: 'Số thuê bao là bắt buộc',
                  trigger: 'change'
                },
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
              label="IMEI"
              prop="imei"
              :rules="[
                {
                  required: true,
                  message: 'IMEI là bắt buộc',
                  trigger: 'change'
                }
              ]">
              <a-input v-model="form.imei"></a-input>
            </a-form-model-item>
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
      <a-button type="primary" style="marginRight: 8px" @click="submitData">
        {{ isCreate === true? 'Thêm mới' : 'Cập nhật' }}
      </a-button>
      <a-button @click="closeForm">
        Đóng
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import { phoneValidator } from '@/utils/helpers'
import { updateBarcodeReadersManagement, createBarcodeReadersManagement } from '@/api/barcode-readers-management'
import { searchWarehouseManagement } from '@/api/warehouse-management'
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
  mounted () {
    if (this.visibleForm === true) {
      this.visible = true
    } else {
      this.visible = false
    }
  },

  computed: {
    form () {
      return this.modelObject
    }
  },
  data () {
    return {
      visible: false,
      listWarehouse: [],
      loading: false
    }
  },
  created () {
    this.getListWarehouse()
  },
  methods: {
    phoneValidator,
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
            createBarcodeReadersManagement(params).then(rs => {
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
            updateBarcodeReadersManagement(params).then(rs => {
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
