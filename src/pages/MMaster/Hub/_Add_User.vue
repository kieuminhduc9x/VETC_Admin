<template>
  <div>

    <a-row :gutter="16" type="flex">
      <a-col :span="24">
        <div class="wrapper1">
          <div class="div1"></div>
        </div>
        <a-table
          :scroll="{ x: 'max-content' }"
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
                @click="addUser(record)"
                class="vna-link"
                style="cursor: pointer">
                <span>Thêm</span>
              </span>
            </div>
          </template>
        </a-table>
      </a-col>
    </a-row>

  </div>
</template>
<script>
import columns from './_user_add_columns'
import {
  GetUserAddToHub, AddUserToHub
} from '@/api/user'
import resizeableTitle from '@/utils/resizable-columns'
import moment from 'moment'
const ResizeableTitle = resizeableTitle(columns)

export default {
  name: 'HubListAddUser',
  props: {
    hubObject: {
      type: Object,
      required: true
    }
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
    addUser (record) {
      this.loading = true
      AddUserToHub({ hubId: this.hubObject.hubId, userId: record.userId }).then(res => {
        this.$notification.success({
          message: 'Thêm nhân viên',
          description:
            'Thêm nhân viên thành công',
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
      GetUserAddToHub({ hubId: this.hubObject.hubId }).then(res => {
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
