// subclasses extend this parent Filter class and implement their own specific image filters by overriding the apply() method.
class Filter {
    // The constructor takes an image as an argument
    constructor(img) {
        this.img = img;
    }
    // The apply() method throws an error and should be overridden by subclasses
    apply() {
        throw new Error("This method should be overridden by subclasses.");
    }
}

