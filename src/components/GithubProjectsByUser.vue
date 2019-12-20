<template>
  <div>
    <nav-bar :title="username"></nav-bar>
    <div v-if="isLoading">Please wait</div>
    <div v-else-if="error">{{ errorMessage }}</div>
    <div v-else-if="!projects.length">No result</div>
    <div v-else>
      <div>
        <label for="filter-repos">Filter</label>
        <input id="filter-repos" v-model="filterProjectsValue">
      </div>
      <ul>
        <li v-for="project in filteredProjects" :key="project.id">
          <router-link :to="{ name: 'projectReadMe', params: { username, repo: project.name }}">{{project.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import GithubApi from '@/services/GithubApi'
import NavBar from '@/components/NavBar'
import ErrorMixin from '@/mixins/ErrorMixin'

export default {
  name: 'GithubProjectsByUser',
  components: {
    NavBar
  },
  mixins: [ ErrorMixin ],
  props: {
    username: String
  },
  data () {
    return {
      projects: [],
      isLoading: true,
      filterProjectsValue: ''
    }
  },
  async created() {
    GithubApi.getProjectsByUser(this.username).then((res) => {
      this.projects = res.data
    }).catch(this.onError)
    .finally(() => {
      this.isLoading = false
    })
  },
  computed: {
    filteredProjects () {
      return this.projects.filter(project => {
         return project.name.toLowerCase().indexOf(this.filterProjectsValue.toLowerCase()) > -1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
