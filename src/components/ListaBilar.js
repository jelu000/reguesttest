//Jens Lundeqvist
import React, { Component } from 'react'
import axios from 'axios'
import xml2js from 'xml2js'
import ListBilbrand from './ListaBilbrand'
import './ListaBilarTemplate.css'

//Använder xml2js för att convertera xml data till javascript object - vilket verkar vara bättre metod

class ListaBilar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nybilspriser: Object,
      s_allabilar: [],
      s_vald_bil_brand: "",
      s_bilarmarke:[]
    }

    //Måste binda events i react om man ej använder arrowfucktions
     this.clickValdBil = this.clickValdBil.bind(this);
  }

  componentDidMount(){

    let parser = new xml2js.Parser();


    axios.get("https://skatteverket.entryscape.net/store/9/resource/1105", {
    "Content-Type": "application/xml; charset=utf-8"
   })
      .then(response=>{

      //Gör om XML till JSON
      parser.parseString(response.data, (err, result) => {
        //console.log(result);

      //Sätter State: nybilspriser till JSON resultat
      this.setState({ nybilspriser: result});
      //flyttar resultat ner och konverterar till json
      //let t_json_result = JSON.stringify(result);
      //this.setState({ nybilspriser: t_json_result });
      });

      //Denna funktion gör allt som står under den som är bortkommenterat med //-, som var inlärningssyfte
      this.setStateAllaBilar()

      //Tilldelar t_bilar till stata nybilspriser ovan
      //-let t_bilar = this.state.nybilspriser;

      //Testar att skriva ut resultatet som sträng, som kan skickas till serever
      //console.log("bilmärke 4: " + JSON.stringify(t_bilar.Nybilspriser.Personbil[4]));
      //console.log("bilmärke 4: " + JSON.stringify(t_bilar.Nybilspriser.Personbil.length));
      //console.log("bilmärke 4: " + JSON.stringify(t_bilar.Nybilspriser.Personbil));

      //Testar att skriva ut som javascript objekt - Funkar! :)
      //console.log(t_bilar.Nybilspriser.Personbil);

      //Skapar en array med bilar
      //-let array_bilbrands = [];
      //Testar att bara skriva ut bilmärken
        //-for (let i=0; i<t_bilar.Nybilspriser.Personbil.length; i++){
          //console.log(t_bilar.Nybilspriser.Personbil[i]);
          //console.log(t_bilar.Nybilspriser.Personbil[i].Marke[0]);// Skriver ut Bilmarken
          //-array_bilbrands.push(t_bilar.Nybilspriser.Personbil[i].Marke[0]);
        //-}

        //DEN HÄR FUNKTIONEN SKRIVER UT ALLA BILAR I ARRAYEN
        /*array_bilbrands.map((brand) =>
        {
          console.log(brand);
        });*/

        //sätter alla bilar i den nyskapade arrayen till state arrayen array_bilbrands
        //-this.setState( {s_allabilar: array_bilbrands} );

      })
      .catch(error=>{
        console.log(error);
      })
  }
  /*setStateAllaBilar()
  Fyller alla bilar från json response från servern till en array med bara bilmarken
  */

  setStateAllaBilar(){
    let t_bilar_response = this.state.nybilspriser;
    let array_bilbrands = [];
    //Testar att bara skriva ut bilmärken
      for (let i=0; i<t_bilar_response.Nybilspriser.Personbil.length; i++){
        //console.log(t_bilar.Nybilspriser.Personbil[i]);
        //console.log(t_bilar.Nybilspriser.Personbil[i].Marke[0]);// Skriver ut Bilmarken
        array_bilbrands.push(t_bilar_response.Nybilspriser.Personbil[i].Marke[0]);
      }
    this.setState( {s_allabilar: array_bilbrands} );
  }

  findBrand(tbrand){
      let tbilar = this.state.nybilspriser.Nybilspriser.Personbil;
      //this.state.nybilspriser.Nybilspriser.Personbil.filter

      let tarraymodeller = tbilar.filter(modeller => modeller.Marke.toString() === tbrand.toString())
      return tarraymodeller;
  }


  selectListaMedBilmarken(){

    let selectStyle = {
    padding: '0px',
    textAlign: 'left',
    display: 'block',
    margin: '20px'
    };

    let t_lista = this.state.s_allabilar;

    return (
      <div style={ selectStyle }>
      <b>Välj fabrikat:</b><br />
      <select id="cars" key="cars" name="cars" size="1" onChange={this.clickValdBil}>
        {t_lista.map(bilbrand => (
            <option value={bilbrand} id={bilbrand} key={bilbrand}>{bilbrand}</option>
        ))}
      </select>
      </div>
    );
  }


  clickValdBil(e) {
    //Kan använda andra attribut som value: ex let knappnum =+ event.target.value;
     //let knappnum_string = event.target.name.toString();// för välja rätt knapp

    //console.log("Vald bil: " + e.target.textContent );
    console.log("Vald bil: " + e.target.value );

    //this.setState( {s_vald_bil_brand: e.target.textContent } );
    this.setState( {s_vald_bil_brand: e.target.value } );

    //let tvaldbil = e.target.textContent;
    let tvaldbil = e.target.value;

    let thittademodeller = this.findBrand(tvaldbil);
    //console.log("bilmodeller: " +thittademodeller);

    //this.setState({ nybilspriser: result});
    this.setState( {s_bilarmarke: thittademodeller} );
  }


  render() {

    let divStyle = {
    backgroundColor: 'white'
    };

    let pStyle = {
    backgroundColor: 'white',
    paddingLeft: '20px',
    width: '290px',
    textAlign: 'left'

    };

    let header2 = {
      backgroundColor: 'lightblue',
      padding: '30px',
      fontWeight: 'bold',
      textAlign: 'left'

    };


    return (
      <div style={divStyle}>

        <div className="header">
          <h3 style={header2}><u>.:Skatteverket & bilförmån:.</u></h3>
        </div>

        <div className="column">
          <p style={pStyle}>
            En tjänstebil är en förmån och ska därför beskattas
          </p>

          <p style={pStyle}>
          Här kan man lista och söka kod för olika bilmodeller i skattevekets databas för bilförmån.
          </p>

          <p style={pStyle}>
          Koden används sedan tillsamman med bilens årliga skattesats som finns att hämta hos Transportstyrelsen med hjälp av bilens reg-nummer.
          </p>

          <p style={pStyle}>
          Detta används för att beräkna skatten för bilförmån.
          Skatten dras sedan från inkomsten.
          </p>

          { this.selectListaMedBilmarken() }

          <p style={pStyle}>Mer information finns här:
              <br />
			         <a href="https://www.skatteverket.se/privat/skatter/bilochtrafik" target="_self" title="https://www.skatteverket.se/privat/skatter/bilochtrafik">Skatteverket</a>
               <br />
               Eller här:
               <br />
			         <a href="https://www.skatteverket.se/privat/skatter/arbeteochinkomst/formaner/bilforman/bilformansberakning.4.3f4496fd14864cc5ac9539d.html" target="_self" title="https://www.skatteverket.se/privat/skatter/arbeteochinkomst/formaner/bilforman/bilformansberakning.4.3f4496fd14864cc5ac9539d.html">Skatteverket bilförmån</a>
               <br /><br />
               <a href="http://salongnobless.se/bokforing/" target="_self" title="till bokföring & info">&copy;Jens Lundeqvist</a>
          </p>

        </div>

        <div className="column">
          <ListBilbrand bilobjects={ this.state.s_bilarmarke } valdbilbrand={ this.state.s_vald_bil_brand} />
        </div>

        <div className="column"></div>

    </div>

    )
  }
}

export default ListaBilar
