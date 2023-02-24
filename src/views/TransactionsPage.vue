<template>
    <v-app>
        <v-main class="hidden-md-and-down">
      <v-row style="background:#F8F8F9;height:101%">
        <v-col cols="12" md="1" sm="1" lg="1">
          <SideBar />
        </v-col>
        <v-col  cols="12" md="11" sm="11" lg="11">
            <AppBar :user="user"/>
            <TransactionsComponent :transactions="transactions" :loading="loading"/>
        </v-col>
      </v-row>
    </v-main>
    </v-app>
</template>


<script lang="ts">
import SideBar from "../components/SideBar.vue"
import TransactionsComponent from "@/components/TransactionsComponent.vue"
import AppBar from "@/components/AppBar.vue";
import { mapState } from "vuex";
// import {getAuth,onAuthStateChanged} from "firebase/auth";

export default {
    components:{
        SideBar,
        TransactionsComponent,
        AppBar
    },

    computed:{
      ...mapState({
        transactions:"transactions",
        loading:"loading"
      })
    },

    data(){
      return{
        user:JSON.parse(localStorage.getItem("userData"))
      }
    },

    created() {
      this.$store.dispatch("fetchTransactions")
  }
  
}
</script>

<style scoped>

</style>