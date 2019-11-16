<template>
  <section>
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <h5>Virtual Kubelet Regions</h5>
      </div>
    </div>
    <div id="content-wrapper">
      <div id="button-wrapper">
        <button class="btn-group" v-on:click="sendWestUS"> West US </button>
        <button class="btn-group" v-on:click="sendEastUS"> East US </button>
        <button class="btn-group" v-on:click="sendAus"> Australia </button>
        <button class="btn-group" v-on:click="sendNorthEU"> North Europe </button>
        <button class="btn-group" v-on:click="sendJapan"> Japan </button>
      </div>
      <div class="map-wrapper">
        <div v-bind:style="{ height: mapHeight + 'px'}">
          <div id='map'></div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  .mapboxgl-popup {
    color: white;
  }
</style>
<script>

  /* eslint-disable */
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  let map
  let vm
  const url = "http://52.224.150.235/regions/";

  export default {
    data() {
      return {
        mapHeight: '100'
      }
    },
    created() {
      this.mapHeight = (window.innerHeight - 240)
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('resize', this.getWindowHeight);
        //Init
        this.getWindowHeight()
      })


      vm = this
      mapboxgl.accessToken =
        'pk.eyJ1Ijoic29ub2pvcmVsIiwiYSI6ImNqaDl1Z25udzAybGMzNnBmbzl4NDBsam0ifQ.itgTNw7IhsoPTwkxiPz7Vw';
      map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/sonojorel/cjhw8422i15g72snx2zsof3s1',
        center: [-79.995888, 40.440624],
        zoom: 2
      })

      map.on('load', function () {
        vm.loadFlights()
      })

      //** show current map center lat lng on page **//
      map.on('moveend', function (e) {
        vm.latitude = map.getCenter().lat
        vm.longitude = map.getCenter().lng
      })

      map.on('click', 'flights2', function (e) {

        var markerHeight = 50, markerRadius = 10, linearOffset = 25;
        var popupOffsets = {
          'top': [0, 0],
          'top-left': [0, 0],
          'top-right': [0, 0],
          'bottom': [0, -markerHeight],
          'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'left': [markerRadius, (markerHeight - markerRadius) * -1],
          'right': [-markerRadius, (markerHeight - markerRadius) * -1]
        };
        //var popup = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
        //  .setLngLat(e.lngLat)
        //  .setHTML("<h1>Hello World!</h1>")
        //  .setMaxWidth("300px")
        //  .addTo(map);

        //map.popup()
        var pinDetail = e.features[0].properties //region, instance count
        var popHtml = document.getElementById('popUpHtml').innerHTML
        popHtml = popHtml.replace('##subtitle##', pinDetail.name).replace('##title##', pinDetail.instanceCount).replace('##info##', "")
        //var detailHtml = popInfo.replace('##name##', pinDetail.instanceCount).replace('##value##', pinDetail.instanceCount + 'INSTANCE COUNT')
        //detailHtml = detailHtml.concat(popInfo.replace('##name##', 'ALTITUDE').replace('##value##', ((Math.round((pinDetail.Altitude * 3.2808)) * 10) / 10).toString() + ' FEET'))
        //detailHtml = detailHtml.concat(popInfo.replace('##name##', 'AIR SPEED').replace('##value##', Math.round(pinDetail.AirSpeed * 3600 / 1610.3).toString() + ' MPH'))
        //popHtml = popHtml.replace('##info##', detailHtml)

        var coordinates = e.features[0].geometry.coordinates.slice()


        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        var popup = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
          .setLngLat(coordinates)
          .setHTML(popHtml)
          .addTo(map)

        document.querySelector("i.closePop").addEventListener("click", () => {
          popup.remove()
        })

        /*
        var popup = new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popHtml)
          .addTo(map)

        document.querySelector("i.closePop").addEventListener("click", () => {
          popup.remove()
        })

        map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 9, speed: 0.75, curve: 1 }) */
      }) 


    },
    methods: {

      sendWestUS: function (event) {
        console.log("sending west us..");
        return axios.put('http://52.224.150.235/regions/westus').catch(function (error) { console.log(error); });

        //let config = {
        //  headers: {
        //    "content-type": "application/json",
        //    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        //  }
        //}
        //config.headers["Access-Control-Allow-Headers"].re

        //let data = {
        //  'HTTP_CONTENT_LANGUAGE': self.language
        //}
        //return axios.put('http://52.224.150.235/regions/westus', data, config).catch(function (error) { console.log(error); });
        
      },

      sendEastUS: function (event) {
        console.log("sending east us..");
        this.loadFlights();
        return axios.put('http://52.224.150.235/regions/eastus').catch(function (error) { console.log(error); });
      },

      sendAus: function (event) {
        console.log("sending australia..");
        return axios.put('http://52.224.150.235/regions/australia').catch(function (error) { console.log(error); });
      },

      sendJapan: function (event) {
        console.log("sending japan..");
        return axios.put('http://52.224.150.235/regions/japan').catch(function (error) { console.log(error); });
      },

      sendNorthEU: function (event) {
        console.log("sending north europe ..");
        return axios.put('http://52.224.150.235/regions/northeurope').catch(function (error) { console.log(error); });
      },

      addLayer(obj) {
        console.log(obj)
        if (!map.getLayer('flights2')) {

          map.addLayer(
            {
              'id': 'flights',
              'type': 'heatmap',
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': obj
                }
              },
              paint: {
                // increase weight as diameter breast height increases
                'heatmap-weight': {
                  property: 'instanceCount',
                  type: 'exponential',
                  stops: [
                    [1, 0],
                    [20, 1]
                  ]
                },
                // increase intensity as zoom level increases
                'heatmap-intensity': {
                  stops: [
                    [11, 1],
                    [15, 3]
                  ]
                },
                // assign color values be applied to points depending on their density
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(236,222,239,0)',
                  0.2, 'rgb(208,209,230)',
                  0.4, 'rgb(166,189,219)',
                  0.6, 'rgb(103,169,207)',
                  0.8, 'rgb(28,144,153)'
                ],
                // increase radius as zoom increases
                'heatmap-radius': {
                  stops: [
                    [11, 15],
                    [15, 20]
                  ]
                },
                // decrease opacity to transition into the circle layer
                'heatmap-opacity': {
                  default: 1,
                  stops: [
                    [14, 1],
                    [15, 0]
                  ]
                },
              }
            }, 'waterway-label');
        }

        if (map.getLayer('flights2')) map.removeLayer('flights2');
        if (map.getSource('flights2')) map.removeSource('flights2');

        map.addLayer(
          {
            'id': 'flights2',
            'type': 'circle',
            'source': {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': obj
              }
            },
            paint: {
              // increase the radius of the circle as the zoom level and dbh value increases
              'circle-radius': {
                property: 'instanceCount',
                type: 'exponential',
                stops: [
                  [{ zoom: 15, value: 1 }, 5],
                  [{ zoom: 15, value: 62 }, 10],
                  [{ zoom: 22, value: 1 }, 20],
                  [{ zoom: 22, value: 62 }, 50],
                ]
              },
              'circle-color': {
                property: 'instanceCount',
                type: 'exponential',
                stops: [
                  [0, 'rgba(236,222,239,0)'],
                  [10, 'rgb(236,222,239)'],
                  [20, 'rgb(208,209,230)'],
                  [30, 'rgb(166,189,219)'],
                  [40, 'rgb(103,169,207)'],
                  [50, 'rgb(28,144,153)'],
                  [60, 'rgb(1,108,89)']
                ]
              },
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              'circle-opacity': {
                stops: [
                  [14, 0],
                  [15, 1]
                ]
              }
            }
          }, 'waterway-label');

 

      },
      loadFlights() {
        let payload

        const myRequest = new Request('/api/flights/current')

        fetch(myRequest)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            vm.addLayer(data)
          })

      },
      getWindowHeight(event) {
        this.mapHeight = (window.innerHeight - 240)
      }
    }
  }
</script>
<style lang='scss'>

  #map-wrapper {
    background-color: blue;
    width: 80%;
  }



  .btn-group {
    color: teal;
    border-color: none;
    font-weight: 500;
    display: block;
    font-size: larger;
  }

  #map {
    width: 100%;
    min-height: 100%;
    height: auto !important; /* cross-browser */
    height: 100%; /* cross-browser */
  }

  .mapboxgl-map {
    font-size: 14px;
    font-family: 'Muli', Arial, sans-serif;
  }

  .mapboxgl-popup {
    min-width: 150px;
  }

  .mapboxgl-popup-content {
    background: #06204d;
    box-shadow: none;
    padding: 8px 2px 0px 2px !important;
    width: 100px;
  }

    .mapboxgl-popup-content * .card {
      background: none !important;
    }

  .card {
    background: none !important;
    box-shadow: none !important;
    margin-bottom: 2px !important;
    color: #8bb837 !important;
  }

    .card .card-body {
      padding: 5px 24px 5px 5px !important;
    }

  h5.card-title {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 22px !important;
    color: #8eb9ee !important;
    font-weight: 700 !important;
    padding: 4px 15px 0px 0px !important;
  }

  ul.list-group {
    background: #FFF !important;
  }

  li.list-group-item {
    padding: 4px 10px !important;
    background: none !important;
    border: none !important;
  }

  .mapboxgl-popup-tip {
    border-bottom-color: #06204d !important;
    border-top-color: #06204d !important;
  }

  .mapboxgl-popup-close-button {
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    border-radius: 0 0 0 0;
    color: #FFF;
    font-size: 18px;
    font-variant: small-caps;
    cursor: pointer;
    background-color: transparent;
  }

  .mapboxgl-popup-close-button {
    display: none;
  }

  .closePop {
    position: absolute;
    font-size: 11px !important;
    top: -6px;
    right: 2px;
    color: #8bb837;
    cursor: pointer;
  }

  .blockquote-footer::before {
    content: '' !important;
  }

  .blockquote-footer {
    margin-bottom: -8px;
    display: block;
    font-size: 9px;
    color: #999;
  }

  .popValue {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 14px;
    font-weight: 700;
  }

  .blockquote-footer.popTitleHead {
    color: #ACACAC;
  }

  .blockquote-footer .popInfoHead {
    color: #555;
    text-transform: uppercase;
    font-size: 9px;
  }
</style>
