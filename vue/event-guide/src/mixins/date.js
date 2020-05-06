export default {
  methods: {
    formatDate (dateString) {
      const weekdays = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const date = new Date(dateString)
      const localTime = date.getTime()
      const localOffset = date.getTimezoneOffset() * 60000
      // Convert local time to UTC
      const utcTime = localTime + localOffset
      const utcDate = new Date(utcTime)
      const y = utcDate.getFullYear()
      const m = months[utcDate.getMonth()]
      const d = utcDate.getDate()
      const dw = weekdays[utcDate.getDay()]
      let hrs = utcDate.getHours()

      // Get hours first, then detect AM/PM; adjust to 12hr format after
      let ampm = 'AM'
      if (hrs >= 12) {
        ampm = 'PM'
      }
      if (hrs > 12) {
        hrs -= 12
      }
      // Format minutes
      let mins = date.getMinutes()
      if (mins < 10) {
        mins = '0' + mins
      }

      return `${dw}, ${m} ${d} ${y} at ${hrs}:${mins} ${ampm}`
    }
  }
}
