import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

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

describe('NavBar.vue', () => {

  it('renders with title', () => {
    const title = 'title'
    const wrapper = shallowMount(NavBar, {
      propsData: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('Back on click on the button', () => {
    const wrapper = shallowMount(NavBar, {
      localVue,
      router
    })

    wrapper.vm.$router.go = jest.fn()
    wrapper.find('.back-button').trigger('click')
    expect(wrapper.vm.$router.go).toBeCalledWith(-1)
  })
})
