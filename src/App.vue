<template>
  <div id="app">
    <NavBar/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>
<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    NavBar,Footer
  }
}
</script>
