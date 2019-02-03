import axios from 'axios'

class ApiHelper {
  static GetBestGrowth () {
    return axios.get(ApiHelper.GetBaseUrl() + '/api/bestgrowth')
  }

  static GetHighestMseSqrd () {
    return axios.get(ApiHelper.GetBaseUrl() + '/api/highestmsesqrd')
  }

  static GetLeveraged () {
    return axios.get(ApiHelper.GetBaseUrl() + '/api/leveraged')
  }

  static GetBaseUrl () {
    let getUrl = (window.location.host === 'localhost:8080' ? 'https://localhost:44342/' : window.location.protocol + '//' + window.location.host)
    return getUrl
  }

  static GetIEXUrl(){
    return 'https://api.iextrading.com/1.0/'
  }

  static GetIEX
}

export default ApiHelper
