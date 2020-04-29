export type ImagesObj = {
    [key: string]: HTMLImageElement,
}

class ImagesLoader {
    images: ImagesObj = {}
    imagesCountPreLoaded: number = 0
    imagesCountLoaded: number = 0

    addImage(key: string, src: string) {
        const img = new Image()
        img.src = src
        this.imagesCountPreLoaded++;
        img.onload = () => {
            this.imagesCountLoaded++
        }
        this.images[key] = img
    }

    isImagesLoaded() {
        return this.imagesCountLoaded === this.imagesCountPreLoaded
    }

    onAllLoad(callback: Function) {
        const i = setInterval(() => {
            if (this.isImagesLoaded()) {
                callback()
                clearInterval(i)
            }
        }, 100)

    }

    getImage(key: string) {
        return this.images[key]
    }
}

export default ImagesLoader