class Network {
    // send request to the server
    sendAjax(
        url, // string
        method, // "GET" | "POST",
        queryStr, // string,
        success, // (res: XMLHttpRequest) => void
        error, // (res: XMLHttpRequest) => void
        isFormData // FormData
    ) {
      const xhttp = new XMLHttpRequest();

      if (method.toUpperCase() == "GET") {
        if (queryStr && queryStr != "") {
          url = `${url}?${queryStr}`;
        }
      }

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          success(this);
        } else if (this.readyState == 4 && this.status != 200) {
          error(this);
        }
      };

      xhttp.open(method, url, true);

      // the object state must be opened before setting headers
      if (!isFormData) {
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
      }

      xhttp.send(queryStr);
    }
}

export default Network
