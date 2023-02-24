<template>
  <v-app>
    <v-main class="hidden-md-and-down">
      <v-row style="background: #f8f8f9; height: 101%">
        <v-col cols="12" md="1" sm="1" lg="1">
          <SideBar />
        </v-col>
        <v-col cols="12" md="11" sm="11" lg="11">
          <AppBar :user="user" />
          <ChatComponent :filteredUsers="filteredUsers" :loading="loading" />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>


<script lang="ts">
import SideBar from "../components/SideBar.vue";
import ChatComponent from "@/components/ChatComponent.vue";
import AppBar from "@/components/AppBar.vue";
import { mapState } from "vuex";
// import {getAuth,onAuthStateChanged} from "firebase/auth";

export default {
  components: {
    SideBar,
    ChatComponent,
    AppBar,
  },

  computed: {
    ...mapState({
      filteredUsers:"filteredUsers",
      loading: "loading",
    }),
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("userData")),
    };
  },

  created() {
    this.$store.dispatch("fetchUsers");
  },
};
</script>

<style scoped>
</style>