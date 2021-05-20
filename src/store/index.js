import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas : [],
    tarea : {
      id : '',
      nombre : '',
      categorias : [],
      estado : '',
      numero : 0,
      revistas: [],
      revistasFiltradas: []
    },
    user : null,
    nombre: null,
    suscripcion: null,
    error: {tipo: null, mensaje: null},
    error2: {tipo: null, mensaje: null}
  },
  mutations: {
    setError(state, payload){
      if(payload === "EMAIL_NOT_FOUND"){
        return state.error = {tipo: 'email', mensaje: 'Email no registrado'}
      }
      if(payload === null){
        return state.error = {tipo:null, mensaje:null}
      }
      if(payload === "INVALID_PASSWORD"){
        return state.error = {tipo: 'contraseña', mensaje: 'Contraseña incorrecta'}
      }
      if(payload ==="EMAIL_EXISTS"){
        return state.error2 = {tipo: 'email', mensaje: 'Email ya registrado'}
      }
      if(payload ==="INVALID_EMAIL"){
        return state.error2 = {tipo: 'email', mensaje: 'Email invalido'}
      }
      if(payload ==="WEAK_PASSWORD : Password should be at least 6 characters"){
        return state.error2 = {tipo: 'contraseña', mensaje: 'La contraseña debe ser mínimo de 6 carácteres de longitud'}
      }
    },
    setUser(state, payload){
      state.user = payload
    },
    cargar(state, payload){
      state.tareas = payload
    },
    cargarNombre(state, payload){
      state.nombre = payload
    },
    cargarSuscripcion(state, payload){
      state.suscripcion = payload
    },
    set(state, payload){
      state.tareas.push(payload)
    },
    setNombres(state, payload){
      state.nombre = payload
    },
    setSuscripcionUser(state, payload){
      state.suscripcion = payload
    },
    eliminar(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload){
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    },
    setRevistas(state, payload){
      state.revistas = payload
    },
    setRevistasFiltradas(state, payload){
      state.revistasFiltradas = payload
    }
  },
  actions: {
    cerrarSesion({commit}){
      commit('setUser', null)
      commit('setNombres', null)
      commit('setSuscripcionUser', null)
      commit('setRevistas', null)
      commit('setRevistasFiltradas', null)
      
      localStorage.removeItem('usuario')
      router.push('/ingreso')
    },
    async ingresoUsuario({commit}, user){
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_KEY_FIREBASE}`, {
          method: 'POST',
          body:JSON.stringify({
          email : user.email,
          password : user.password,
          returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if(userDB.error){
          return commit('setError', userDB.error.message)
        }
        commit('setError', null)
        commit('setUser', userDB)
        localStorage.setItem('usuario', JSON.stringify(userDB))
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async registrarUsuario({commit}, user){
      try {
        const res = await fetch (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_KEY_FIREBASE}`, {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if(userDB.error){
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }
        commit('setError', null)
        commit('setUser', userDB)
        localStorage.setItem('usuario', JSON.stringify(userDB))
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async cargarLocalStorage({commit, state}){
      if (localStorage.getItem('usuario')){
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      }else{
        return commit('setUser', null)
      }
      try {
        const res = await fetch(`${process.env.VUE_APP_URL}/${state.user.localId}/Nombre.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        commit('cargarNombre', dataDB)
      } catch (error) {
        console.log(error)  
      }
      try {
        const res = await fetch(`${process.env.VUE_APP_URL}/${state.user.localId}/Suscripcion.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        commit('cargarSuscripcion', dataDB)
      } catch (error) {
        console.log(error)  
      }
    },
    async setNombre({commit, state}, nombreUsuario){
      try {
        const res = await fetch(`${process.env.VUE_APP_URL}/${state.user.localId}/Nombre.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nombreUsuario)
        })
        const dataDB = await res.json()
      } catch (error) {
        console.log(error)
      }
      commit('setNombres', nombreUsuario)
    },
    async setSuscripcion({commit, state}){
      try{
        const res = await fetch(`${process.env.VUE_APP_URL}/${state.user.localId}/Suscripcion.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify("Free")
        })
      } catch (error) {
        console.log(error)
      }
      commit('setSuscripcionUser', "Free")
    },


    async updateSuscripcion({commit, state},susc){
      const valor = "Premium"
      try{
        const res = await fetch(`${process.env.VUE_APP_URL}/${state.user.localId}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({Suscripcion: susc.suscripcion_enviar})
        })
      } catch (error) {
        console.log(error)
      }
      commit('setSuscripcionUser', "Premium")
    },


    async getRevistas({commit}){
      try {
        const res = await fetch('revistas.json')
        const data = await res.json()
        commit('setRevistas', data)
      } catch (error) {
        console.log(error)
      }
    },
    filtrarQuartil({commit, state}, quartil){
      const filtro = state.revistas.filter(revista =>
        revista.quartil.includes(quartil)
      )
      commit('setRevistasFiltradas', filtro)
    },
    filtroNombre({commit, state}, texto){
      const textoCliente = texto.toLowerCase()
      const filtro = state.revistas.filter(revista => {
        const textoApi = revista.name.toLowerCase()
        if(textoApi.includes(textoCliente)){
          return revista
        }
      })
      commit('setRevistasFiltradas', filtro)
    },
    async obtenerRevistas({commit}, filtro){
      try {
        
        const res = await fetch(`${process.env.VUE_APP_URL_API}/filtroParametros?area=${filtro.area}&categoria1=${filtro.consulta1}&categoria2=${filtro.consulta2}&categoria3=${filtro.consulta3}&categoria4=${filtro.consulta4}&minArt=${filtro.minarticulos}&maxArt=${filtro.maxarticulos}&estado=${filtro.suscripcion}`)
        const revistas = await res.json()
        commit('setRevistasFiltradas', revistas)
        //localStorage.setItem('usuario', JSON.stringify(userDB))
        //router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    /* async sendMailT({commit}, email){
      const send = require("./gmail")(sendMail);
      send(email);
    }, */
  },
  modules: {
  },
  getters:{
    usuarioAutenticado(state){
      try {
        console.log("")
      } catch (error) {
        console.log(error)
      } 
      return !!state.user
    },
    topRevistasArticulos(state){
      return state.revistasFiltradas.sort((a, b) => {
        return a.population < b.population ? 1 : -1
      })
    }
  }
})
