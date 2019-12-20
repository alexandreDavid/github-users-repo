import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import GithubProjectsByUser from '@/components/GithubProjectsByUser.vue'
import GithubApi from '@/services/GithubApi'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/services/GithubApi', () => ({
  getProjectsByUser: jest.fn()
}))

const mockProject1 = {id: 1, name: 'name1'}
const mockProject2 = {id: 2, name: 'name2'}

async function renderWithValue() {
  const username = 'username'
  const mockProjectsByUser = {
    data: [ mockProject1, mockProject2 ]
  }
  GithubApi.getProjectsByUser.mockResolvedValue(mockProjectsByUser)
  const wrapper = await shallowMount(GithubProjectsByUser, {
    propsData: { username },
    localVue,
    router
  })
  expect(wrapper.vm.isLoading).toBe(true)
  expect(wrapper.text()).toMatch('Please wait')
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.isLoading).toBe(false)
  expect(wrapper.text()).toMatch('name1')

  return wrapper
}

describe('GithubProjectsByUser.vue', () => {
  it('renders with value', renderWithValue)

  it('renders without value', async () => {
    const username = 'username'
    const mockProjectsByUser = {
      data: []
    }
    GithubApi.getProjectsByUser.mockResolvedValue(mockProjectsByUser)
    const wrapper = await shallowMount(GithubProjectsByUser, {
      propsData: { username }
    })
    expect(wrapper.vm.isLoading).toBe(true)
    expect(wrapper.text()).toMatch('Please wait')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.text()).toMatch('No result')
  })

  it('renders with error', async () => {
    const username = 'username'
    const mockError = 'mockError'
    GithubApi.getProjectsByUser.mockRejectedValue(mockError)
    const wrapper = await shallowMount(GithubProjectsByUser, {
      propsData: { username }
    })
    expect(wrapper.vm.isLoading).toBe(true)
    expect(wrapper.text()).toMatch('Please wait')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.text()).toMatch(mockError)
  })

  it('filters the list', async () => {
    const wrapper = await renderWithValue()
    wrapper.vm.filterProjectsValue = '2'
    expect(wrapper.text()).not.toMatch(mockProject1.name)
    expect(wrapper.text()).toMatch(mockProject2.name)
  })
})
