<template>
  <div class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">
        Home
      </router-link>
      <div
      v-if="usuarioAutenticado">
        <h5 class="my-3 mx-auto" style="color:white">
            Bienvenido a Proscience Searcher: {{nombre}}
        </h5>
      </div>
      <div class="d-flex">
          <router-link 
            class="btn btn-dark" 
            to="/"
            v-if="usuarioAutenticado"
          >
            Suscripción
          </router-link>
          <router-link 
            class="btn btn-dark" 
            to="/suscripcion"
            v-if="!usuarioAutenticado"
          >
            Ingresar
          </router-link>
          <router-link 
            class="btn btn-dark" 
            to="/registro"
            v-if="!usuarioAutenticado"
          >
            Registrar
          </router-link>
          <button
            class="btn btn-dark" 
            v-if="usuarioAutenticado"
            @click="cerrarSesion">
            Cerrar Sesión
          </button>
      </div>

  </div>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  computed:{
    ...mapGetters(['usuarioAutenticado']),
    ...mapState(['nombre'])
  },
  methods:{
    ...mapActions(['cerrarSesion']),
  }
}
</script>