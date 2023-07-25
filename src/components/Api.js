import React, {useEffect, useState, createContext} from 'react';
import axios from 'axios';
//import {parse } from '@turf/turf';
import { parse } from 'wellknown';
//import { GeoJSONValidator } from 'geojson-validation';
import geojsonValidation from 'geojson-validation';


//const GeojsonContext = createContext(); 

const Api= () =>
{
    const [wkt, setWkt] = useState('');
    const [geojson, setGeojson] = useState({
        type: "FeatureCollection",
        features: []
    });


    useEffect( () => {
        axios.get('http://localhost:5000/api?p=Population').then(response =>
         {console.log(response.data)
            setWkt(response.data)
        }
         )
    //setData(response.data).catch((error) => console.error('Error fetching data: ', error));
    .catch((error) => console.error('Error fetching WKT data:', error));
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
                // let feature = parse(wkt[i].geom)          

                features.push(feature)  
        }

        setGeojson({
            type: 'FeatureCollection',
            features: features
        })

    }, [wkt])


    useEffect(() => {
        console.log('out geojson', JSON.stringify(geojson))
    }, [geojson])

    // return (  <GeojsonContext.Provider value={geojson}>
    //     {children}
    //   </GeojsonContext.Provider>


    useEffect(() => 
    {
        
        let validationMessage;
      
        try {
          validationMessage = geojsonValidation.valid(geojson)
            ? 'Valid GeoJSON'
            : 'Invalid GeoJSON';
        } catch (error) {
          validationMessage = 'Invalid JSON format';
        }
        console.log('GeoJSON Validation here -> ',validationMessage);
    }, [geojson]); 
        
      


   


    return (
        <div> 
             <p id="validationResult"></p>
        </div>
    )
{/* 
    <ul>
        {wkt.map((result) => (
            <li> {result.gid},  {result.param} </li>
          ))}
    </ul>
    <ul>
        <h1> Geojson:</h1>
        {geojson}
    </ul> */}
}; 

export default Api;  