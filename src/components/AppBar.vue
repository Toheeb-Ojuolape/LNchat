<template>
  <div style="background: white; padding: 0px 0px 0px 90px">
    <v-app-bar color="white" class="appBar" flat>
      <v-spacer></v-spacer>

      <div>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-avatar color="#310059" class="white--text">Ad</v-avatar>
          </v-list-item-avatar>
          <v-list-item-title class="font-weight-medium"
            >Hello Admin!</v-list-item-title
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
//   computed: {
//     ...mapState({}),
//   },
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
</style>