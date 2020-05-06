<template>
  <div>
    <h1>{{ session.name }}</h1>

    <p>Location: {{ session.location.name }}</p>
    <p>From: {{ formatDate(session.time_start) }}</p>
    <p>Until: {{ formatDate(session.time_stop) }}</p>

    <a href="#" @click.prevent="$router.go(-1)">Back to Sessions</a>
  </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp'
import keys from '@/config/keys'
import date from '@/mixins/date'

export default {
  data () {
    return {
      session: {
        name: '',
        location: {
          name: ''
        },
        time_start: '',
        time_stop: ''
      }
    }
  },

  created () {
    this.getSession(this.$route.params.sessionId)
  },

  methods: {
    getSession (id) {
      const apiUrl = `https://staging-webservice.eventbase.com/v4/admin/events/frontendwebtestproduct/sessions/${id}?api=${keys.api}`

      fetchJsonp(apiUrl)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.session = json.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  mixins: [date]
}
</script>
