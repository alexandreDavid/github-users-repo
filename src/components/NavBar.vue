<template>
  <div class="nav-bar">
    <ul>
      <li><button @click="back">Back</button></li>
      <li><h2>{{title}}</h2></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: String
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  border-bottom: 1px solid black;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
