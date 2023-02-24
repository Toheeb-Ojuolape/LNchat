<template>
  <v-main class="container">
    <v-sheet class="chatContainer">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        dense
        color="#f97316"
        outlined
        placeholder="Search for users"
        @keyup="searchUsers"
      />

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="#f97316"
      ></v-progress-circular>

      <div v-for="(user, i) in filteredUsers" :key="i">
        <v-card flat class="my-4">
          <v-list>
            <v-list-item>
              <v-list-item-avatar
                ><v-img :src="user.photoURL"></v-img
              ></v-list-item-avatar>
              <v-list-item-title>{{ user.name }}</v-list-item-title>

              <v-list-item-action>
                <v-btn
                  @click="showChat(user)"
                  color="#f97316"
                  outlined
                  
                  >Start chat⚡</v-btn
                >
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <hr/>
      </div>
      <v-overlay v-if="btnloading" class="text-center">
        <v-progress-circular indeterminate color="#f97316"></v-progress-circular>
        <p>Loading chat interface...</p>
      </v-overlay>
    </v-sheet>
  </v-main>
</template>
  
  
  
  
<script>
import db  from "../db";
import { doc, setDoc } from "firebase/firestore";

export default {
  data: () => ({
    search: "",
    btnloading:false
  }),
  props: {
    filteredUsers: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
  },
  computed: {},
  methods: {
    searchUsers() {
      this.$store.dispatch("searchUsers", this.search);
    },

    removeDuplicate(string) {
      return string
        .split("")
        .filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        })
        .join("");
    },

    sortAlpha(text) {
      let code = text.split("").sort().join("");
      return this.removeDuplicate(code);
    },

    showChat(user) {
      this.btnloading = true
      const slug = this.sortAlpha(
        sessionStorage.getItem("token").toLowerCase() + user.uid.toLowerCase()
      );
      const docRef = doc(db, "chats", slug);
      setDoc(docRef, {
        firstPerson:JSON.parse(localStorage.getItem("userData")).displayName,
        firstPersonUID:JSON.parse(localStorage.getItem("userData")).uid,
        secondPerson:user.name,
        secondPersonUID:user.uid,
        slug:slug,
      },{merge:true}).then(()=>{
        this.btnloading = false
        window.location.href ="/chat/"+slug
        
      })
    },
  },
};
</script>
  
  
  <style scoped>
.container {
  padding: 30px 0px 0px 100px !important;
}

.chatContainer {
  padding: 50px 100px 50px 100px;
  border-radius: 20px;
  margin: 20px;
}

.card {
  background: linear-gradient(to right, #f83600 0%, #f9d423 100%);
  color: white;
}
.top-right {
  position: absolute;
  top: 14px;
  right: 16px;
}

.balance {
  margin: 60px 0px 0px 0px;
}

h1 {
  font-size: 50px;
}

.tilt {
  transform: rotate(-20deg);
}

.actionButtons {
  max-width: 500px;
  text-align: end;
  display: flex;
  justify-content: space-around;
}
</style>