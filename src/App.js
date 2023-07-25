import React, {useState, useEffect} from 'react';
import Map, {Source, Layer, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pdata from './data/points';
//import LegendControl from 'mapboxgl-legend';
import 'mapboxgl-legend/dist/style.css'
import Legend from './components/Legend';
import Toggle from './components/toggle';
import LayerStyles from './data/LayerStyles';
import mapboxgl from 'mapbox-gl';
import geojsonValidation from 'geojson-validation';
import axios from 'axios';
import { parse } from 'wellknown';
import redp from './data/red.png';
import greenp from './data/green.png';
import bluep from './data/blue.png';




// eslint-disable-next-line import/no-webpack-loader-syntax
  mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function App() {

  const [selectedItem, setSelectedItem] = useState('Population')
  // const[eduItem, setEduItem] = useState('School')

  const [wkt, setWkt] = useState('');
  const [geojson, setGeojson] = useState({
      type: "FeatureCollection",
      features: []
  });

  const [ewkt, setEwkt] = useState('');
  const [egeojson, setEgeojson] = useState ({
    type: "FeatureCollection",
    features:[]
  });

  useEffect( () => {
    axios.get(`http://localhost:5000/api?p=${selectedItem}`).then(response =>
     {console.log(response.data)
        setWkt(response.data)
    }
     )
   //  setData(response.data).catch((error) => console.error('Error fetching data: ', error));
    .catch((error) => console.error('Error fetching WKT data:', error));
}, [selectedItem]);

useEffect(() => {
  axios.get(`http://localhost:5001/edudata`).then(response =>
    {
      console.log(response.data)
      setEwkt(response.data)
    }
  )
  .catch((error) => console.error('Error fetching EWKT data:', error));
}, []); 

useEffect ( () => {

  console.log('wkt', wkt)
  let features = []
  for (let i=0; i< wkt.length; i++){

          const  feature = {
              type: "Feature",
              geometry: parse(wkt[i].geom),
              properties: {
                  gid: wkt[i].gid,
                  name_0 : wkt[i].name_0,
                  name_1: wkt[i].name_1,
                  param: wkt[i].param,
                  value: wkt[i].value,
                  stops:wkt[i].stops
              }
          }
                    

          features.push(feature)  
  }

  setGeojson({
      type: 'FeatureCollection',
      features: features
  })

}, [wkt])


useEffect(() => {
  let features = []
  for (let i=0; i< ewkt.length; i++){

          const  feature = {
              type: "Feature",
              geometry: parse(ewkt[i].geom),
              properties: {
                  ogc_fid: ewkt[i].ogc_fid,
                  osm_id : ewkt[i].osm_id,
                  name : ewkt[i].name,
                  type: ewkt[i].type
              }
          }
      
          features.push(feature)  
  }

  setEgeojson({
      type: 'FeatureCollection',
      features: features
  })

}, [ewkt]);


useEffect(() => {
  console.log('out geojson', JSON.stringify(geojson))
}, [geojson]);

useEffect(() => {
  console.log('out geojson for point data ', JSON.stringify(egeojson))
}, [egeojson]);


useEffect(() => 
{
  
  let validationMessage;

  try {
    validationMessage = geojsonValidation.valid(egeojson)
      ? 'Valid GeoJSON'
      : 'Invalid GeoJSON';
  } catch (error) {
    validationMessage = 'Invalid JSON format';
  }
  console.log('GeoJSON Validation here -> ',validationMessage);
}, [egeojson]); 


 
  let geoJSONData = geojson; 
  let labelsData= pdata;
  let edata =egeojson;
  
  return ( <div style={{backgroundColor:'#EEEEEE', width:'100vw', height:'100vh', position:'fixed',top: 0, left: 0}} >
    <div style={{height:20, position: 'absolute', zIndex: 10, backgroundColor: 'white'}}>
     <h2 style={{textAlign: 'center', backgroundColor: 'white'}}>3D Extrusion based on Provincial Statistics</h2>
    </div>
    <Toggle setSelectedItem={setSelectedItem} selectedItem={selectedItem} geoJSONData={geoJSONData}/>
    <Legend selectedItem={selectedItem}/>
    
     <Map
    mapboxAccessToken='pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA'
        initialViewState={{
            longitude:69.3451,
            latitude:30.3753,
            zoom:4.8,
            pitch: 40
        }}
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
                ['get', 'name_1'],
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
                 'property': "value",
                 'stops': LayerStyles.heights[selectedItem]
                // 'property':[geoJSONData.features[0].properties.param],
                // 'stops': [geoJSONData.features[0].properties.value, geoJSONData.features[0].properties.stops]

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
              "symbol-sort-key":1
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
              "symbol-sort-key":5
            }}
            paint={{
              "text-color": "white",
              "text-halo-color": "rgba(0,0,0,0.9)",
              "text-halo-width": 3,
            }}
          />
           </Source>

          <Source id="edudata" type="geojson" data={edata}>
            <Layer
            
                id="education"
                type="circle"
                // layout={{
                //   'icon-image' : redp,
                //   'icon-size': 1,
                //   'icon-allow-overlap': true

                // }}
                paint = {{
                  'circle-radius':2,
                  'circle-color': 'blue'
                }}
            />
          </Source>

      <NavigationControl />
    </Map> 
</div>);
};

export default App;
