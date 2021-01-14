/*Jens Lundeqvist
Denn component använd ej
*/
import React from 'react'
//import PropTypes from 'prop-types'


const Modellfilter = (props) => {


  let listBilmodeller = (t_modell) =>{

    let listaStyle = {
    margin: 'auto',
    backgroundColor: 'lightblue',
    padding: '10px',
    width: '400px',
    textAlign: 'left'

    };

    return <div key={t_modell.Kod} style={listaStyle}>

            <b>Modell: </b><i>{t_modell.Modell}</i><br />
            <b>Pris: </b><i>{t_modell.Nybilspris}</i><br />
            <b>Bränsle: </b><i>{t_modell.BransleTyp}</i><br />
            <b>Kod: </b><i>{t_modell.Kod}</i>

          </div>
  }

  let ulLiTag_array = props.brandmodels.map(listBilmodeller);

  let textChange = (event) => {

    let text_input = event.target.value;
    console.log("Click!" + text_input);
    let t_filter_array = props.brandmodels.filter(car => {
      return car.Modell[0].toLowerCase().includes(text_input.toLowerCase())
    });
    console.log("t_filter_array: " + t_filter_array)
    ulLiTag_array = (t_filter_array.map(listBilmodeller));
  }

  console.log(props.brandmodels.length);
  //let lista_bilmodell = this.props.brandmodels

  let form_style = {
    padding: '20px'
  };
  let headingstyle ={
    margin: '20px',
    fontSize: 'medium'
  };

  return (

    <div style={headingstyle}>
      <form style={form_style}>
        <label>
        Sök:
        <input onChange={textChange} type="text" id="modeltextinput" />
        </label>
      </form>

      <ul>
        {ulLiTag_array}
      </ul>

    </div>
  )
}

export default Modellfilter
