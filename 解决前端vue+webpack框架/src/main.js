import Vue from 'vue'
import routes from './routes'
import {Util} from './common/js/common'
import axios from 'axios'
import AMap from 'vue-amap'
import 'babel-polyfill'
Vue.prototype.$http = axios
Vue.use(AMap);
// import 'vue-smooth-picker/dist/css/style.css'
import SmoothPicker from 'vue-smooth-picker'
Vue.use(SmoothPicker)

let page = Util.urlParse().name
let Url=''
if(page){
	 Url = page
}else{
	Url = window.location.pathname
}
const app = new Vue({
  el: '#app',
  data: {
    currentRoute: Url
  },
  created(){
      // let code = Util.urlParse().code;
      // let state = Util.urlParse().state;
      // let openId = Util.urlParse().openId
      // let merchantOpenId = Util.urlParse().merchantOpenId//有则不做自动 登陆木
      // console.log(code)
      // console.log(state)
      // let that = this;
      // if(merchantOpenId){
      // 	return
      // }
     /* that.$http.post(Util.getUrl()+'api/mb/tempMmeber/register?code='+code+'&state='+state+'&openId='+openId).then(
          function(response){
              var data = response.data;
              if(data.success){
                  window.localStorage.setItem('info',JSON.stringify(data.dataObject));
              }else{
                  window.localStorage.clear();
                  // alert(data.errorMessage)
              }
          }
          
      )*/
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute];
      return matchingView
        ? require('./layouts/' + matchingView + '.vue')
        : require('./layouts/demo.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})


