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
      type: Array,
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
  },
  methods: {
    closeForm () {
      this.visibleForm = false
      this.form = {}
      this.$emit('closeDrawerListFile')
    },
    detailFile (record) {
      const fileType = record.fileName.substr(record.fileName.lastIndexOf('.'))
      console.log(fileType)
      if (fileType === '.pdf') {
        // bật tab review pdf
        getDetailFile({ documentId: record.id }).then(rs => {
          if (rs) {
            var file = new Blob([rs], { type: 'application/pdf' })
            var fileURL = URL.createObjectURL(file)
            window.open(fileURL)
          }
        }).catch(err => {
          const msg = this.handleApiError(err)
          this.$error({ content: msg })
        }).finally(res => {
          this.loadingPdf = false
        })
      } else {
        // Tải xuống
        getDetailFile({ documentId: record.id }).then(rs => {
          if (rs) {
            const fileName = record.fileName
            const data = this.base64toBlob(rs, fileName)
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveBlob(rs, fileName)
            } else {
              const downloadLink = window.document.createElement('a')
              downloadLink.href = window.URL.createObjectURL(data)
              downloadLink.download = fileName
              document.body.appendChild(downloadLink)
              downloadLink.click()
              document.body.removeChild(downloadLink)
            }
          }
        })
      }
    },
    base64toBlob (base64Data, contentType) {
      contentType = contentType || ''
      var sliceSize = 1024
      var byteCharacters = atob(base64Data)
      var bytesLength = byteCharacters.length
      var slicesCount = Math.ceil(bytesLength / sliceSize)
      var byteArrays = new Array(slicesCount)

      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize
        var end = Math.min(begin + sliceSize, bytesLength)

        var bytes = new Array(end - begin)
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0)
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes)
      }
      return new Blob(byteArrays, { type: contentType })
    }
  }
}
</script>
