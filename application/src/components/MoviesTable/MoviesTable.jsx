import React from 'react';
import withHocs from './MoviesTableHoc';


class MoviesTable extends React.Component {
  state = {
    name: '',
    rename: '',
    renameId:'',
    flagEdit: false
  }

  addNewDog = () => {
    const { name } = this.state
    this.props.addDog({name})
    this.setState({name: ''})
  }

  renameDog = () => {
    const { rename, renameId} = this.state
    this.props.renameDog({renameId,rename})
    this.setState({rename: '', renameId:''})
  }

  deletDog = (id) => {
    console.log()
    this.props.deleteDog({id})
  }

  render() {
    const { flagEdit } = this.state;
    const { data } = this.props;
    console.log("data ", this.props)
    return (
      <div>
        <div className="names-ground">
          {   
          data.dog !== undefined ?
          data.dog.map((item, key) => <div key={key}><button className="deletButton" onClick={() => this.deletDog(item.id)}>X</button><button className="editButton" onClick={() => this.setState({flagEdit: !this.state.flagEdit, renameId: item.id})}>Edit</button> - {item.name} </div> )
          :null
          } 
        </div>
        {flagEdit !== false ? <div>
          <input value={this.state.rename} onChange={(e) => this.setState({rename: e.target.value})} placeholder="rename"></input>
          <button  onClick={() => this.renameDog()}>rename</button>
        </div> : null}
        <div>
          <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder="Enter dog name"></input>
          <button  onClick={() => this.addNewDog()}>Add</button>
        </div>
      </div>
    )  
  };
}

export default withHocs(MoviesTable);
