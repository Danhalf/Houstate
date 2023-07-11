window.addEventListener("load", () => {
   const map = tt.map({
      key: process.env.API_KEY,
      container: "map-container",
      center: [30.5234, 50.4501],
      zoom: 12,
   })
})