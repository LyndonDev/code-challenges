<template>
  <div class="modal">
    <div class="modal-background" @click="closeModal()"></div>

    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">Add Shipment</p>
        <button class="delete" aria-label="close" @click="closeModal()"></button>
      </header>

      <section class="modal-card-body">

        <FieldInputText label="Shipment ID" v-model="shipmentForm.id" :err="shipmentFormErrors.id"/>

        <FieldInputText label="Client Name" v-model="shipmentForm.clientName" :err="shipmentFormErrors.clientName"/>

        <div class="columns">
          <div class="column is-8">
            <FieldInputText label="Origin Address" v-model="shipmentForm.originAddress" :err="shipmentFormErrors.originAddress"/>
          </div>
          <div class="column is-4">
            <FieldDatePicker label="Estimated Departure" v-model="shipmentForm.estDeparture" :err="shipmentFormErrors.estDeparture"/>
          </div>
        </div><!-- /columns -->

        <div class="columns">
          <div class="column is-8">
            <FieldInputText label="Destination Address" v-model="shipmentForm.destinationAddress" :err="shipmentFormErrors.destinationAddress"/>
          </div>

          <div class="column is-4">
            <FieldDatePicker label="Estimated Arrival" v-model="shipmentForm.estArrival" :err="shipmentFormErrors.estArrival"/>
          </div>
        </div><!-- /columns -->

        <div class="columns">
          <div class="column is-3">
            <FieldSelect label="Mode" :list="modes" v-model="shipmentForm.mode" :err="shipmentFormErrors.mode"/>
          </div>
          <div class="column is-5">
            <FieldSelect label="Status" :list="statuses" v-model="shipmentForm.status" :err="shipmentFormErrors.status"/>
          </div>
        </div><!-- /columns -->

      </section>

      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveShipment()">Save</button>
        <button class="button" @click="closeModal()">Cancel</button>
      </footer>

    </div>
  </div>
</template>

<script>
import FieldInputText from '@/components/FieldInputText'
import FieldSelect from '@/components/FieldSelect'
import FieldDatePicker from '@/components/FieldDatePicker'

import _ from 'lodash'
import isOnline from 'is-online'
import { toast } from 'bulma-toast'

import { db } from '@/db'

require('animate.css')

export default {
  props: ['modes', 'statuses'],

  data () {
    return {
      shipmentForm: {
        id: '',
        clientName: '',
        originAddress: '',
        destinationAddress: '',
        estDeparture: '',
        estArrival: '',
        mode: '',
        status: ''
      },
      shipmentFormErrors: {
        id: false,
        clientName: false,
        originAddress: false,
        destinationAddress: false,
        estDeparture: false,
        estArrival: false,
        mode: false,
        status: false
      }
    }
  },

  computed: {
    shipmentEntry () {
      // Normalize the entry
      let shipment = this.shipmentForm

      const emptyTimeZone = {
        id: '',
        name: '',
        dstOffset: 0,
        rawOffset: 0
      }

      shipment.origin = {
        address: this.shipmentForm.originAddress,
        timeZone: emptyTimeZone
      }

      shipment.destination = {
        address: this.shipmentForm.destinationAddress,
        timeZone: emptyTimeZone
      }

      delete shipment.originAddress
      delete shipment.destinationAddress

      return shipment
    }
  },

  methods: {
    closeModal () {
      this.$parent.modalShipmentEntryOpen = false
    },

    saveShipment () {
      // Reset form validation highlights
      _.forEach(this.shipmentFormErrors, (value, key) => {
        this.shipmentFormErrors[key] = false
      })

      // Extremely basic form validation
      if (_.includes(this.shipmentForm, '')) {
        // Highlight empty fields
        _.forEach(this.shipmentForm, (value, key) => {
          if (!value) {
            this.shipmentFormErrors[key] = true
          }
        })
      } else {
        // Write to db
        db.collection('shipments').doc(this.shipmentForm.id).set(this.shipmentEntry)
          .then(() => {
            this.closeModal()
            this.resetForm()

            // Show a success toast
            // If user is offline it will show when back online and Firebase can sync
            const message = '<p class="is-size-5">' +
              '<span class="icon"><i class="fas fa-check"></i></span> ' +
              '<span>Your new shipment entry has been saved.</span>' +
              '<button class="delete"></button>' +
            '</p>'
            this.showToast(message, 'is-success')
          })
          .catch(() => {
            const message = '<p class="is-size-5">' +
              '<span class="icon"><i class="fas fa-times"></i></span> ' +
              '<span>Error: Your shipment could not be saved. Please try again.</span>' +
              '<button class="delete"></button>' +
            '</p>'
            this.showToast(message, 'is-danger')

            // console.log(err)
          })

        // If user is offline, close the modal and present a message
        isOnline()
          .then(online => {
            if (!online) {
              this.closeModal()
              this.resetForm()

              const message = '<p class="is-size-5">' +
                '<span class="icon"><i class="fas fa-info-circle"></i></span> ' +
                '<span>You are not connected to the Internet. Your new shipment entry is saved on this device and will sync when you are reconnected.</span>' +
                '<button class="delete"></button>' +
              '</p>'
              this.showToast(message, 'is-info')
            }
          })
      }
    },

    showToast (message, type) {
      toast({
        message,
        type,
        dismissable: true,
        duration: 7000,
        position: 'bottom-right',
        closeOnClick: true,
        animate: { in: 'fadeInUpBig', out: 'fadeOutUp' }
      })
    },

    resetForm () {
      _.forEach(this.shipmentForm, (value, key) => {
        this.shipmentForm[key] = ''
      })
    }
  },

  components: {
    FieldInputText,
    FieldSelect,
    FieldDatePicker
  }
}
</script>
