<template>
  <div style="padding: 2rem 6rem">
    <a-row :gutter="16">
      <a-col :xs="24" :md="16" :lg="16" offset="3">
        <h3 style="font-weight: bold; color: #076885">Thông tin tài khoản</h3>
        <a-card title="Hồ sơ nhân viên" style="margin-bottom: 20px">
          <a-form-model
            :model="form"
            ref="ruleForm"
            layout="horizontal"
            style="border: none; padding: 20px">
            <a-row :gutter="16">
              <a-col :xs="24" :md="12" :lg="12">
                <a-form-model-item
                  prop="fullName"
                  label="Tên"
                  :rules="[
                    {
                      required: true,
                      message: 'Tên là bắt buộc',
                      trigger:'change'
                    }
                  ]">
                  <a-input
                    style="height: 30px"
                    v-model="form.fullName"
                    @blur="DeepTrimValue(form)"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="12" :lg="12">
                <a-form-model-item
                  prop="email"
                  label="Địa chỉ email"
                  :rules="[
                    {
                      required: true,
                      message: 'Địa chỉ email là bắt buộc',
                      trigger:'change'
                    },
                    {
                      validator: checkEmail,
                      trigger: 'change'
                    }
                  ]">
                  <a-input
                    style="height: 30px"
                    v-model="form.email"
                    @blur="DeepTrimValue(form)"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="12" :lg="12">
                <a-form-model-item
                  prop="phone"
                  label="Số điện thoại"
                  :rules="[
                    {
                      required: true,
                      message: 'Số điện thoại là bắt buộc',
                      trigger: 'change'
                    },
                    {
                      validator: phoneValidator,
                      trigger: 'change'
                    }
                  ]">
                  <a-input
                    style="height: 30px"
                    v-model="form.phone"
                    @blur="DeepTrimValue(form)"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <hr>
            <a-row :gutter="16">
              <a-col :xs="24" :md="24" :lg="24">
                <h4 style="font-weight: bold; color:#076885;">
                  Khôi Phục Mật Khẩu
                </h4>
                <p>Bạn có thể khôi phục mật khẩu cho tài khoản <b>Nam Cường</b> bằng cách gửi email thay đổi mật khẩu tới địa chỉ <b>namcuong@khonc.com.</b>
                </p>
                <a-button type="primary">Gửi email khôi phục mật khẩu cho tài khoản</a-button>
              </a-col>
            </a-row>
          </a-form-model>
        </a-card>
        <!--        <a-card title="Đã phân công tại địa chỉ" style="margin-bottom: 20px">-->
        <!--          <div>-->

        <!--          </div>-->
        <!--        </a-card>-->
        <div style="display: flex; justify-content: space-between">
          <a-button type="default" @click="goToBack">Quay lại</a-button>
          <a-button type="primary" @click="save" :loading="loading">Lưu lại</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { createAccount, updateAccount } from '@/api/Config/accounts'
import { checkEmail, phoneValidator } from '@/utils/helpers'

export default {
  components: {

  },
  props: {
    isCreate: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    isEdit: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      form: {
        id: '',
        fullName: '',
        email: '',
        phone: '',
        province: ''
      },
      loading: false
    }
  },
  methods: {
    phoneValidator,
    checkEmail,
    save () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            id: this.$route.params.id || '',
            fullName: this.form.fullName,
            email: this.form.email,
            phone: this.form.phone
          }
          this.loading = true
          if (this.$route.params.id) {
            updateAccount(params).then(rs => {
              if (rs) {
                this.$success({ content: 'Cập nhật thông tin thành công' })
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
            createAccount(params).then(rs => {
              if (rs) {
                this.$success({ content: 'Thêm mới thông tin thành công' })
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
    goToBack () {
      this.$router.push({ name: 'config.account' })
    }
  }
}
</script>
<style lang="less">
.ant-card-head-title{
  font-weight: bold;
}
</style>
