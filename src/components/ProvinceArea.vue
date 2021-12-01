<template>
  <a-row :gutter="24">

    <a-col :xs="xs" :md="md" :lg="lg">
      <a-form-model-item label="Tỉnh/TP" prop="provinceCode">
        <a-select
          show-search
          :filter-option="filterSelectOption"
          @change="onChangeProvince"
          :disabled="!isEditable"
          v-model="modelObject.provinceCode"
          style="width: 100%"
          :allowClear="true"
        >
          <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
          <a-select-option v-for="item in listProvince" :key="'province1-' + item.provinceCode" :value="item.provinceCode">{{
            item.provinceName }}
          </a-select-option>

        </a-select>
      </a-form-model-item>
    </a-col>
    <a-col :xs="xs" :md="md" :lg="lg">
      <a-form-model-item label="Quận/Huyện" prop="districtCode">
        <a-select
          show-search
          v-model="modelObject.districtCode"
          :filter-option="filterSelectOption"
          @change="onChangeDistrict"
          :disabled="!isEditable"
          style="width: 100%"
          :allowClear="true"
        >
          <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
          <a-select-option
            v-for="item in listDistrict"
            :key="'district-' + item.areaCode"
            :value="item.areaCode">{{
              item.districtName }}
          </a-select-option>

        </a-select>
      </a-form-model-item>
    </a-col>
    <a-col :xs="xs" :md="md" :lg="lg">
      <a-form-model-item label="Xã/Phường" prop="precinctCode">
        <a-select
          show-search
          :filter-option="filterSelectOption"
          v-model="modelObject.precinctCode"
          :disabled="!isEditable"
          style="width: 100%"
          :allowClear="true"
        >
          <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
          <a-select-option
            v-for="item in listPhoenix"
            :key="'phoenix-' + item.areaCode"
            :value="item.areaCode">{{
              item.precinctName }}
          </a-select-option>

        </a-select>
      </a-form-model-item>
    </a-col>

  </a-row>
</template>

<script>
import _find from 'lodash/find'
import { GetDistrictByProvince, GetPrecinctByDistrict, listProvince } from '@/api/common'

export default {
  name: 'ProvinceArea',
  props: {
    isEditable: {
      type: Boolean,
      default: true
    },
    modelObject: {
      type: Object,
      required: true
    },
    isCancle: {
      type: Boolean,
      default: false
    },
    xs: {
      type: Number,
      default: 24
    },
    md: {
      type: Number,
      default: 24
    },
    lg: {
      type: Number,
      default: 24
    }

  },
  data () {
    return {
      listProvince: [],
      listDistrict: [],
      listPhoenix: []
    }
  },
  async created () {
    this.getProvince()
    if (this.modelObject && this.modelObject.provinceCode) {
      await this.getDistrict(this.modelObject.provinceCode)
      await this.getPhoenix(this.modelObject.districtCode)
    }
  },
  watch: {
    'modelObject.provinceCode' (newVal) {
      this.getProvince()
      setTimeout(() => {
        this.onChangeProvince(this.modelObject.provinceCode)
      }, 300)
      setTimeout(() => {
        this.onChangeDistrict(this.modelObject.districtCode)
      }, 900)
    }
  },
  methods: {
    async onChangeProvince (provinceCode) {
      if (!provinceCode) {
        this.clearDistrictField()
        this.clearPhoenixField()
      } else {
        const province = _find(this.listProvince, { provinceCode: provinceCode })
        if (province) {
          await this.getDistrict(province.provinceCode)
        }
      }
    },

    async onChangeDistrict (districtCode) {
      console.log(districtCode)
      if (!districtCode) {
        this.clearPhoenixField()
      } else {
        const district = _find(this.listDistrict, { areaCode: districtCode })
        if (district) {
          await this.getPhoenix(districtCode)
        }
      }
    },
    clearDistrictField () {
      this.modelObject.districtCode = ''
      this.listDistrict = []
    },

    clearPhoenixField () {
      this.modelObject.precinctCode = ''
      this.listPhoenix = []
    },

    async getProvince () {
      await listProvince({ size: 1000 }).then(res => {
        if (res) {
          this.listProvince = res.data
          return null
        }
      })
    },
    async getDistrict (provinceCode) {
      await GetDistrictByProvince({ provinceCode: provinceCode }).then(res => {
        if (res) {
          this.listDistrict = res.districtSearchSdoList
          return null
        }
      })
    },
    async getPhoenix (districtCode) {
      await GetPrecinctByDistrict({ districtCode }).then(res => {
        if (res) {
          this.listPhoenix = res.precinctSearchSdoList
          return null
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
