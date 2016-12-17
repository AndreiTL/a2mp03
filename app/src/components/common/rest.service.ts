export const RestService =  {

  sendRequest(type: string, url: string, async: boolean, body:string) {
    return new Promise((resolve, reject) =>{
      let xhr = new XMLHttpRequest();
      xhr.open(type, url, async);
      xhr.send([body]);
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          // callBack(null);
          reject(null);
        } else {
          // callBack(this.responseText, context);
          resolve(this.responseText);
        }
      }
    });
  }
};
