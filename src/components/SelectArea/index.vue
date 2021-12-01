<template>
  <a-row :gutter="24" style="padding-top:11px">
    <a-col :span="8">
      <a-form-item label="Tỉnh/TP" >
        <a-input
          v-decorator="['province', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
    </a-col>
    <a-col :span="8">
      <a-form-item label="Quận/Huyện" >
        <a-input
          v-decorator="['district', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
    </a-col>
    <a-col :span="8">
      <a-form-item label="Xã/Phường" >
        <a-input
          v-decorator="['phoenix', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
    </a-col>
  </a-row>
</template>

<script>
import provinces from './json/tinh_tp.json'
import districts from './json/quan_huyen.json'
import phoenixes from './json/xa_phuong.json'

export default {
  name: 'SelectArea',
  data () {
    return {
      provinces: provinces,
      districts: districts,
      phoenixes: phoenixes,
      province_id: '',
      district_id: '',
      phoenix_id: ''
    }
  },
  computed: {
    districtComputed: function () {
      if (this.modelForm.province_id) {
        return this.districts.filter(item => item.province_id === this.modelForm.province_id)
      }
      return []
    },
    phoenixComputed: function () {
      if (this.modelForm.district_id) {
        return this.phoenixes.filter(item => item.district_id === this.modelForm.district_id)
      }
      return []
    }
  },
  methods: {
    handleProvinceChange (e) {
      // const val = e.target.value
    }
  }
}
</script>
