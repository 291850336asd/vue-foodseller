/**
 * Created by sunmeng on 17/7/20.
 */
export function saveTolocal (id, key, value) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage._seller_ = JSON.stringify(seller);
};

export function removefromLocal (id, key) {
  let seller = window.localStorage._seller_;
  if (seller) {
    seller = JSON.parse(seller);
    if (seller[id]) {
      if (seller[id][key]) {
        seller[id][key] = null;
        window.localStorage._seller_ = JSON.stringify(seller);
      }
    }
  }
};


export function loadfromLocal (id, key, def) {
  let seller = window.localStorage._seller_;
  if (seller) {
    seller = JSON.parse(seller);
    if (seller[id]) {
      if (seller[id][key]) {
        return seller[id][key];
      }
    }
  }
  return def;
};
