/**
 * Controls the current state of the lightbox and sets up buttons and
 * keystrokes to enable the user to navigate the lightbox.
 */
class LightboxController {
  constructor(imageDataList) {
    this.imageDataList_ = imageDataList;

    this.currentIndex_ = undefined;

    // Cache DOM elements that are used 
    this.lightboxEl_ = 
      document.body.getElementsByClassName('lightbox')[0];
    this.lightboxBackdropEl_ = 
      document.body.getElementsByClassName('lightbox-backdrop')[0];
    this.lightboxImageEl_ =
      document.body.getElementsByClassName('lightbox-image')[0];
    this.lightboxImageTitleEl_ =
      document.body.getElementsByClassName('lightbox-image-title')[0];
      
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Set up a click on the backdrop to close the lightbox.
    this.lightboxBackdropEl_.addEventListener('click', this.close.bind(this));

    // Set up the next and previous arrow buttons to navigate the lightbox.
    var lightboxNextEl = 
        document.body.getElementsByClassName('lightbox-next')[0];
    lightboxNextEl.addEventListener('click', this.next.bind(this));
    var lightboxPreviousEl = 
        document.body.getElementsByClassName('lightbox-previous')[0];
    lightboxPreviousEl.addEventListener('click', this.previous.bind(this));

    // Set up keystrokes on the page to move the lightbox.
    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  };


  handleKeyDown(e) {
    var keyCode = e.keyCode || e.which,
    key = {esc: 27, left: 37, right: 39};

    switch (keyCode) {
      case key.left:
        this.previous.bind(this).call();
        break;
      case key.right:
        this.next.bind(this).call();
        break;
      case key.esc:
        this.close.bind(this).call();
        break;
    }
  }

  start(imageUrl) {
    // Unhide the lightbox.
    this.lightboxEl_.style.display = '';

    this.currentIndex_ = 
        this.imageDataList_.findIndex((el) => el.url == imageUrl);
    this.displayImage(this.currentIndex_);
  }

  close() {
    // Hide the lightbox.
    this.lightboxEl_.style.display = 'none';
  }

  next() {
    // Advance the lightbox to the next image, unless it is currently on the
    // last image; in that case, jump to the first image.
    this.currentIndex_ =
        (this.currentIndex_ == this.imageDataList_.length - 1)
            ? 0 : ++this.currentIndex_;

    this.displayImage(this.currentIndex_);
  }

  previous() {
    // Advance the lightbox to the previous image, unless it is currently on the
    // first image; in that case, jump to the last image.
    this.currentIndex_ =
        (this.currentIndex_ == 0)
            ? this.imageDataList_.length - 1 : --this.currentIndex_;
    this.displayImage(this.currentIndex_);
  }

  /**
   * Display the image at the given index in the imageDataList_ in the
   * lightbox.
   */
  displayImage(imageIndex) {
    this.lightboxImageEl_.innerHTML = '';
    let img = document.createElement('img');
    let imageData = this.imageDataList_[imageIndex];
    img.src = imageData.url;
    this.lightboxImageEl_.appendChild(img); 

    this.lightboxImageTitleEl_.innerHTML = imageData.title;
  }
}
