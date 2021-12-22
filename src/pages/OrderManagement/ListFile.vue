<template>
  <a-drawer
    :visible="visible"
    :title="'Danh sách file'"
    @close="closeForm"
    width="500"
    :destroy-on-close="false"
    :mask-closable="false"
    style="overflow: auto"
  >
    <a-spin :spinning="loading">
      <a-form-model :model="form" ref="ruleForm">
        <a-row :gutter="16">
          <a-col :xs="24" :md="24" :lg="24">
            <a-table
              :columns="columnsListFile"
              :data-source="data"
              :rowKey=" (rowKey, index ) => index"
              :pagination="false"
              :loading="loading"
              :scroll="{ x: '100%' }"
              :locale="{ emptyText: 'Chưa có dữ liệu' }"
              class="ant-table-bordered">
              <template slot="rowIndex" slot-scope="text, record, index">
                <span>{{ index + 1 }} </span>
              </template>
              <template slot="fileName" slot-scope="text, record">
                <a @click="detailFile(record)" >{{ record.fileName }} </a>
              </template>
            </a-table></a-col>
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
      <a-button @click="closeForm">
        Đóng
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import columnsListFile from './columnsListFile'
import { getDetailFile } from '@/api/pre-order'
export default {
  components: {

  },
  props: {
    visibleDrawerListFile: {
      type: Boolean,
      required: true,
      default: false
    },
    listFile: {
      type: Object,
      required: true
    }
  },
  mounted () {
    if (this.visibleDrawerListFile === true) {
      this.visible = true
    } else {
      this.visible = false
    }
  },

  computed: {
    data () {
      return this.listFile
    }
  },
  data () {
    return {
      columnsListFile,
      visible: false,
      loading: false
    }
  },
  created () {
    this.getListWarehouse()
  },
  methods: {
    closeForm () {
      this.visibleForm = false
      this.form = {}
      this.$emit('closeDrawerListFile')
    },
    detailFile (record) {
      getDetailFile(record.id).then(rs => {
        console.log(rs)
      })
    }
  }
}
</script>
