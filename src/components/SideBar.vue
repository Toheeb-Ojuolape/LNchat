<template>
  <div>
    <v-navigation-drawer
      fixed
      absolute
      permanent
      left
      style="padding: 30px 30px 0px 30px"
      class="hidden-md-and-down"
    >
      <h1>LN⚡CHAT</h1>

      <v-list>
        <v-list-item-group
          v-for="item in items"
          :key="item.title"
          color="#0582D2"
        >
          <v-list-item link :to="item.link">
            <v-list-item-icon style="margin-right: 20px">
              <v-icon color="#f97316">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content :to="item.link">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item color="#f97316" @click="logOut()">
          <v-list-item-icon style="margin-right: 20px">
            <v-icon color="#f97316">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color:#f97316" color="#f97316">Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
  
  <script>
import {getAuth, signOut} from "firebase/auth";
export default {
  name: "SideBar",
  data: () => ({
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-grid-outline",
        link: "/dashboard",
      },
      {
        title: "Chats",
        icon: "mdi-chat",
        link: "/chat",
      },
      {
        title: "Transactions",
        icon: "mdi-swap-horizontal",
        link: "/transactions",
      },
    ],
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },

  computed: {},

  props: {},

  created() {},

  methods: {
    logOut() {
      const auth = getAuth();
      signOut(auth).then((result) => {
        localStorage.removeItem("userData");
        sessionStorage.removeItem("token")
        console.log(result);
        this.user = "";
        this.$router.push("/");
      });
    },
  },
};
</script>
  
  
  <style scoped>
.line {
  height: 1px;
  border: none;
  background: #efefef;
}
</style>