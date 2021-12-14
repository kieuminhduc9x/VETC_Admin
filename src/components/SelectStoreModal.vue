<template>
  <a-modal
    title="Chọn kho làm việc"
    :visible="select_store"
    :maskClosable="false"
    :closable="false"
    :footer="null"
    width="40%"
    :destroyOnClose="false"
    @cancel="handleCancel"
  >
    <a-spin :spinning="loading" class="app-spinning">
      <a-card :bordered="false">
        <a-form-model
          :model="storeForm"
          :rules="rules"
          @submit="handleSubmit"
          ref="ruleForm">

          <a-row :gutter="16" type="flex">
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item
                label=""
                prop="store">
                <a-select
                  :allowClear="true"
                  :filter-option="filterSelectOption"
                  show-search
                  v-model="storeForm.store"
                >
                  <a-select-option :key="'All'" :value="'All'">--Tất cả--</a-select-option>
                  <a-select-option
                    v-for="item in list_store"
                    :key="'p-g-' + item.hrvWarehouseId"
                    :value="item.hrvWarehouseId">
                    <a-tooltip placement="bottomLeft">
                      <template slot="title">
                        <span>{{ item.code + ' - ' + item.name + ' (' + item.address + ')' }}</span>
                      </template>
                      <span>{{ item.code + ' - ' + item.name + ' (' + item.address + ')' }}</span>
                    </a-tooltip>
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
              <!--              <a-button-->
              <!--                @click="handleCancel"-->
              <!--                style=" min-width:120px">Đóng</a-button>-->
              <a-button
                type="primary"
                style="margin-left: 1rem;"
                @click="handleSubmit"
                :loading="loading">Xác nhận</a-button>

            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script>
import { authComputed, commonMethods } from '@/store/helpers'
// import {
//   GetStoreForUser
// } from '@/api/user'
export default {
  name: 'Store',
  data () {
    return {
      storeForm: {
        store: null
      },
      list_store: [],
      rules: {
        store: [
          { required: true, message: 'Kho không được phép trống' }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...authComputed,
    isLoggedIn () {
      return this.$store.getters['auth/loggedIn']()
    },
    store () {
      if (window.localStorage.getItem('store')) {
        return JSON.parse(window.localStorage.getItem('store'))
      } else {
        return null
      }
    }
  },
  async created () {
    // this.fetchStore()
  },
  mounted () {
    // if (!this.store && this.isLoggedIn) {
    //   this.updateSelectStore(true)
    //   this.fetchStore()
    // } else {
    //   this.updateSelectStore(false)
    // }
    // this.fetchStore()
  },

  methods: {
    ...commonMethods,
    handleCancel () {
      this.updateSelectStore(false)
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const Arrstore = []
          let objectStore
          if (this.storeForm.store === 'All') {
            this.list_store.forEach(item => {
              Arrstore.push(item.hrvWarehouseId)
            })
          } else {
            Arrstore.push(this.storeForm.store)
          }
          if (this.storeForm.store !== 'All') {
            objectStore = this.list_store.find(item => item.hrvWarehouseId === this.storeForm.store)
          } else {
            objectStore = 'All'
          }

          this.updateStore(this.storeForm.store)
          this.updateSelectStore(false)
          window.localStorage.setItem('store_id', JSON.stringify(Arrstore))
          window.localStorage.setItem('store', JSON.stringify(objectStore))
          if (this.storeForm.store === 'All') {
            this.$notification.success({
              message: 'Bạn đã chọn tất cả kho làm việc ',
              duration: 5
            })
          } else {
            this.$notification.success({
              message: 'Bạn đã chọn kho làm việc ' + objectStore.code + ' - ' + objectStore.name + ' (' + objectStore.address + ')',
              duration: 5
            })
          }
        }
      })
    }
    // fetchStore () {
    //   this.loading = true
    //   GetStoreForUser({ userId: this.currentUser.userId }).then(res => {
    //     this.list_store = res
    //     if (res.length > 0) {
    //       const storeId = JSON.parse(window.localStorage.getItem('store_id'))
    //       if (!storeId) {
    //         this.storeForm.store = res[0].hrvWarehouseId
    //       } else if (storeId.length > 1) {
    //         this.storeForm.store = 'All'
    //       } else if (storeId.length === 1) {
    //         storeId.forEach(item => {
    //           this.storeForm.store = item
    //         })
    //       }
    //     } else {
    //       this.updateSelectStore(false)
    //     }
    //   }).catch(err => {
    //     const msg = this.handleApiError(err)
    //     this.$notification.error({
    //       message: '',
    //       description: msg,
    //       duration: 5
    //     })
    //   }).finally(res => {
    //     this.loading = false
    //   })
    // }

  },
  watch: {
    currentUser: function (newVal, oldVal) { // watch it
      if (this.currentUser.userId) {
        this.fetchStore()
      }
    }
  }
}
</script>

<style type="text/css">

</style>
