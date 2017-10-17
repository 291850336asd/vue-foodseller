/**
 * Created by sunmeng on 17/7/20.
 */
export function urlParse () {
  var searchURL = window.location.search;
  searchURL = searchURL.substring(1, searchURL.length);
  var parames = searchURL.split('&');
  var obj = {};
  parames.forEach((item) => {
    var temp = item.split('=');
    var key = decodeURIComponent(temp[0]);
    var value = decodeURIComponent(temp[1]);
    obj[key] = value;
  });
  return obj;
};
