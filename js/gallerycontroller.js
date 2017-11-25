/**
 * Manages rendering the images in the gallery from the provided image data.
 */
class GalleryController {
  constructor(imageDataList, lightboxController) {
    this.imageDataList_ = imageDataList;

    this.lightboxController_ = lightboxController;
  }

  /* Renders the images in the gallery element. */
  renderGallery() {
    for (const imageData of this.imageDataList_) {
      console.log(imageData);
      let imgEl = document.createElement('img');
      imgEl.src = imageData.url;
      var galleryEl = 
          document.body.getElementsByClassName('gallery')[0];
      galleryEl.appendChild(imgEl);  
      imgEl.addEventListener(
      	  'click', 
      	  () => {this.lightboxController_.start(imageData.url)});
    }
  }
}