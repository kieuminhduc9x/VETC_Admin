<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Danh mục Địa bàn</a-breadcrumb-item>
      </a-breadcrumb>

    </template>

    <a-row :gutter="16">

      <a-col :xs="24" :md="5" :lg="5">
        <a-card style="width: 100%;border: none" class="search-container">
          <a-input-search style="margin-bottom: 8px" placeholder="Tìm kiếm" v-model="searchValue" />
          <a-tree
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="listProvinceTree"
            @expand="onExpand"
            @select="onSelectNode"
            style="max-height: calc(100vh - 220px); overflow-y: scroll"
          >
            <template slot="title" slot-scope="{ title }">
              <span v-if="title.indexOf(searchValue) > -1">
                {{ title.substr(0, title.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
              </span>
              <span v-else>{{ title }}</span>
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="19">
        <province-info :area-selected="areaSelected" v-if="areaSelected && areaSelected.is_province" />
        <district-info :area-selected="areaSelected" v-if="areaSelected && areaSelected.is_district" />
        <precinct-info :area-selected="areaSelected" v-if="areaSelected && areaSelected.is_precinct" />
      </a-col>
    </a-row>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import { authComputed, commonMethods } from '@/store/helpers'
import _merge from 'lodash/merge'
import _findIndex from 'lodash/findIndex'
import { removeUtf8 } from '@/utils/common'
import { GetDistrictByProvince, GetPrecinctByDistrict } from '@/api/common'

import ProvinceInfo from './province/index'
import DistrictInfo from './district/index'
import PrecinctInfo from './ward/index'

export default {
  components: {
    MainLayout,
    ProvinceInfo,
    DistrictInfo,
    PrecinctInfo
  },
  name: 'Area',
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      listProvince: [],
      areaSelected: {}
    }
  },
  created () {
    this.getProvinces()
  },
  computed: {
    ...authComputed,
    listProvinceTree () {
      const value = this.searchValue
      const txt = removeUtf8(value)
      return this.listProvince.filter(item => removeUtf8(item.provinceName).toLowerCase().indexOf(txt) >= 0).map(item => {
        if (item.children && item.children.length > 1) {
          return _merge(item, { key: item.provinceCode, title: item.provinceName, is_province: true })
        } else {
          return _merge(item, { key: item.provinceCode, title: item.provinceName, children: [{ key: 1, title: '' }], is_province: true })
        }
      })
    }
  },
  methods: {
    ...commonMethods,
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvince = res.map(item => {
          return _merge(item, { is_province: true })
        })
      })
    },
    onExpand (expandedKeys, event) {
      console.log(event)
      if (event.expanded) {
        if (event.node.dataRef.is_province && !event.node.dataRef.loaded) {
          const provinceCode = expandedKeys[expandedKeys.length - 1]

          const idx = _findIndex(this.listProvince, { provinceCode: provinceCode })
          if (idx >= 0 && !this.listProvince[idx].loaded) {
            this.getDistrictByProvince(provinceCode)
          }
        } else if (event.node.dataRef.is_district && !event.node.dataRef.loaded) {
          const provinceCode = event.node.dataRef.provinceCode
          const areaCode = event.node.dataRef.areaCode
          this.GetPrecinctByDistrict(areaCode, provinceCode)
        }
      }
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange (e) {

    },
    onSelectNode (key, event) {
      const areaSelected = event.selectedNodes[0].data.props.dataRef
      if (areaSelected.is_province) {
        if (!areaSelected.loaded) {
          const provinceCode = areaSelected.provinceCode
          this.getDistrictByProvince(provinceCode, true)
        } else {
          this.areaSelected = areaSelected
        }
      } else if (areaSelected.is_district) {
        if (!areaSelected.loaded) {
          const areaCode = areaSelected.areaCode
          const provinceCode = areaSelected.provinceCode
          this.GetPrecinctByDistrict(areaCode, provinceCode, true)
        } else {
          this.areaSelected = areaSelected
        }
      } else {
        this.areaSelected = areaSelected
      }
    },
    getDistrictByProvince (provinceCode, assignSelected = false) {
      const params = {
        provinceCode: provinceCode
      }
      this.loading = true
      GetDistrictByProvince(params).then(res => {
        const districtSearchSdoList = this.convertPropToDisplayDate(res.districtSearchSdoList)
        const idx = _findIndex(this.listProvince, { provinceCode: provinceCode })
        if (idx >= 0) {
          const listDistrict = districtSearchSdoList.map(item => {
            return _merge(item, {
              key: item.areaCode,
              title: item.districtName,
              provinceCode: provinceCode,
              is_district: true,
              children: [{ key: 1, title: '' }]
            })
          })

          this.listProvince[idx].children = listDistrict
          this.listProvince[idx].loaded = true
          this.listProvince[idx].hubId = res.hubId
          this.listProvince[idx].hubName = res.hubName
          this.listProvince[idx].hubAddress = res.hubAddress
          this.listProvince = [...this.listProvince]
          if (assignSelected) {
            this.areaSelected = this.listProvince[idx]
          }
        }
        this.loading = false
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
    GetPrecinctByDistrict (areaCode, provinceCode, assignSelected) {
      const params = {
        districtCode: areaCode
      }
      this.loading = true
      GetPrecinctByDistrict(params).then(res => {
        const precinctSearchSdoList = this.convertPropToDisplayDate(res.precinctSearchSdoList)
        const idx = _findIndex(this.listProvince, { provinceCode: provinceCode })
        if (idx >= 0) {
          const provinceSelected = this.listProvince[idx]
          const districtIdx = _findIndex(provinceSelected.children, { areaCode: areaCode })
          if (districtIdx >= 0) {
            const districtSelected = provinceSelected.children[districtIdx]
            const listWard = precinctSearchSdoList.map(item => {
              return _merge(item, { key: item.areaCode, title: item.precinctName, is_precinct: true, provinceName: provinceSelected.provinceName })
            })
            districtSelected.children = listWard
            districtSelected.loaded = true
            districtSelected.hubId = res.hubId
            districtSelected.hubName = res.hubName
            districtSelected.hubAddress = res.hubAddress
            this.listProvince[idx].children[districtIdx] = districtSelected
            this.listProvince = [...this.listProvince]
            if (assignSelected) {
              this.areaSelected = districtSelected
            }
          }
        }

        this.loading = false
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
