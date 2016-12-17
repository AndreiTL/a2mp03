export const LocationService =  {
  getCurrentLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject): void => {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos: Position): PositionCallback {
        let crd: Coordinates = pos.coords;
        // this.coordinates = crd;
        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');
        resolve(crd);
        return;
      }

      function error(err: PositionError): PositionErrorCallback  {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        alert('Cann\'t get your current position!');
        reject(err);
        return;
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  }
};



