/**
 * Manages loading the images for a given query using the Google custom search
 * API.
 */
class ImageLoader {
  constructor(query) {
    this.imageDataList = [];
    this.query_ = query;
  }

  /** 
   * Loads images with the provided query and invokes the callback when
   * complete.
   */
  loadImages(callback) {
    gapi.client.load(
      'customsearch',
      'v1',
      this.loadImagesWhenReady_.bind(this, callback));
  }

  loadImagesWhenReady_(callback) {
    gapi.client.setApiKey('AIzaSyDm137VmGFZM1JdT627jR4QuDn4bRauBVw');
    var request = gapi.client.search.cse.list({
      'cx': "008139189258827087777:sqwi8lz3u64",
      'q': this.query_,
      'searchType': 'image'
    });

    request.then((response) => {
      for (let item of response.result.items) {
        let imageData = new GalleryImageData(item.link, item.title);
        this.imageDataList.push(imageData);
      }
      callback();
    }, (reason) => {
      console.log(
        'There was an error loading gallery from the Google API:' +
        reason.result.error.message);
    });
  }
}


