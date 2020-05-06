<template>
  <section class="section">
    <div class="container is-fluid">

      <h1 class="title">Shipments</h1>

      <button class="button is-primary" @click="openModalAddShipment()"><span class="icon"><i class="fas fa-plus"/></span> <span>Add Shipment</span></button>

      <table class="table is-fullwidth is-narrow is-striped is-hoverable">

        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" :class="{ 'has-text-right': column.alignRight }">
              <a @click="changeSort(column.key)">{{ column.label }}&nbsp;<TableSortArrow :column="column.key"/></a>
            </th>
          </tr>
          <tr>
            <td><FilterInputText v-model="filtersId"/></td>
            <td><FilterCheckboxDropdown label="Client Filter" :list="clients" column="clientName"/></td>
            <td><FilterInputText v-model="filtersOriginAddress"/></td>
            <td><FilterInputText v-model="filtersDestinationAddress"/></td>
            <td><FilterCheckboxDropdown label="Mode Filter" :list="modes" column="mode"/></td>
            <td><FilterDatePicker v-model="filtersEstDeparture"/></td>
            <td><FilterDatePicker v-model="filtersEstArrival"/></td>
            <td><FilterCheckboxDropdown label="Status Filter" :list="statuses" column="status"/></td>
          </tr>
        </thead>

        <tbody v-if="shipmentsFilteredAndSorted.length">
          <tr v-for="(shipment, i) in shipmentsFilteredAndSorted" :key="i">
            <td><small>{{ shipment.id }}</small></td>
            <td>{{ shipment.clientName }}</td>
            <td>{{ shipment.origin.address }}</td>
            <td>{{ shipment.destination.address }}</td>
            <td><ModeIcon :mode="shipment.mode"/></td>
            <td class="has-text-right">
              {{ formatDate(shipment.estDeparture, shipment.origin.timeZone) }}<br>
              <span class="has-text-grey is-size-7" v-if="shipment.origin.timeZone.id">{{ shipment.origin.timeZone.id }}</span>
            </td>
            <td class="has-text-right">
              {{ formatDate(shipment.estArrival, shipment.destination.timeZone) }}<br>
              <span class="has-text-grey is-size-7" v-if="shipment.destination.timeZone.id">{{ shipment.destination.timeZone.id }}</span>
            </td>
            <td><StatusBadge :status="shipment.status"/></td>
          </tr>
        </tbody>

        <tbody v-else-if="!shipmentsFilteredAndSorted.length && filtersInPlace">
          <tr>
            <td colspan="8">
              <div class="notification is-warning">No results found matching the filter criteria.</div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="8">
              <div class="fa-3x">
                <i class="fas fa-cog fa-spin"/>
              </div>
            </td>
          </tr>
        </tbody>

      </table>

    </div>

    <ModalShipmentEntry :class="{ 'is-active': modalShipmentEntryOpen }" :modes="modes" :statuses="statuses" />
  </section>
</template>

<script>
import { db } from '@/db'
import _ from 'lodash'
import moment from 'moment'

import TableSortArrow from '@/components/TableSortArrow'
import FilterInputText from '@/components/FilterInputText'
import FilterCheckboxDropdown from '@/components/FilterCheckboxDropdown'
import FilterDatePicker from '@/components/FilterDatePicker'
import ModeIcon from '@/components/ModeIcon'
import StatusBadge from '@/components/StatusBadge'
import ModalShipmentEntry from '@/components/ModalShipmentEntry'

export default {
  data () {
    return {
      columns: [
        {
          key: 'id',
          label: 'Shipment ID'
        },
        {
          key: 'clientName',
          label: 'Client Name'
        },
        {
          key: 'originAddress',
          label: 'Origin Address'
        },
        {
          key: 'destinationAddress',
          label: 'Destination Address'
        },
        {
          key: 'mode',
          label: 'Mode'
        },
        {
          key: 'estDeparture',
          label: 'Estimated Departure',
          alignRight: true
        },
        {
          key: 'estArrival',
          label: 'Estimated Arrival',
          alignRight: true
        },
        {
          key: 'status',
          label: 'Status'
        }
      ],
      shipments: [],
      modalShipmentEntryOpen: false
    }
  },

  firestore: {
    shipments: db.collection('shipments')
  },

  methods: {
    changeSort (column) {
      let asc = this.$store.state.sort.asc

      if (this.$store.state.sort.by === column) {
        asc = !asc
      }

      this.$store.commit('updateSort', {
        by: column,
        asc
      })
    },

    formatDate (dateString, timeZone) {
      let seconds = moment(dateString, 'M/D/YY').utc().unix()

      seconds += timeZone.rawOffset

      // If dateString is in DST, offset by the region's DST
      if (moment(dateString, 'M/D/YY').isDST()) {
        seconds += timeZone.dstOffset
      }

      return moment.unix(seconds).format('M/D/YY')
    },
    openModalAddShipment () {
      this.modalShipmentEntryOpen = true
    }
  },

  computed: {
    shipmentsFilteredAndSorted () {
      let results = this.shipments

      // Shipment ID filter
      if (this.$store.state.filters.id.trim().length) {
        results = _.filter(results, shipment => {
          return shipment.id.toLowerCase().includes(this.$store.state.filters.id.trim().toLowerCase())
        })
      }

      // Client Name filter
      if (this.$store.state.filters.clientName.length) {
        results = _.filter(results, shipment => {
          return this.$store.state.filters.clientName.includes(shipment.clientName)
        })
      }

      // Origin filter
      if (this.$store.state.filters.originAddress.trim().length) {
        results = _.filter(results, shipment => {
          return shipment.origin.address.toLowerCase().includes(this.$store.state.filters.originAddress.trim().toLowerCase())
        })
      }

      // Destination filter
      if (this.$store.state.filters.destinationAddress.trim().length) {
        results = _.filter(results, shipment => {
          return shipment.destination.address.toLowerCase().includes(this.$store.state.filters.destinationAddress.trim().toLowerCase())
        })
      }

      // Mode filter
      if (this.$store.state.filters.mode.length) {
        results = _.filter(results, shipment => {
          return this.$store.state.filters.mode.includes(shipment.mode)
        })
      }

      // Create first level nodes of estDeparture/estArrival dates in the origin/destination time offset, for filtering on
      results.forEach(shipment => {
        shipment.estDepartureLocal = this.formatDate(shipment.estDeparture, shipment.origin.timeZone)
        shipment.estArrivalLocal = this.formatDate(shipment.estArrival, shipment.destination.timeZone)
      })

      // Estimated Departure (local) filter
      if (this.$store.state.filters.estDeparture !== '') {
        results = _.filter(results, { estDepartureLocal: this.$store.state.filters.estDeparture })
      }

      // Estimated Arrival (local) filter
      if (this.$store.state.filters.estArrival !== '') {
        results = _.filter(results, { estArrivalLocal: this.$store.state.filters.estArrival })
      }

      // Status filter
      if (this.$store.state.filters.status.length) {
        results = _.filter(results, shipment => {
          return this.$store.state.filters.status.includes(shipment.status)
        })
      }

      // Sort
      // Copy addresses to the first level of the object so they can be sorted on
      results.forEach(shipment => {
        shipment.originAddress = shipment.origin.address
        shipment.destinationAddress = shipment.destination.address
      })

      results = _.orderBy(results, [this.$store.state.sort.by], [this.$store.state.sort.asc ? 'asc' : 'desc'])

      return results
    },

    filtersInPlace () {
      // Detect if any filters are in place
      // Used for displaying a message or a spinner if there are no filtered shipment results
      let filterInPlace = false

      _.forEach(this.$store.state.filters, (value, key) => {
        if (value.length) {
          filterInPlace = true
        }
      })

      return filterInPlace
    },

    clients () {
      return _.uniq(this.shipments.map(shipment => shipment.clientName)).sort()
    },

    modes () {
      return _.uniq(this.shipments.map(shipment => shipment.mode)).sort()
    },

    statuses () {
      return _.uniq(this.shipments.map(shipment => shipment.status)).sort()
    },

    filtersId: {
      get () {
        return this.$store.state.filters.id
      },
      set (value) {
        this.$store.commit('updateFilter', { key: 'id', value })
      }
    },
    filtersOriginAddress: {
      get () {
        return this.$store.state.filters.originAddress
      },
      set (value) {
        this.$store.commit('updateFilter', { key: 'originAddress', value })
      }
    },
    filtersDestinationAddress: {
      get () {
        return this.$store.state.filters.destinationAddress
      },
      set (value) {
        this.$store.commit('updateFilter', { key: 'destinationAddress', value })
      }
    },
    filtersEstDeparture: {
      get () {
        return this.$store.state.filters.estDeparture
      },
      set (value) {
        this.$store.commit('updateFilter', { key: 'estDeparture', value })
      }
    },
    filtersEstArrival: {
      get () {
        return this.$store.state.filters.estArrival
      },
      set (value) {
        this.$store.commit('updateFilter', { key: 'estArrival', value })
      }
    }
  },

  components: {
    TableSortArrow,
    FilterInputText,
    FilterCheckboxDropdown,
    FilterDatePicker,
    ModeIcon,
    StatusBadge,
    ModalShipmentEntry
  }
}
</script>
