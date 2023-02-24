<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style>
.v-btn{
  text-transform: none !important;
}

.router-link,a {
  text-decoration:none !important;
  color:#f97316 !important
}



@font-face {
  font-family: "GraphikRegular";
  src: url("./assets/fonts/GraphikRegular.otf");
}

@font-face {
  font-family: "GraphikBold";
  src: url("./assets/fonts/GraphikSemibold.otf");
}


caption,
p,
.caption,
.subtitle-1,div,label,.v-btn{
  font-family: "GraphikRegular" !important;
}

.brandcolor{
  color:#f97316 !important
}


h1,
h2,
h3,
h4{
  font-family: "GraphikBold";
}
</style>