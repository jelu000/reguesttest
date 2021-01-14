//Jens Lundevist
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ListaBilbrand extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = {
      //s_bilmarke: this.props.valdbilbrand
      sbrandarray: this.props.bilobjects,
      state_is_showing: false,
      text_to_filter: ""
    }


    this.listaBilmodeller = this.listaBilmodeller.bind(this);
  }

/*
listaBilmodeller - Listar alla bilmodeller för ett bilfabrikat
grafiskt och används tillsammans med map()
*/
  listaBilmodeller(t_modell){

    let listaStyle = {
    margin: 'auto',
    backgroundColor: 'lightblue',
    padding: '10px',
    width: '400px',
    textAlign: 'left',
    fontSize: 'medium'

    };

    return <div key={t_modell.Kod} style={listaStyle}>

            <b>Modell: </b><i>{t_modell.Modell}</i><br />
            <b>Pris: </b><i>{t_modell.Nybilspris}</i><br />
            <b>Bränsle: </b><i>{t_modell.BransleTyp}</i><br />
            <b>Kod: </b><i>{t_modell.Kod}</i>

          </div>
  }

    textFeltChange = (event) => {

    let text_input = event.target.value;
    console.log("Click!" + text_input);
    this.setState({text_to_filter: text_input});

  }

  //showFilter = () => {
    //return <Modellfilter />
  //}


  render() {

    let lista_array="";

    let antal_modeller=<br />;
    let text_felt=<br />
    let t_filtered_array =[];

    //let text_felt_filter;
    //let innerdiv = this.kollaBilmarkeModeller();
      if (this.props.bilobjects.length !== 0){
        let t_array = this.props.bilobjects[0].NybilsprisPerModell;

        //Nytt Filtrera text------------------------------------------------
        //let modell_map_to_filter = this.props.bilobjects[0].NybilsprisPerModell;

        t_filtered_array = t_array.filter(car => {
          return car.Modell[0].toLowerCase().includes(this.state.text_to_filter.toLowerCase())
        });
        //SLUT NYTT--------------------------------------------


      //Gör filtret direkt i denn component!
        text_felt=<form><label>Sök: <input onChange={this.textFeltChange} type="text" id="mtextinput" /></label></form>;

        //-lista_array = t_array.map(this.listaBilmodeller);
        lista_array = t_filtered_array.map(this.listaBilmodeller);

        //skriver ut antal modeller
        //antal_modeller="antal modeller: " +this.props.bilobjects[0].NybilsprisPerModell.length+ "st";
        antal_modeller="antal modeller: " + t_filtered_array.length;
      }

      let headingstyle ={
        margin: '20px',
        fontSize: '1.2em'
      };


    return (
      <div>

        <div style={headingstyle}>
        <b>{this.props.valdbilbrand} </b>
        <i>{antal_modeller}</i>
        { text_felt }
        { /*text_felt_filter*/ }
        </div>

        {lista_array}

      </div>
    )
  }

  //static propTypes = {
    // ...prop type definitions here
  //}

}//end of class

ListaBilbrand.propTypes = {
  bilobjects: PropTypes.array
};
