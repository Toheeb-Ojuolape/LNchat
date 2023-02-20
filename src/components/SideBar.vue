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
        <v-list>
          <v-list-item-group
            v-for="item in items"
            :key="item.title"
            color="#0582D2"
          >
            <v-list-item
              link
            >
              <v-list-item-icon style="margin-right: 20px">
                <v-icon color="#310059">{{ item.icon }}</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content :to="item.link">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
  
        
          </v-list-item-group>
  
          <v-list-item @click="logOut()">
            <v-list-item-icon style="margin-right: 20px">
              <v-icon color="#310059">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script>
  export default {
    name: "SideBar",
    data: () => ({
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-grid-outline",
          link: "/admin/dashboard",
        },
        {
          title: "Chats",
          icon: "mdi-chat",
          link: "/admin/applications",
        },
        {
          title: "Wallet",
          icon: "mdi-wallet",
          link: "/admin/applicants",
        },
        { title: "Transactions", icon: "mdi-swap-horizontal", link: "/admin/reviewers" },
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
        sessionStorage.removeItem("lnchatToken");
        this.$router.push("/admin/login");
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