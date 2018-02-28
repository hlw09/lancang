<template>
    <transition name="fade" appear>
        <main-layout>
            <div id="demo">
                <a @click="login">未登录</a>
            </div>
        </main-layout>
    </transition>
</template>

<script>
    import MainLayout from '../layouts/Main.vue';
    import routes from '../routes';
    import {Util} from '../common/js/common';
    export default {
        data(){
            return {};
        },
        created(){
        },
        methods: {
            login(){
                this.$root.currentRoute = '/login';
                window.history.pushState(null,routes['/login']+'?id=1',routes['/login']+'?id=1');
            }
        },
        components: {
            MainLayout
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/css/common.styl"
.container
    position absolute!important
    width 100%!important
    height 100%!important
    background red!important
</style>