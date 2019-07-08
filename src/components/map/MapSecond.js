import React from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
// import Geocoder from 'geocoder'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'


mapboxgl.accessToken = process.env.MAPBOX


class MapSecond extends React.Component {
  constructor() {
    super()
    this.markers = []
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 10,
      center: [-0.1, 51.5074]
    })

    this.props.markers.map(point => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundImage = 'url(' + point.image + ')'
      // customise markers based on category here

      return new mapboxgl.Marker() // add el inside brackets for custom marker
        .setLngLat({ lat: point.coordinates.lat, lng: point.coordinates.lng })
        .addTo(this.map)

        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <main>

           <h1 class="title is-5">${point.name}</h1>
           
           <h2 class="subtitle is-6">${point.address.buildingNumber}  ${point.address.street}, ${point.address.postcode}</h2>

           <a href=${point.website} class="subtitle is-6 is-link" target="_blank" rel="noopener noreferrer">Go to their website</a>

          <div style="background-image: url('${point.image}'); height: 100px; min-width: 150px; background-repeat: no-repeat; background-size: cover; background-position: center;">


            </main>
          `))
    })
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.on('click', this.handleClick)

  }

  handleClick(e) {
    console.log(e)
    // console.log(e.lngLat.lat, e.lngLat.lng)
  }

  render() {
    return (

      <div className="map" ref={el => this.mapDiv = el}/>

    )
  }
}

export default MapSecond