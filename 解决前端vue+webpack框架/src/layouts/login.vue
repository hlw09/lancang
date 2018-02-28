<template>
    <transition name="fade">
        <main-layout>
            <div id="login">
                <a @click="back">参数id为{{id}}的登录页面，点击返回</a>
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
            return {
                id:''
            };
        },
        created(){
            this.id=Util.urlParse().id;
            if(!this.id)this.id=1;
        },
        methods: {
            back(){
                this.$root.currentRoute = '/demo';
                window.history.pushState(null,routes['/demo']+'?id=2',routes['/demo']+'?id=2');
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
        background black!important
</style>