<template>
  <a-modal
    v-model="visibleModal"
    :title="'Đổi mật khẩu'"
    :cancelText="'Bỏ qua'"
    :okText="'Cập nhật'"
    :loading="loading"
    @cancel="closeModal"
    @ok="submitUpdatePassword"
    :maskClosable="false"
    :destroyOnClose="false"
    width="450px">
    <a-form-model
      :model="form"
      ref="ruleForm"
    >
      <a-spin :spinning="loading">
        <a-card style="border: none">
          <a-row :gutter="16" >
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label="Mật khẩu hiện tại"
                prop="currentPassword"
                :rules="[
                  {
                    required: true,
                    message: 'Mật khẩu hiện tại là bắt buộc',
                    trigger: 'change'
                  }
                ]">
                <a-input type="password" v-model="form.currentPassword"></a-input>

              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label="Mật khẩu mới"
                prop="newPassword"
                :rules="[
                  {
                    required: true,
                    message: 'Mật khẩu mới là bắt buộc',
                    trigger: 'change'
                  },
                  {
                    validator:validatePassword,
                    trigger: 'change'
                  }
                ]">
                <a-input type="password" v-model="form.newPassword"></a-input>

              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label="Nhập lại mật khẩu mới"
                prop="confirmPassword"
                :rules="[
                  {
                    required: true,
                    message: 'Mật khẩu là bắt buộc',
                    trigger: 'change'
                  },
                  {
                    validator:checkConfirmPassword,
                    trigger: 'change'
                  }
                ]">
                <a-input type="password" v-model="form.confirmPassword"></a-input>

              </a-form-model-item>
            </a-col>
          </a-row>
        </a-card>
      </a-spin>

    </a-form-model>
  </a-modal>
</template>
<script>
import { validatePassword } from '@/utils/helpers'
import { changePassword } from '@/api/user'

export default {
  comments: {

  },
  props: {
    visibleModalPassword: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      visibleModal: false,
      form: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      loading: false
    }
  },
  created () {

  },
  mounted () {
    if (this.visibleModalPassword === true) {
      this.visibleModal = true
    }
  },
  methods: {
    validatePassword,
    closeModal () {
      this.visibleModal = false
      this.$emit('closeModal')
    },
    submitUpdatePassword () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            currentPassword: this.form.currentPassword,
            newPassword: this.form.newPassword,
            confirmPassword: this.form.confirmPassword,
            lang: 'VI'
          }
          this.loading = true
          changePassword(params).then(rs => {
            if (rs) {
              const $this = this
              $this.$success({ content: 'Thay đổi mật khẩu thành công',
                onOk () {
                  $this.closeModal()
                }
              })
              this.loading = false
            }
          }).catch(err => {
            const mes = this.handleApiError(err)
            this.$error({ content: mes })
          }).finally(rs => {
            this.loading = false
          })
        }
      })
    },
    checkConfirmPassword (rule, value, callback) {
      if (value) {
        if (value !== this.form.newPassword) {
          callback(new Error('Mật khẩu không khớp'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  }
}
</script>
