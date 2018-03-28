<template>
  <div id="LoginValidator">

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "LoginValidator",
  computed: mapGetters([
    'userData'
  ]),
  mounted() {
    if(this.userData.userId === 0){
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
</style>
