<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},

  data() {
    return {};
  }
};
</script>

<style>
html,body,#app,#loginbox
 {
  height: 100% !important;
  margin: 0;
}
#mianContnet {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
#mianContnet > * {
  width: 100%;
}
#home{
  min-height: 100%;
}
</style>
