<template>
    <v-app>
      <v-main class="hidden-md-and-down">
        <v-row style="background: #f8f8f9; height: 101%">
          <v-col cols="12" md="1" sm="1" lg="1">
            <SideBar />
          </v-col>
          <v-col cols="12" md="11" sm="11" lg="11">
            <AppBar :user="user" />
            <SingleChatComponent @updateChat="updateChat" :messages="messages" :user="user" :loading="loading" :chatData="chatData"/>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </template>
  
  
  <script>
  import SideBar from "../components/SideBar.vue";
  import SingleChatComponent from "@/components/SingleChatComponent.vue";
  import AppBar from "@/components/AppBar.vue";
  import {doc,getDoc} from "firebase/firestore"
  import db from "@/db";
  // import {getAuth,onAuthStateChanged} from "firebase/auth";
  
  export default {
    components: {
      SideBar,
      SingleChatComponent,
      AppBar,
    },


    computed: {
      
    },
  
    data() {
      return {
        user: JSON.parse(localStorage.getItem("userData")),
        messages:[],
        chatData:{},
        loading:false
      };
    },

    methods:{
      updateChat(chat){
        this.messages.push(chat)
      }
    },
    
  
    created() {
      this.loading = true
      const docRef = doc(db,"chats",this.$route.params.id)
      getDoc(docRef).then((response)=>{
        this.chatData = response.data()
        this.loading = false
        if(this.chatData.chats.length > 0){
        this.messages = this.chatData.chats
        }
        else{
          this.messages = []
        }
      })
    },
  };
  </script>
  
  <style scoped>
  </style>