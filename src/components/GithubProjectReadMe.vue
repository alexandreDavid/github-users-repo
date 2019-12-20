<template>
  <div>
    <nav-bar :title="`${username} - ${repo}`"></nav-bar>
    <div v-if="isLoading">Please wait</div>
    <div v-else-if="error">{{ errorMessage }}</div>
    <div class="markdown-body" v-else>
      <div v-html="readMe"></div>
    </div>
  </div>
</template>

<script>
import GithubApi from '@/services/GithubApi'
import marked from 'marked'
import DOMPurify from 'dompurify'
import NavBar from '@/components/NavBar'
import ErrorMixin from '@/mixins/ErrorMixin'

export default {
  name: 'GithubProjectReadMe',
  components: {
    NavBar
  },
  mixins: [ ErrorMixin ],
  props: {
    username: String,
    repo: String
  },
  data () {
    return {
      readMe: false,
      isLoading: true
    }
  },
  async created() {
    GithubApi.getReadMe(this.username, this.repo).then((res) => {
      this.readMe = DOMPurify.sanitize(marked(atob(res.data.content)))
    }).catch(this.onError)
    .finally(() => {
      this.isLoading = false
    })
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~github-markdown-css/github-markdown.css';
</style>
