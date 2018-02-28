
<template>
  <div class="container">

    <slot></slot>
  </div>
</template>

<script>
import routes from '../routes'
import {Util} from '../common/js/common'
	
  export default {
  	data(){
  		return{
  			title:'',
  		}
  	},

  	created(){

  	},
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 	@import "../common/css/common.styl"
</style>
