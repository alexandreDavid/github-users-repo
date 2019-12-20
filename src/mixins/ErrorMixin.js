export default {
  data () {
    return {
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    onError (err) {
      this.error = true
      this.errorMessage = err
    }
  }
}
