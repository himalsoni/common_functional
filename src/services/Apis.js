import HTTP from "./http";
class Apis {
  constructor() { }

  appConfig() {
    return HTTP.GET("lookup/getlookup");
  }
  login(data) {
    return HTTP.POST("user/login", data);
  }
}
export default new Apis();
