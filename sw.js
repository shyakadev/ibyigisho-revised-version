if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js") // Adjust the path if necessary
    .then(registration => {
      console.log("ServiceWorker registered:", registration)
    })
    .catch(error => {
      console.error("Error registering ServiceWorker:", error)
    })
}
