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
              label="Mã vai trò"
              prop="code"
              :rules="[
                {
                  required: true,
                  message: 'Mã vai trò là bắt buộc',
                  trigger: 'change'
                },
                {
                  validator: checkCode,
                  trigger: 'change'
                },
                {
                  max: 200,
                  message: 'Nhập tối đa 200 ký tự',
                  trigger: 'change'
                }
              ]">
              <a-input v-model="form.code" @blur="DeepTrimValue(form)"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Tên vai trò"
              prop="name"
              :rules="[
                {
                  required: true,
                  message: 'Tên vai trò là bắt buộc',
                  trigger: 'change'
                },
                {
                  max: 250,
                  message: 'Nhập tối đa 250 ký tự',
                  trigger: 'change'
                }
              ]">
              <a-input v-model="form.name" @blur="DeepTrimValue(form)"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="12">
            <a-form-model-item
              label="Privilege"
              prop="listPrivilege"
              :rules="
                [
                  {
                    required: true,
                    message: 'Privilege là bắt buộc',
                    trigger:'change'
                  },
                ]">
              <a-select
                mode="multiple"
                show-search
                :allowClear="true"
                v-model="form.listPrivilege">
                <a-select-option v-for="item in listPrivilege" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
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
      <a-button type="primary" style="marginRight: 8px" @click="submitData" >
        {{ isCreate === true? 'Thêm mới' : 'Cập nhật' }}
      </a-button>
      <a-button @click="closeForm">
        Đóng
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import { checkEmail, checkCode } from '@/utils/helpers'
import { SearchUser } from '@/api/user'
import { createRoles, updateRoles } from '@/api/Config/roles'

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
  computed: {
    form () {
      return this.modelObject
    }
  },
  mounted () {
    if (this.visibleForm === true) {
      this.visible = true
    } else {
      this.visible = false
    }
  },
  data () {
    return {
      visible: false,
      listPrivilege: [],
      loading: false
    }
  },
  created () {
    this.getListPrivilege()
  },
  methods: {
    checkEmail,
    checkCode,
    getListPrivilege () {
      SearchUser({ pagination: false }).then(rs => {
        if (rs) {
          this.listPrivilege = rs.data
        }
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
            createRoles(params).then(rs => {
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
            updateRoles(params).then(rs => {
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
