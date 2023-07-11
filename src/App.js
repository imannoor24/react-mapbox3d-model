import React, {useState} from 'react';
import Map, {Source, Layer, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import layer from './data/pakstats.geojson' ;
import pdata from './data/points.geojson';
//import LegendControl from 'mapboxgl-legend';
import 'mapboxgl-legend/dist/style.css'
import Legend from './components/Legend';
import Toggle from './components/toggle';
import LayerStyles from './data/LayerStyles';
import mapboxgl from 'mapbox-gl';


  // eslint-disable-next-line import/no-webpack-loader-syntax
  mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function App() {

  //const [geoJSONData, setGeoJSONData] = useState(null);
  let geoJSONData = layer; 
  let labelsData= pdata;




  const [selectedItem, setSelectedItem] = useState('Population')



  return (<div style={{backgroundColor:'#EEEEEE', width:'100vw', height:'100vh', position:'fixed',top: 0, left: 0}} >
    <div style={{height:20, position: 'absolute', zIndex: 10, backgroundColor: 'white'}}>
     <h2 style={{textAlign: 'center', backgroundColor: 'white'}}>3D Extrusion based on Provincial Statistics</h2>
    </div>
    <Toggle setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
    <Legend selectedItem={selectedItem}/>
    
    
     <Map
    mapboxAccessToken='pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA'
        initialViewState={{
            longitude:69.3451,
            latitude:30.3753,
            zoom:4.8,
            pitch: 40
        }}
       //style={{width: 1525, height:650 }}
       style={{width:'100%', height:'100%'}}
        mapStyle="mapbox://styles/mapbox/light-v11"
    >


        
    {geoJSONData && (
        <Source type="geojson" data={geoJSONData}>
          <Layer
            id="my-geojson-layer1"
            type="fill-extrusion"
            paint={{

              'fill-extrusion-color': 
              [
                'match',
                ['get', 'NAME_1'],
                'Punjab', '#AAC8A7',
                'Sind',  '#F1F7B5',
                'Baluchistan', '#93BFCF',
                'F.A.T.A.', '#E97777',
                'N.W.F.P.', '#ACB1D6',
                'Northern Areas', '#D4FAFC',
                'F.C.T.', '#576F72',
                'Azad Kashmir', '#EDC6B1',
                'rgba(255,255,255,0)'
              ]
              
              ,
            'fill-extrusion-height': {
                 // ['get', 'Population'],
                 'property': selectedItem,
                 'stops': LayerStyles.heights[selectedItem]
            },
              'fill-extrusion-opacity': 1,
            //   'fill-extrusion-height-transition':{
            //     duration: 2000,
            //     delay: 0
            // },
            }}
          />
        
        </Source>
      )}

        <Source id="src-labels" type="geojson" data={labelsData}>
       
          <Layer
            id="label1"
            type="symbol"
            layout={{
              "text-field": ["get", "NAME_1"],
              "text-size": 14, 
              "text-justify": 'right',
              "text-offset": [0, 0],
              "text-ignore-placement": true,
              //"symbol-sort-key":1
            }}
            paint={{
              "text-color": "white",
              "text-halo-color": "rgba(0,0,0,0.9)",
              "text-halo-width": 3,
            }}
          />

<Layer
            id="label2"
            type="symbol"
            layout={{
              "text-field": ["get", selectedItem],
              "text-size": 14, 
              "text-justify": 'left',
              "text-offset": [0, 1],
              "text-ignore-placement": true,
             // "symbol-sort-key":5
            }}
            paint={{
              "text-color": "white",
              "text-halo-color": "rgba(0,0,0,0.9)",
              "text-halo-width": 3,
            }}
          />
          
        </Source>



{/*
      {geoJSONData && (
              <Source type="geojson" data={geoJSONData}>
                <Layer
                  id="my-geojson-layer2"
                  type="fill-extrusion"
                  paint={{

                    'fill-extrusion-color': [
                      'interpolate',
                      ['linear'],
                      ['get', 'Hospitals'],
                      5, '#DDE6ED',
                      50, '#9DB2BF',
                      65, '#526D82',
                      200, '#27374D',
                      400, '#0B2447'
                    ],
                  'fill-extrusion-height': {
                      'property': 'Hospitals',
                      'stops': [
                      [5, 20000],
                      [50,75000],
                      [65,90000],
                      [200, 120000],
                      [350, 250000]]
                  },
                    'fill-extrusion-opacity': 0.9,
                  }}
                />
              
              </Source>
            )}
                */}


      <NavigationControl />
    </Map> 
</div>);
}

export default App;
