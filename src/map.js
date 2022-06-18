import L from 'leaflet'

 import 'leaflet/dist/leaflet.css'

export class Map {
  constructor(lng, lat,name) {
    this.lng = lng;
    this.lat = lat;
    this.name = name;
  }

  render() {

    const div = document.createElement('div')
    div.style.width = '100%'
    div.style.height = '200px'

    setTimeout(() => {
        const map = L.map(div).setView([this.lat, this.lng], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([this.lat, this.lng], { opacity: 0 })
            .addTo(map)
            .bindPopup(this.name)
            .openPopup();
    })

    return div

}

}
