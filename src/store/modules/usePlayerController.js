import { useStore } from 'vuex'

export default function usePlayerController() {
  const store = useStore()

  function play() {
    store.dispatch('music/updatePlayStatus', true)
  }

  function pause() {
    store.dispatch('music/updatePlayStatus', false)
  }

  function seek(time) {
    store.dispatch('music/updatecurrentTime', time)
  }

  return { play, pause, seek }
}
