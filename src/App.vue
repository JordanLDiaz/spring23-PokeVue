<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid bg-img">
    <router-view />
  </main>
  <footer class="bg-danger text-light">
    Made with 💖 by CodeWorks
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.bg-img {
  background-image: url('./assets/img/pokemon-bg.jpg');
  background-position: center;
  background-size: cover;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
