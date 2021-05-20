<template>
  <h1 class="my-5">
      Bienvenido a Proscience Finder
  </h1>
  <h2 class="my-5">
      Registro de Usuarios
  </h2>
  <div class="my-5 label">
      Estimado investigador tenga en cuenta las siguientes consideraciones:
      <p>
          
      </p>
      <li>
          El campo nombre no admite caractéres especiales o números.
      </li>
      <li>
          La contraseña debe ser mínimo de 6 digitos.
      </li>
      <li>
          El correo debe contar con un formato valido  (@mi_dominio.com).
      </li>
  </div>
  <div class="alert alert-danger" v-if="mostrarError === true">
      {{error_componente}}
  </div>
  <div class="alert alert-danger" v-if="error2.tipo !== null">
      {{error2.mensaje}}
  </div>
  <form @submit.prevent="procesarFormulario">
    <input
        type="email"
        placeholder="email"
        class="form-control my-2"
        v-model.trim="email"
        :class="[error2.tipo === 'email' ? 'is-invalid' : '']"
    >
    <input 
        type="password"
        placeholder="password"
        class="form-control my-2"
        v-model.trim="pass1"
        :class="[error2.tipo === 'contraseña' ? 'is-invalid' : '']"
    >
    <input
        type="password" 
        placeholder="password"
        class="form-control my-2"
        v-model.trim="pass2"
        :class="[error2.tipo === 'contraseña' ? 'is-invalid' : '']"
    >
    <input
        type="text" 
        placeholder="Nombre Completo"
        class="form-control my-2"
        v-model.trim="nombre"
        
    >
    <button 
        type="submit"
        class="btn btn-primary"
        :disabled="bloquear">Registrar</button>

  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            email: '',
            pass1 : '',
            pass2 : '',
            nombre: '',
            error_componente: '',
        }
    },
    computed:{
        bloquear(){
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass1.length > 5 && this.pass1 === this.pass2 && this.nombre.length > 0){
                return false
            }
            return true
        },
        mostrarError(){
            if((this.allLetter(this.nombre) === false) && this.nombre.length > 0){
                this.error_componente = "No pueden existir caracteres o números en el campo nombre."
                return true
            }
            if(this.pass1.length < 6 && this.pass1 !== this.pass2){
                this.error_componente = "La contraseña debe ser mayor mínimo de 6 caractéres."
                return true
            }
            if(this.pass1 !== this.pass2){
                this.error_componente = "Las contraseñas no coinciden."
                return true
            }
        },
        ...mapState(['error2'])
    },
    methods:{
        ...mapActions(['registrarUsuario', 'setNombre', 'setSuscripcion']),
        async procesarFormulario(){
            await this.registrarUsuario({email: this.email, password: this.pass1, nombre: this.nombre})
            if(this.error2.tipo !== null){
                return
            }
            this.email = ''
            this.pass1 = ''
            this.pass2 = ''
            await this.setNombre(this.nombre)
            await this.setSuscripcion()
        },
        allLetter(inputtxt){
        var letters = /^[A-Za-z ñáéíóú]+$/
        if(inputtxt.match(letters))
            {
            return true;
            }
        else
            {
            return false;
            }
        }
    }
}
</script>

<style>

</style>