const Toggle = ({setSelectedItem, selectedItem}) =>
{
    
    return (
        <div style={{position:'absolute', bottom:260, right:15, backgroundColor:'white', height:210, width: 200, zIndex:1}}>
            <p style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Statistical Parameters</p>

            <div className="radio">
                <div>
                <label>
                    <input checked={selectedItem ==='Population' && true} type='radio' name='stat' label='Population' value='Population' onClick={() => setSelectedItem('Population')}    />
                    Population
                </label>
                {/* {
                    selectedItem === 'Population' &&
                    <label>1234123543</label>
                } */}
                
                </div>
                <div>
                <label>
                    <input type='radio' name='stat' label='Hospitals' value='Hospitals'  onClick={() => setSelectedItem('Hospitals')}/>
                    Hospitals
                </label>
             
                </div>
                <div>
                <label>
                    <input type='radio' name='stat' label='Internet' value='Internet'  onClick={() => setSelectedItem('Internet')} />
                    Internet
                </label>
                </div>
                <div>
                <label>
                    <input type='radio' name='stat' label='OwnedHouse' value='OwnedHouse'  onClick={() => setSelectedItem('OwnedHouse')} />
                    Owned Housing Unit
                </label>
                </div>
                <div>
                <label>
                    <input type='radio' name='stat' label='AvgFam' value='AvgFam'  onClick={() => setSelectedItem('AvgFam')} />
                    Average Household Size
                </label>
                </div>
                <div>
                <label>
                    <input type='radio' name='stat' label='AvgIncome' value='AvgIncome'  onClick={() => setSelectedItem('AvgIncome')} />
                    Average Income
                </label>
                </div>
                <div>
                <label>
                    <input type='radio' name='stat' label='Literacy' value='Literacy'  onClick={() => setSelectedItem('Literacy')} />
                    Literacy Rate
                </label>
                </div>

            </div>

        </div>
    );
}

export default Toggle;