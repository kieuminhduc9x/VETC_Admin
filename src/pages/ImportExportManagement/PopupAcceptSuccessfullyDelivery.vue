<template>
  <a-modal
    :visible="visible"
    :title="'Xác nhận giao hàng thành công '"
    @cancel="closeModal"
    @ok="submitConfirm"
    :cancelText="'Đóng'"
    :okText="'Xác nhận'"
    :maskClosable="false"
    :destroyOnClose="false"
  >
    <a-spin :spinning="loading">
      <a-card style="border: none; padding: 0px 10px">
        <a-form-model :model="form" ref="ruleForm">
          <a-row :gutter="16">
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-model-item label="File ký">
                <a-upload
                  name="file"
                  :multiple="true"
                  :accept="'.doc, docx,.pdf,.xlsx'"
                  :show-upload-list="true"
                  :before-upload="beforeUpload"
                  :remove="removeFile"
                >
                  <a-button> <a-icon type="upload" /> Upload File</a-button>
                </a-upload>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </a-spin>
  </a-modal>
</template>
<script>

import {
  acceptSuccessfulDeliveryImportExportManagement
} from '@/api/import-export-management'

export default {
  props: {
    visibleAcceptDelivery: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      form: {

      },
      fileList: [],
      loading: false
    }
  },
  mounted () {
    if (this.visibleAcceptDelivery === true) {
      this.visible = true
    } else {
      this.visible = false
    }
  },
  methods: {
    closeModal () {
      this.visible = false
      this.$emit('closePopup')
    },
    beforeUpload (data) {
      data.status = 'done'
      const object = {
        fileName: data.name,
        fileType: data.name.substr(data.name.lastIndexOf('.')),
        dataBase64: '',
        uid: data.uid
      }
      const file64 = this.getBase64(data)
      file64.then(data => {
        object.dataBase64 = data.slice(data.indexOf('base64,') + 7)
      })
      this.fileList.push(object)
      return false
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    removeFile (file) {
      if (file) {
        this.fileList.forEach((item, index) => {
          if (item.uid === file.uid) {
            this.fileList.splice(index, 1)
          }
        })
      }
    },
    submitConfirm () {
      const params = {
        voucherId: this.$route.params.id,
        listDocument: this.fileList
      }
      this.loading = true
      acceptSuccessfulDeliveryImportExportManagement(params).then(rs => {
        if (rs) {
          this.$success({ content: 'Xác nhận xuất kho thành công' })
          this.closeModal()
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
}
</script>
