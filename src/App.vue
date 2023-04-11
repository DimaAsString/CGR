<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
export default {
    mounted() {
        document.title="体育馆管理后台系统"
    }
}
</script>
<style>
html, body, #app {
    height: 100%;
    width: 100%;
}
</style>

