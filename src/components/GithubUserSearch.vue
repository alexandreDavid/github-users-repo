<template>
  <div id="github-search">
    <div>
      <label for="search-user">Find a Github user</label>
      <input id="search-user" v-model="searchedUser">
    </div>
    <div v-if="searchedUser">
      <div v-if="isLoading">Please wait</div>
      <ul v-else-if="users.length">
        <li v-for="user in users" :key="user.login">
          <router-link v-if="user.login" :to="{ name: 'projectsByUser', params: { username: user.login }}">{{user.login}}</router-link>
        </li>
      </ul>
      <div v-else>No result</div>
    </div>
  </div>
</template>

<script>
import GithubApi from '@/services/GithubApi'
import debounce from 'debounce'
import ErrorMixin from '@/mixins/ErrorMixin'

export default {
  name: 'GithubUserSearch',
  props: {
    msg: String
  },
  mixins: [ ErrorMixin ],
  data () {
    return {
      searchedUser: '',
      users: [],
      isLoading: false
    }
  },
  async created() {
    // Useful for implementing behavior that should only happen
    // after a repeated action has completed.
    // visit: https://github.com/component/debounce
    this.debouncedChangeUser = debounce(this.getUserList, 500)
  },
  methods: {
    getUserList (username) {
      this.isLoading = true
      GithubApi.searchUser(username).then((res) => {
        this.users = res.data && res.data.items
      }).catch(this.onError)
      .finally(() => {
        this.isLoading = false
      })
    }
  },
  watch: {
    // whenever question changes, this function will run
    searchedUser: function (username) {
      this.users = 'Waiting for you to stop typing...'
      this.debouncedChangeUser(username)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#github-search {
  margin-top: 60px;
}
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
