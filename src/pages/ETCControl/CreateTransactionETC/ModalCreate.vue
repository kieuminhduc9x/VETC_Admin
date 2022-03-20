<template>
  <a-modal
    :visible="visible"
    :title="isCreate === true ? 'Tạo giao dịch ETC' : 'Cập nhật giao dịch ETC'"
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
                label="Mã thẻ etag"
                prop="matheetag"
                :rules="[]">
                <a-input
                  v-model="form.matheetag"
                  @blur="DeepTrimValue(form)"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-model-item
                label="Biển số xe"
                prop="biensoxe"
                :rules="[]">
                <a-input
                  v-model="form.biensoxe"
                  @blur="DeepTrimValue(form)"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-model-item
                label=""
                prop="loaibienso"
                :rules="[]">
                <a-select
                  v-model="form.loaibienso"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                  style="margin-top: 25px"
                >
                  <a-select-option v-for="item in lsLoaibiensoxe" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Thời gian giao dịch"
                prop="thoigiangiaodich"
                :rules="[]">
                <a-date-picker
                  v-model="form.thoigiangiaodich"
                >
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Trạng thái BE"
                prop="trangthaibe"
                :rules="[]">
                <a-select
                  v-model="form.trangthaibe"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsTrangthaibe" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-model-item
                label="Làn xe"
                prop="lanxe"
                :rules="[]">
                <a-select
                  v-model="form.lanxe"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsLanxe" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-model-item
                label="Ca"
                prop="ca"
                :rules="[]">
                <a-select
                  v-model="form.ca"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsCa" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Trạng thái HK"
                prop="trangthaikh"
                :rules="[]">
                <a-select
                  v-model="form.trangthaihk"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsTrangthaihk" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Thu phí viên"
                prop="thuphivien"
                :rules="[]">
                <a-select
                  v-model="form.thuphivien"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsThuphivien" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Ghi chú"
                prop="ghichu"
                :rules="[]">
                <a-input
                  v-model="form.ghichu"
                  @blur="DeepTrimValue(form)"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-model-item
                label="Giá vé"
                prop="giave"
                :rules="[]">
                <a-input
                  v-model="form.giave"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="6" :lg="6">
              <a-form-model-item
                label="Loại vé"
                prop="loaigia"
                :rules="[]">
                <a-select
                  v-model="form.loaigia"
                  :allowClear="true"
                  show-search
                  :filterOption="filterSelectOption"
                >
                  <a-select-option v-for="item in lsLoaigia" :key="item.value" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-model-item
                label="Mã giao dịch"
                prop="magiaodich"
                :rules="[]">
                <a-input
                  v-model="form.magiaodich"
                >
                </a-input>
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
        matheetag: '',
        biensoxe: '',
        loaibienso: '1',
        thoigiangiaodich: '',
        trangthaibe: '',
        lanxe: '',
        ca: '',
        trangthaihk: '',
        thuphivien: '',
        ghichu: '',
        giave: '',
        loaigia: '1',
        magiaodich: ''
      },
      loading: false,
      lsLoaibiensoxe: [
        {
          value: '1',
          name: 'Biển trắng'
        }
      ],
      lsTrangthaibe: [],
      lsCa: [],
      lsLanxe: [],
      lsTrangthaihk: [],
      lsThuphivien: [],
      lsLoaigia: [
        {
          value: '1',
          name: 'Giá thường'
        }
      ],
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
