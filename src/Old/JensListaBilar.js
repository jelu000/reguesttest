import React, { Component } from 'react'
import axios from 'axios'
//Testar denna guide
//https://www.pluralsight.com/guides/how-to-display-xml-data-using-reactjs
//Funkade EJ på skatteverkets xml fil frmodligen pga mellanslag på modeller som ex Alfa Romeo

//OBS Använder XML Datan direkt och tolkar taggar med innerHtml

class JensListaBilar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      bilar: ""
    };

  }
  //https://jsonplaceholder.typicode.com/posts
//https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99
//https://skatteverket.entryscape.net/store/9/resource/1105
  componentDidMount(){
    //console.log("MOUNTAR!");
    var self = this;

    axios.get("https://skatteverket.entryscape.net/store/9/resource/1105", {
		"Content-Type": "application/xml; charset=utf-8"
	 })
      .then(response=>{
        //console.log(response);

        this.setState({ bilar : response.data });
        self.setState({selfbilar : response.data});//Sammasak som att sätta state i constructor


        let parser = new DOMParser();
        var xmldoc = parser.parseFromString(response.data, "text/xml");


        //Första bilmärket i samlingen
        //console.log(xmldoc.getElementsByTagName('Marke')[0].innerHTML);

        //samma element i herarkin men anropar med child
        //let tBil = xmldoc.getElementsByTagName('Personbil')[0].childNodes[1];
        //console.log(tBil.innerHTML);
        //Visar bara ett object
        //console.log(xmldoc.getElementsByTagName('Marke').length);

        //Prövar att printa ut alla bilar
        let bilfabrikat = xmldoc.getElementsByTagName('Marke');
        this.setState({ posts: bilfabrikat});

        //Skapar en array med printade bilarna
        let temparray=[];

        for (var i = 0; i < bilfabrikat.length; i++) {
          //console.log(bilfabrikat[i].innerHTML); //Skriver ut alla Bilmärken
          temparray[i]=bilfabrikat[i].innerHTML;
        }

        //Lägger till de till state arrayen posts
        this.setState({posts: temparray});
        //console.log("Post nr 3: " + this.state.posts[3]);


      })
      .catch(error=>{
        console.log(error);
      })
  }
//  {tvec_cars.map(column => <th>{column.data}</th>)}
//  <td>{tvec_cars.map(column => <th>{column.data}</th>)}</td>
  skapaTabell = () => {
    let tvec_cars = [];
    tvec_cars = this.state.posts;
    return (
      //<table>
      //<tbody>
        //<tr>
        tvec_cars.map(lista => <li>{lista}</li>)

        //</tr>
      //</tbody>
      //</table>
    );
  }

  listaBilar = () => {
    let tvec_cars = [];
    tvec_cars = this.state.posts;
    //let t_return = "";
    let t_items = [];

    for (var i = 0; i < tvec_cars.length; i++){
        t_items.push(<li>{tvec_cars[i]}</li>);
    }

    return t_items;

  }

  // items = this.state.posts.map((item) =><li>item</li>);




/*  Parse XML using ReactJs
			{(authors && authors.length > 0) &&
			authors.map((item) => {
				return (
					<span>{item.FirstName}</span>
				)
			})

------
{(bilsamling && bilsamling.length > 0) &&
bilsamling.map((item) => {
   return (
     <span>{bilsamling.length}</span>
   )
 })

}

		}
    */
    //xml.querySelector('ST_TIMERANGE').getAttribute('Weeks') item.Marke

    //ska vara under render! const {bilsamling} = this.state
  render() {

    return (
      <div>
        <h3>Lista med poster:</h3>



      </div>
    );
  }
}

export default JensListaBilar
