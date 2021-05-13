<template>
  Editar {{$route.params.id}} - {{tarea}}
  <form @submit.prevent="updateTarea(tarea)">
      <Input :tarea="tarea"/>
  </form>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Input from '../components/Input'
export default {
    components:{
        Input
    },
    computed:{
        ...mapState(['tarea'])
    },
    methods:{
        ...mapActions(['setTarea']),
        ...mapActions(['updateTarea'])
    },
    created(){
        this.setTarea(this.$route.params.id)
    }
}
</script>