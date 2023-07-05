//import LegendStyles from './components/LegendStyle';

const Legend = ({selectedItem}) => {



    return <div style = {{position: 'absolute', bottom: 10, right: 15, height: 210, width: 200, backgroundColor:'white', zIndex: 1}}>
        <p style={{textAlign:'center',fontWeight:'bold', fontSize:18 }}>{selectedItem}</p>
        
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#DDE6ED', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}>0 - 30,000</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#9DB2BF', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> 30,001 - 40,000</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#526D82', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> 40,001 - 60,000</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#27374D', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> 60,001 - 75,000</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#0B2447', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> 75,001 - 100,000</div>
        </div>
    </div>
}

export default Legend;