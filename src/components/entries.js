import React from 'react';
import axios from 'axios'; 

class Entries extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      entries: [],
      lastWinner: '',
      newEntry: '',
      newRecord: {name: "", code: "", application_type: ""},
      applications: []
    }
  }

  componentDidMount () {
    let self = this;
    axios.get('http://localhost:3001/applications')
      .then(function (response) {
        console.log(response);
        self.setState({applications: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // drawWinner (e) {
  //   let pool = this.state.entries.filter(entry => !entry.winner)

  //   if (pool.length > 0) {
  //     let entry = pool[Math.floor(Math.random()*pool.length)];
  //     let newList = this.state.entries.map( (ent) => {
  //       ent.name === entry.name ? ent.winner = true : ent.winner = ent.winner
  //       return ent;
  //     })
  //     this.setState({entries: newList, lastWinner: entry})

  //     axios.put('http://localhost:4000/entries/' + entry.id, {
  //       winner: true
  //     })
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //   }
  // }

  onNewRecordSubmit(e) {
    let self = this;
    e.preventDefault();
    let formValues = this.state.newRecord;
    console.log("formValues", formValues);
    axios.post("http://localhost:3001/applications", formValues)
    .then (function (response) {
      console.log("response", response);
      let newApplications= self.state.applications.concat(response.data);
      self.setState({applications: newApplications});
    })
    .catch( function (error){
      console.log("error", error);
    });
  }

  // onSubmit (e) {
  //   var self = this;
  //   e.preventDefault();
  //   let val = this.state.newEntry;
  //   if (val.trim() === "") return ;

  //   axios.post('http://localhost:4000/entries', {
  //     name: val,
  //     winner: false
  //   })
  //   .then(function (response) {
  //     let newList = self.state.entries.concat(response.data);
  //     self.setState({entries: newList, newEntry: ''});
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  // onNewEntry (e) {
  //   this.setState({newEntry: e.target.value})
  // }

  onNewRecord (e) {
    let newRecord = this.state.newRecord;

    newRecord[e.target.name] = e.target.value;
    this.setState({newRecord: newRecord});
  }

  render () {
    return (
      <div className='container'>
         {/*
        <button onClick={this.drawWinner.bind(this)}>Draw winner</button>
        */}
        
        <form onSubmit={this.onNewRecordSubmit.bind(this)}>
          <label> Application Name: </label>
          <input name="name" type='text' value={this.state.newRecord.name} onChange={this.onNewRecord.bind(this)}/>


          <label> Application Code: </label>
          <input name="code" type='text' value={this.state.newRecord.code} onChange={this.onNewRecord.bind(this)}/>
          
          <label> Application Type: </label>
          <input name="application_type" type='text' value={this.state.newRecord.type} onChange={this.onNewRecord.bind(this)}/>

          <br/>
          <input type="submit" value="Add" />
        </form>

        <ul>
          {this.state.applications.map((entry) => 
            <li key={entry.id}> 
            <span>{entry.name}</span>
            <span>{entry.code}</span>
            <span> {entry.application_type}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Entries;