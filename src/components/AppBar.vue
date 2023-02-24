<template>
  <div style="background: white; padding: 0px 0px 0px 90px">
    <v-app-bar color="white" class="appBar" flat>
      <v-spacer></v-spacer>

      <div>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-avatar color="#f97316" class="white--text"><v-img :src="user ?user.photoURL:''"></v-img></v-avatar>
          </v-list-item-avatar>
          <v-list-item-title class="font-weight-medium"
            >Hello <span class="brandcolor">{{ user !== undefined ? firstName:'' }}</span> 👋🏾</v-list-item-title
          >
        </v-list-item>
      </div>
    </v-app-bar>
  </div>
</template>




<script lang="ts">
// import { mapState } from "vuex";

export default {
  data: () => ({}),
  components: {},
  props:{
    user:{
      type:Object
    }
  },
  computed:{
    firstName(){
      return this.user.displayName.split(" ")[0]
    }
  },
  created() {},
  methods: {},
};
</script>


<style lang="css" scoped>
.appBar {
  padding: 30px 70px 80px 70px !important;
}
v-text-field {
  outline: none !important;
}

.searchField >>> .v-input__slot::before {
  border-style: none !important;
}

span{
  font-size:17px;
  font-weight:bold;
  color:#e86b10
}
</style>