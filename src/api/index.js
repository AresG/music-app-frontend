// 封装全局的http请求
import axios from 'axios'

axios.defaults.baseURL = 'https://ares-netease-cloud-music-api.vercel.app'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log('请求的拦截器执行（正常工作）');
    // // 每次在请求中都从当前的会话中读取token，如果token存在就把它携带在header中在后台做用户身份验证
    // let token = sessionStorage.token
    // if (token) {
    //     config.headers.Authorization = 'Bearer ' + token
    // }
    // // 在发送请求之前做些什么
    return config;
}, function (error) {
    console.log('请求的拦截器执行（发生异常）');
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('响应的拦截器执行（正常工作）');
  const { data } = response

  //在这里识别接口业务中的一些异常或是不通过的错误信息
  //他们对于http状态来说式请求成功的，只是接口执行的业务不正确，所以在这处理业务
  if (data.code === 500 || data.code === 401 || data.code === 404) {
    console.error({message:'提示',description:data.msg})
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
    console.log('响应的拦截器执行（发生异常）', error.message);
    
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios