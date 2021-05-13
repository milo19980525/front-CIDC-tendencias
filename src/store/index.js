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
    susccripcion: null,
    error: {tipo: null, mensaje: null}
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
        return state.error = {tipo: 'email', mensaje: 'Email ya registrado'}
      }
      if(payload ==="INVALID_EMAIL"){
        return state.error = {tipo: 'email', mensaje: 'Email invalido'}
      }
      if(payload ==="WEAK_PASSWORD : Password should be at least 6 characters"){
        return state.error = {tipo: 'contraseña', mensaje: 'La contraseña debe ser mínimo de 6 carácteres de longitud'}
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
      state.susccripcion = payload
    },
    set(state, payload){
      state.tareas.push(payload)
    },
    setNombres(state, payload){
      state.nombre = payload
    },
    setSuscripcionUser(state, payload){
      state.susccripcion = payload
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
      console.log("STATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE REVISTAAAAAAAAAAAAAS JSOOOOOOOOOOOOOOOON")
      console.log(payload)
      state.revistas = payload
      console.log("STATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE REVISTAAAAAAAAAAAAAS")
      console.log(state.revistas)
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
      localStorage.removeItem('usuario')
      router.push('/ingreso')
    },
    async ingresoUsuario({commit}, user){
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyJIk3EKTzIgWQXFuwbT3zQQYvL2_uYxk', {
          method: 'POST',
          body:JSON.stringify({
          email : user.email,
          password : user.password,
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
    async registrarUsuario({commit}, user){
      try {
        const res = await fetch ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyJIk3EKTzIgWQXFuwbT3zQQYvL2_uYxk', {
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
        const res = await fetch(`https://udemy-firebase-56415-default-rtdb.firebaseio.com/tareas/${state.user.localId}/Nombre.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        commit('cargarNombre', dataDB)
      } catch (error) {
        console.log(error)  
      }
      try {
        const res = await fetch(`https://udemy-firebase-56415-default-rtdb.firebaseio.com/tareas/${state.user.localId}/Suscripcion.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        commit('cargarSuscripcion', dataDB)
      } catch (error) {
        console.log(error)  
      }
      console.log(state.user)
    },
    async setNombre({commit, state}, nombreUsuario){
      try {
        const res = await fetch(`https://udemy-firebase-56415-default-rtdb.firebaseio.com/tareas/${state.user.localId}/Nombre.json?auth=${state.user.idToken}`, {
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
        const res = await fetch(`https://udemy-firebase-56415-default-rtdb.firebaseio.com/tareas/${state.user.localId}/Suscripcion.json?auth=${state.user.idToken}`, {
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
    async getRevistas({commit}){
      try {
        const res = await fetch('revistas.json')
        const data = await res.json()
        console.log("JSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNNNNNN REVISTAAAAAAAAAAAAAS")
        console.log(data)
        commit('setRevistas', data)
      } catch (error) {
        console.log(error)
      }
    },
    filtrarQuartil({commit, state}, quartil){
      console.log("FILTROOOOOOOOOOOOOOOOOOOOOOOOO STATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
      console.log(state.revistas)
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
    }
  },
  modules: {
  },
  getters:{
    usuarioAutenticado(state){
      try {
        console.log("usuariooooo",state.user)
      } catch (error) {
        console.log(error)
      } 
      return !!state.user
    },
    topRevistasArticulos(state){
      console.log('ORDENAAAAR', state.revistasFiltradas)
      return state.revistasFiltradas.sort((a, b) => {
        return a.population < b.population ? 1 : -1
      })
    }
  }
})
