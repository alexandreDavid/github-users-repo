import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 5000
})

export default {
  async searchUser (q) {
    return await instance.get(`/search/users`, {
      params: {
        q
      }
    })
  },
  async getProjectsByUser (username) {
    return await instance.get(`/users/${username}/repos`, {
      headers: {
        accept: 'application/vnd.github.inertia-preview+json'
      }
    })
  },
  async getReadMe (username, repo) {
    return await instance.get(`/repos/${username}/${repo}/readme`)
  }
}
