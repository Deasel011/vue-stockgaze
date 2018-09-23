import axios from 'axios'

class ApiHelper {
  static GetBestGrowth () {
    return axios.get(ApiHelper.GetBaseUrl() + '/api/bestgrowth')
  }

  static GetBaseUrl () {
    let getUrl = window.location
    return getUrl.protocol + '//' + getUrl.host
  }
}

export default ApiHelper
