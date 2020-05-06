<template>
  <div>
    <h1>Sessions</h1>

    <h2>Saturday July 7, 2014</h2>

    <form @submit.prevent="getSessions(true)">
      <input type="text" placeholder="Search for a Session" v-model="sessionSearch"/>
      <button type="submit">Search</button>
    </form>

    <p>
      <label>Filter Sessions:</label>

      <select v-model="sessionFilter" @change="getSessions(true)">
        <option value="today">Today's Sessions</option>
        <option value="upcoming">All Upcoming Sessions</option>
        <option value="past">Past Sessions</option>
      </select>
    </p>

    <table v-if="sessions.length">
      <thead>
        <th></th>
        <th>Session</th>
        <th>Start</th>
      </thead>
      <tbody>
        <tr v-for="(session, i) in sessions" :key="i">
          <td>
            {{ ((parseInt(currentPage) - 1) * perPage) + (i + 1) }}
          </td>
          <td>
            <router-link :to="'/session/' + session.id">{{ session.name }}</router-link>
          </td>
          <td>
            {{ formatDate(session.time_start) }}
          </td>
          <td>
            {{ session.time_start }}
          </td>
        </tr>
      </tbody>
    </table>

    <p>{{ sessionCount }} Sessions Found</p>

    <p v-if="pageCount > 1">
      Jump to Page: <span v-for="i in pageCount" :key="i"><router-link :to="buildPaginationLink(i)">{{ i }}</router-link>&nbsp;&nbsp;</span>
    </p>
  </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp'
import keys from '@/config/keys'
import date from '@/mixins/date'

export default {
  data () {
    return {
      // Variables for getting sessions
      sessionCount: 0,
      sessionFilter: 'today',
      sessionSearch: '',
      sessions: [],

      // Pagination variables
      currentPage: 1,
      pageCount: 1,
      perPage: 50
    }
  },

  created () {
    this.getSessions()
  },

  methods: {
    getSessions (pushURL) {
      this.sessions = []

      if (pushURL) {
        let url = `/sessions/${this.sessionFilter}`

        if (this.sessionSearch.trim()) {
          url += `/search/${this.sessionSearch.trim()}`
        }

        url += '/page/1'

        this.$router.push(url)
      }

      // Get filter param from URL
      if (this.$route.params.filter) {
        this.sessionFilter = this.$route.params.filter
      }

      // Get search param from URL
      if (this.$route.params.search) {
        this.sessionSearch = this.$route.params.search
      }

      // Get page param from URL
      if (this.$route.params.page) {
        this.currentPage = this.$route.params.page
      } else {
        this.currentPage = 1
      }

      let apiUrl = `https://staging-webservice.eventbase.com/v4/admin/events/frontendwebtestproduct/sessions?api=${keys.api}&per_page=${this.perPage}&page=${this.currentPage}`

      let now = new Date('2014-07-07').toISOString()
      let eod = '2014-07-07T23:59:59Z'
      // Strip out seconds from ISO-8601
      let timeArr = now.split(':')
      let seconds = timeArr[2].split('.')[0]
      now = `${timeArr[0]}:${timeArr[1]}:${seconds}Z`

      // Filter
      if (this.sessionFilter === 'today') {
        apiUrl += `&from=${now}`
        apiUrl += `&until=${eod}`
      } else if (this.sessionFilter === 'upcoming') {
        apiUrl += `&from=${now}`
      } else if (this.sessionFilter === 'past') {
        apiUrl += `&until=${now}`
      }

      // Search
      if (this.sessionSearch.trim()) {
        apiUrl += `&search=${escape(this.sessionSearch.trim())}`
      }

      fetchJsonp(apiUrl)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.sessionCount = json.meta.total

          this.pageCount = Math.ceil(this.sessionCount / this.perPage)

          this.sessions = json.data

          console.log(apiUrl)
          console.log(json)
        })
        .catch(error => {
          console.log(error)
        })
    },

    buildPaginationLink (pageNum) {
      let link = `/sessions/${this.sessionFilter}`

      if (this.sessionSearch.trim()) {
        link += `/search/${escape(this.sessionSearch.trim())}`
      }

      link += `/page/${pageNum}`

      return link
    }
  },

  mixins: [date]
}
</script>
