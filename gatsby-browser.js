// custom typefaces
import "@fontsource/montserrat/variable.css"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

// Reload on page update
export const onRouteUpdate = () => {
    navigator.serviceWorker.register('sw.js').then((reg) => {
        reg.update()
    })
}

export const onServiceWorkerUpdateReady = () => {
    window.location.reload(true)
}
