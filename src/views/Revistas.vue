<template>
  <Cuartil/>
  <h3
    class="my-5"
    style="text-align: center"
    >
      Lista de Revistas
  </h3>
  <CardList />

  <!-- <p v-for="(revista, index) in arrayData" :key="index">
      <router-link :to="`/revistas/${revista.name}`">
          {{revista.name}}
      </router-link>
  </p> -->
</template>

<script>
import Cuartil from '../components/Cuartil'
import CardList from '../components/CardList'
import {mapState, mapActions} from 'vuex'
import {useFetch} from '../hooks/useFetch'
export default {
    computed:{
        ...mapState(['revistas'])
    },
    methods:{
        ...mapActions(['cargarLocalStorage', 'getRevistas', 'filtrarQuartil'])
    },
    created(){
        this.cargarLocalStorage()
        //this.getRevistas()
    },
    mounted(){
        //this.filtrarQuartil('')
    },
    components: {
        Cuartil, CardList
    }
}
</script>