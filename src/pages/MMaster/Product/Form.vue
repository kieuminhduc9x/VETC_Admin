<template>
  <a-spin :spinning="loading" class="app-spinning">
    <a-card :bordered="false">
      <a-form-model
        :model="modelForm"
        :rules="rules"
        @submit="handleSubmit"
        ref="ruleForm">
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24">
            <a-form-model-item
              label="Loại hàng hóa"
              prop="productName">
              <a-input v-model="modelForm.productName"/>
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
import { commonMethods, authComputed } from '@/store/helpers'
import { ProductCreate, ProductUpdate } from '@/api/product'
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
    return {
      activeKey: [1, 2, 3],
      loading: false,

      modelForm: {
        productName: ''
      },
      listProvinces: [],
      rules: {
        productName: [
          { required: true, message: 'Loại hàng hóa không được phép trống' }
        ]
      }
    }
  },
  computed: {
    ...authComputed
  },
  created () {
    if (this.isEditable && this.objectEdit && this.objectEdit.productId) {
      this.modelForm = {
        productId: this.objectEdit.productId,
        productName: this.objectEdit.productName,
        status: this.objectEdit.status

      }
    }
  },
  methods: {
    ...commonMethods,
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
            title: 'Bạn chắc chắn muốn ' + (this.modelForm.productId ? 'cập nhật' : 'thêm mới') + ' hàng hóa?',
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
      if (this.modelForm.productId) {
        ProductUpdate(this.modelForm).then(res => {
          this.$notification.success({
            message: 'Cập nhật hàng hóa',
            description:
            'Cập nhật hàng hóa thành công',
            duration: 5
          })
          this.gotoList(true)
        }).catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: 'Cập nhật không thành công',
            description: msg,
            duration: 5
          })
        }).finally(res => {
          this.loading = false
        })
      } else {
        ProductCreate(this.modelForm).then(res => {
          this.$notification.success({
            message: 'Thêm mới hàng hóa',
            description:
            'Thêm mới hàng hóa thành công',
            duration: 5
          })
          this.gotoList(true)
        }).catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: 'Thêm mới không thành công',
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
