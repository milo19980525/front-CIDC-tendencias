<template>
  <h3
      v-if="revistas"
      class="my-5"
      style="text-align: center"
      >
        Lista de Revistas
    </h3>
  <div class="row"
    v-if="revistas">
    <div 
      class="col-12"
      v-for="revista in revistas" :key="revista.name"
    >
      <Card :revista="revista"/>
    </div>
  </div>
</template>

<script>
import { computed, onMounted} from 'vue'
import Card from './Card'
import {useStore} from 'vuex'

export default {
  components:{
    Card
  },
  setup(){
    const store = useStore()
    
    const revistas = computed( () => {
      return store.state.revistasFiltradas
    })

    const revistas2 = computed( () => {
      return store.getters.topRevistasArticulos
    })

    onMounted(async() => {
      await store.dispatch('getRevistas')
      //await store.dispatch('filtrarQuartil', '')
    })    

    //console.log("REVISTAAAAAS FILTRADAAAAAAAAAAAAAAAS")
    //console.log(revistas)
    return {revistas, revistas2}
  }
}
</script>