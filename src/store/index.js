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
      console.log("USUARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
      console.log(payload)
      state.user = payload
      console.log("USUARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOO222222222222222222222")
      console.log(state.user)
      console.log("email")
      //console.log(state.user.email)
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
      console.log("SUSCRIPCIONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
      console.log(payload)
      state.suscripcion = payload
      console.log("SUSCRIPCIONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN 2222222222222222222222222222222222222")
      console.log(state.suscripcion)
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
      commit('setRevistas', null)
      commit('setRevistasFiltradas', null)
      
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
      console.log("INICIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
      commit('setSuscripcionUser', "Free")
    },


    async updateSuscripcion({commit, state},susc){
      const valor = "Premium"
      try{
        const res = await fetch(`https://udemy-firebase-56415-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({Suscripcion: susc.suscripcion_enviar})
        })
        console.log("Llleooooooooooooooooooooooooooooooooooooooooo 1 11111111111111111111111111")
      } catch (error) {
        console.log(error)
      }
      console.log("INICIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
      commit('setSuscripcionUser', "Premium")
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
    },
    async obtenerRevistas({commit}, filtro){
      try {
        
        const res = await fetch(`http://localhost:5000/filtroParametros?area=${filtro.area}&categoria1=${filtro.consulta1}&categoria2=${filtro.consulta2}&categoria3=${filtro.consulta3}&categoria4=${filtro.consulta4}&minArt=${filtro.minarticulos}&maxArt=${filtro.maxarticulos}&estado=${filtro.suscripcion}`)
        const revistas = await res.json()
        commit('setRevistasFiltradas', revistas)
        //localStorage.setItem('usuario', JSON.stringify(userDB))
        //router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async sendMail({commit}, email){
      console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO GMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
      const nodemailer = require('nodemailer')
      const { google } = require('googleapis')
      
      console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO GMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")

      const CLIENT_ID = '225068578618-9a435np32p9d4eidu3ohdbeog2gsqcjg.apps.googleusercontent.com'
      const CLIENT_SECRET = 'ZspbZO_GAs0BUUMghr3P5nvc'
      const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
      const REFRESH_TOKEN = '1//04i_m13cOuUqgCgYIARAAGAQSNwF-L9Ir6G4tP0rVJgC7Cd_VLZtb5Mnuik3eb11BfCzUIp2cKEnnx9p4tiWuqGN_oFrv9-_UNKE'
  
      const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );
  
          oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
          console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO GMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
      try{
          console.log("GMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
          const accessToken = await oAuth2Client.getAccessToken();
          console.log("GMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
          console.log(email)
          const transport = nodemailer.createTransport({
              service: 'gmail',
              auth:{
                  type : 'OAuth2',
                  user : 'juegabrayan333@gmail.com',
                  clientId : CLIENT_ID,
                  clientSecret : CLIENT_SECRET,
                  refreshToken : REFRESH_TOKEN,
                  accessToken : accessToken,
              },
          });
  
          const mailOptions = {
              from : 'Notificador ProScience Searcher <juegabrayan333@gmail.com>',
              to : email,
              subject: "Notificación - Proscience Searcher",
              text: 'Notificacion 1',
              html: '<h1> Usted se ha suscrito a ProScien Searcher </h1>',
          };

          const result = await transport.sendMail(mailOptions);
          console.log(result)

          commit()
  
          
          //return result;
  
      }catch(error){
          console.log(error);
      }
    }, 
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
