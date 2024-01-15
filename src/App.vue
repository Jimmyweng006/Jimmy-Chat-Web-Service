<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
    margin: 0;
    padding: 0;
    overflow: hidden; /* 隱藏所有滾動條 */
}
</style>