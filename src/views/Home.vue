<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea"/>
  </form>
<hr>
  <ListaTareas />
</template>

<script>
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'
import {mapActions} from 'vuex'
const shortid = require('shortid');
export default {
  name: 'Home',
  data() {
    return {
      tarea :{
        id : '',
        nombre : '',
        categorias : [],
        estado : '',
        numero : 0
      }
    }
  },
  methods:{
    ...mapActions(['setTareas']),
    ...mapActions(['cargarLocalStorage']),
    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim() === ""){
        console.log("Campo vacio")
        return
      }
      else{
        console.log("No esta vacio")
      }

      //Generar ID
      this.tarea.id = shortid.generate()
      console.log(this.tarea.id)
      //Envío de datos
      this.setTareas(this.tarea)

      this.tarea = {
        id: '',
        nombre: '',
        categorias : [],
        estado : '',
        numero : 0
      }
    }
  },
  created(){
    this.cargarLocalStorage()
  },
  components: {
    Input, ListaTareas
  }
}
</script>
