<template>
  <div>

    <a-row :gutter="16" type="flex">
      <a-col :span="24">
        <a-button class="btn-reset uppercase" @click="addNew"> <a-icon type="plus-circle"/></a-button>

      </a-col>
      <a-col :span="24">
        <div class="wrapper1">
          <div class="div1"></div>
        </div>
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="false"
          :rowKey=" (rowKey, index ) => index"
          class="ant-table-bordered"
        >
          <template slot="rowIndex" slot-scope="text, record, index"> {{ index + 1 }}</template>
          <template slot="operation" slot-scope="text, record">
            <div>

              <span
                @click="removeUser(record)"
                class="vna-link"
                style="cursor: pointer">
                <span>Xóa</span>
              </span>
            </div>
          </template>
        </a-table>
      </a-col>
    </a-row>

    <a-modal
      :destroyOnClose="true"
      :maskClosable="false"
      v-model="modalAddUser"
      title="Thêm nhân viên"
      @cancel="handleClosePopup"
      width="80%"
      centered
      :footer="null"
    >
      <ListAddUser :hub-object="hubObject" v-if="hubObject"></ListAddUser>
    </a-modal>

  </div>
</template>
<script>
import columns from './_user_columns'
import {
  GetUserWorkingInHub, RemoveUserInHub
} from '@/api/user'
import resizeableTitle from '@/utils/resizable-columns'
import moment from 'moment'
import ListAddUser from './_Add_User'
const ResizeableTitle = resizeableTitle(columns)

export default {
  name: 'HubListUser',
  props: {
    hubObject: {
      type: Object,
      required: true
    }
  },
  components: {
    ListAddUser
  },
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      moment,
      data: [],
      loading: false,
      fetching: false,
      modalAddUser: false,
      activeHub: null,
      columns
    }
  },
  computed: {

  },
  watch: {

  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleClosePopup () {
      this.modalAddUser = false
      this.fetchData()
    },
    addNew () {
      this.modalAddUser = true
    },
    removeUser (record) {
      this.loading = true
      RemoveUserInHub({ hubId: this.hubObject.hubId, userId: record.userId }).then(res => {
        this.$notification.success({
          message: 'Xóa nhân viên',
          description:
            'Xóa nhân viên thành công',
          duration: 5
        })
        this.fetchData()
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
    fetchData () {
      this.loading = true
      GetUserWorkingInHub({ hubId: this.hubObject.hubId }).then(res => {
        this.data = res
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
    onTrim (string) {
      return string.trim()
    }
  }
}
</script>
