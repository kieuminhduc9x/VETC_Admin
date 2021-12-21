<template>
  <a-drawer
    :visible="visible"
    :title="isCreate === true ? 'Thêm mới' : isUpdate === true ? 'Cập nhật' : 'Chi tiết'"
    @close="closeForm"
    width="400"
    :destroy-on-close="false"
    :mask-closable="false"
  >
    <a-spin :spinning="loading">
      <a-form-model :model="form" ref="ruleForm">
        <a-row :gutter="16">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-model-item
              label="Danh sách user"
              prop="userId"
              :rules="[
                {
                  required: true,
                  message: 'User là bắt buộc',
                  trigger: 'change'
                }
              ]">
              <a-select
                show-search
                :allowClear="true"
                v-model="form.userId">
                <a-select-option v-for="item in listUser" :key="item.id" :value="item.id">
                  {{ item.fullName }}
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
import { checkCode } from '@/utils/helpers'
import { SearchUser } from '@/api/user'
import { addUser, createRoles, updateRoles } from '@/api/Config/roles'

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
    isView: {
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
      listUser: [],
      loading: false
    }
  },
  created () {
    this.getListUser()
  },
  methods: {
    checkCode,
    getListUser () {
      SearchUser({ pagination: false }).then(rs => {
        if (rs) {
          this.listUser = rs.data
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
          const params = {
            userId: this.form.userId,
            roleId: this.form.roleId
          }
          this.loading = true
          addUser(params).then(rs => {
            if (rs) {
              this.$success({ content: 'Thêm user thành công' })
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
      })
    }
  }
}
</script>
