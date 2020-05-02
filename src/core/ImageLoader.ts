export type ImagesSource = {
    [key: string]: HTMLImageElement,
}

class ImagesLoader {
    private images: ImagesSource = {}
    // contador de images agregadas
    private imagesCountPreLoaded: number = 0
    // contador de imagenes cargadas
    private imagesCountLoaded: number = 0
    // tiempo entre cada llamada que comprueba si las imagenes estan ok
    private intervalMs = 100

    // si ambos contadores coninciden, entonces todas las cargas esta OK
    private isImagesLoaded = () => this.imagesCountLoaded === this.imagesCountPreLoaded

    // al agregar una imagen damos +1 al contador preLoaded
    addImage(key: string, src: string) {
        const img = new Image()
        img.src = src
        this.imagesCountPreLoaded++;
        img.onload = () => {
            // cuando la imagen cargue ok, damos +1 al count loaded
            this.imagesCountLoaded++
        }
        this.images[key] = img
    }

    // calback que se ejecutara cuando todas las imagenes esten cargadas
    onAllLoad(callback: Function) {
        const interval = setInterval(() => {
            if (this.isImagesLoaded()) {
                callback()
                clearInterval(interval)
            }
        }, this.intervalMs)

    }

    getImage = (key: string) => this.images[key]
}

export default ImagesLoader