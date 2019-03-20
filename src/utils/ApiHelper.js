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

  static GetSymbolSearchResult(searchTerm){
    if(searchTerm.length>1){
      let url = 'https://stockgaze.search.windows.net/indexes/symbols-index/docs?api-version=2017-11-11&search='+searchTerm+'~&api-key=98C916CEB25B0E3B59C2D3D27E4074CE';
      console.log(url);
      return axios.get(url);
    }
    return null;
  }
}

export default ApiHelper
