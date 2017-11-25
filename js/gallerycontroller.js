class GalleryController {
  constructor(imageDataList, lightboxController) {
    this.imageDataList_ = imageDataList;

    this.lightboxController_ = lightboxController;
  }

  renderGallery() {
    for (const imageData of this.imageDataList_) {
      console.log(imageData);
      let img = document.createElement('img');
      img.src = imageData.url;
      var galleryDiv = document.body.getElementsByClassName('gallery')[0];
      galleryDiv.appendChild(img);  
      img.addEventListener('click', () => {this.lightboxController_.start(imageData.url)});
    }
  }
}