<template>
  <a-modal
    title="Danh sách Hub làm việc"
    :visible="select_hub"
    :maskClosable="false"
    :footer="null"
    width="40%"
    :destroyOnClose="false"
    @cancel="handleCancel"
  >
    <a-spin :spinning="loading" class="app-spinning">
      <a-card :bordered="false">
        <a-form-model
          :model="hubForm"
          :rules="rules"
          @submit="handleSubmit"
          ref="ruleForm">

          <a-row :gutter="16" type="flex">
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label=""
                prop="hub">
                <a-select
                  :allowClear="true"
                  :filter-option="filterSelectOption"
                  show-search
                  style="width: 100%"
                  v-model="hubForm.hub"
                >
                  <a-select-option

                    v-for="item in list_hub"
                    :key="'p-g-' + item.hubId"
                    :value="item.hubId">{{ item.hubName }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" type="flex" justify="space-around" align="middle">
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
                :loading="loading">OK</a-button>

            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script>
import { authComputed, commonMethods } from '@/store/helpers'
import {
  GetHubForUser
} from '@/api/user'
export default {
  name: 'ProvinceArea',
  data () {
    return {
      hubForm: {
        hub: null
      },
      list_hub: [],
      rules: {
        hub: [
          { required: true, message: 'Hub không được phép trống' }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...authComputed
  },
  async created () {

  },
  mounted () {
    this.hubForm.hub = this.hub_id
  },

  methods: {
    ...commonMethods,
    handleCancel () {
      this.updateSelectHub(false)
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.updateHub(this.hubForm.hub)
          this.updateSelectHub(false)
        }
      })
    },
    fetchHub () {
      this.loading = true
      GetHubForUser({ userId: this.currentUser.userId }).then(res => {
        this.list_hub = res
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

  },
  watch: {
    currentUser: function (newVal, oldVal) { // watch it
      if (this.currentUser.userId) {
        this.fetchHub()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
