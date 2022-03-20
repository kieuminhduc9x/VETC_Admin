<template>
  <a-modal
    :visible="visible"
    :title="'Điều chỉnh giao dịch sau đối soát'"
    :maskClosable="false"
    :destroyOnClose="false"
    width="1200px"
  >
    <a-spin :spinning="loading">
      <a-card style="border: none; padding: 0px 10px">
        <a-form-model
          :model="form"
          ref="ruleForm">
          <a-row :gutter="16">
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Mã giao dịch"
                prop="magiaodich"
                :rules="[]">
                <a-input
                  v-model="form.magiaodich"
                  @blur="DeepTrimValue(form)"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Trạng thái trước ĐC"
                prop="trangthaitruoc"
                :rules="[]">
                <a-select
                  v-model="form.trangthaitruoc"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsTrangthaitruoc" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Số GD nội bộ"
                prop="sogdnoibo"
                :rules="[]">
                <a-input
                  v-model="form.sogdnoibo"
                  @blur="DeepTrimValue(form)"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Trạng thái sau ĐC"
                prop="trangthaisau"
                :rules="[]">
                <a-select
                  v-model="form.trangthaisau"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsTrangthaisau" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Ngày đối soát"
                prop="ngaydoisoat"
                :rules="[]">
                <a-date-picker
                  v-model="form.ngaydoisoat"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Giá vé trước ĐC"
                prop="giavetruoc"
                :rules="[]">
                <a-select
                  v-model="form.giavetruoc"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsGiavetruoc" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Ghi chú"
                prop="ghichu"
                :rules="[]">
                <a-input
                  v-model="form.ghichu"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Giá vé sau ĐC"
                prop="giavesau"
                :rules="[]">
                <a-select
                  v-model="form.giavesau"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsGiavesau" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </a-spin>
    <template slot="footer">
      <div style="display: flex; justify-content: center">
        <a-button class="ant-btn-success">
          Lưu dữ liệu
        </a-button>
        <a-button type="default" :loading="loading" @click="closeModal">
          Đóng
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>

export default {
  props: {
    visibleModal: {
      type: Boolean,
      required: true
    },
    modelObject: {
      type: Object,
      required: true
    },
    isCreate: {
      type: Boolean,
      required: true
    },
    isUpdate: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      form: {
        magiaodich: '',
        trangthaitruoc: '',
        sogdnoibo: '',
        trangthaisau: '',
        ngaydoisoat: '',
        giavetruoc: '',
        ghichu: '',
        giavesau: ''
      },
      lsTrangthaitruoc: [],
      lsTrangthaisau: [],
      lsGiavetruoc: [],
      lsGiavesau: [],
      loading: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 12 }
    }
  },
  mounted () {
    if (this.visibleModal === true) {
      this.visible = true
    } else {
      this.visible = false
    }
  },
  created () {

  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
      this.visible = false
    }
  }
}
</script>
