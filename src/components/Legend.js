//import LegendStyles from './components/LegendStyle';
import Names from "./NamingConv";
const Legend = ({selectedItem}) => {

    // labels= Names.names[selectedItem];

    return <div style = {{position: 'absolute', bottom: 10, right: 15, height: 250, width: 200, backgroundColor:'white', zIndex: 1}}>
        <p style={{textAlign:'center',fontWeight:'bold', fontSize:18 }}>{Names[selectedItem]}</p>
        
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#AAC8A7', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}>Punjab</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#F1F7B5', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> Sindh</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#93BFCF', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> Baluchistan</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#576F72', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> Islamabad</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#ACB1D6', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> KPK</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#D4FAFC', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> Gilgit-Baltistan</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#E97777', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> FATA</div>
        </div>
        <div className='flex-container' style={{display:'flex', justifyContent:'space-evenly'}}>
            <div style={{flex:0.5, backgroundColor:'#EDC6B1', marginLeft:10, marginBottom:3, padding:10}}></div>
            <div style={{flex:2, marginLeft:15}}> Azad Kashmir</div>
        </div>
    </div>
}

export default Legend;