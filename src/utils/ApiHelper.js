import axios from 'axios'

class ApiHelper {
  static GetBestGrowth () {
    return axios.get(ApiHelper.GetBaseUrl() + '/api/bestgrowth')
  }

  static GetBaseUrl () {
    let getUrl = (window.location.host === 'localhost:8080' ? 'https://localhost:44342/' : window.location.protocol + '//' + window.location.host)
    return getUrl
  }
}

export default ApiHelper
