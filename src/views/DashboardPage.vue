<template>
    <v-app>
        <v-main class="hidden-md-and-down">
      <v-row style="background:#F8F8F9;height:101%">
        <v-col cols="12" md="1" sm="1" lg="1">
          <SideBar />
        </v-col>
        <v-col  cols="12" md="11" sm="11" lg="11">
            <AppBar />
            <DashboardComponent />
        </v-col>
      </v-row>
    </v-main>
    </v-app>
</template>


<script lang="ts">
import SideBar from "../components/SideBar.vue"
import DashboardComponent from "@/components/DashboardComponent.vue"
import AppBar from "@/components/AppBar.vue";
import { mapState } from "vuex";

export default {
    components:{
        SideBar,
        DashboardComponent,
        AppBar
    },

    computed:{
      ...mapState([
        'admin'
      ])
    },
    
    created(){
      if(this.admin.applications.length == 0 && this.admin.applicants.length == 0){
        this.$store.dispatch("admin/fetchAdminUsers")
      }
        if(sessionStorage.getItem("adminToken") == null){
          this.$router.push("/admin/login")
        }
    }
}
</script>

<style scoped>

</style>