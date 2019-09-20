import React from 'react';
import withHocs from './MoviesTableHoc';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class MoviesTable extends React.Component {
  state = {
    name: '',
    rename: '',
    renameId:'',
    flagEdit: false
  }

  addNewMovieTitle = () => {
    const { name } = this.state
    this.props.addMovieTitle({name})
    this.setState({name: ''})
  }

  renameMovieTitle = () => {
    const { rename, renameId} = this.state
    this.props.renameMovieTitle({renameId,rename})
    this.setState({rename: '', renameId:''})
    this.closeModal()
  }

  deletMovieTitle = (id) => {
    this.props.deleteMovieTitle({id})
  }

  closeModal = () => {
    const { flagEdit } = this.state;
    this.setState({flagEdit: !flagEdit})
  }

  render() {
    const { flagEdit } = this.state;
    const { data = {}} = this.props;
    const { movies = [] } = data;
    return (
      <React.Fragment>
        <div className="names-ground">
          { 
            movies.map((item, key) => 
              <div key={key}>
                <button className="delet-button" onClick={() => this.deletMovieTitle(item.id)}>X</button>
                <button className="edit-button" onClick={() => this.setState({flagEdit: !flagEdit, renameId: item.id , rename: item.name})}>Edit</button>
                -> {item.name} 
              </div>)
          } 
        </div>
        <div>
          <input
            value={this.state.name}
            onChange={(e) => this.setState({redact: e.target.value})}
            placeholder='Enter a good movie'
          />
          <button  onClick={() => this.addNewMovieTitle()}>Add</button>
        </div>
        <div>
          <Modal
            isOpen={this.state.flagEdit}
            onRequestClose={this.closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <div>
              <span>
                <h2>Rename</h2>
              </span>
              <button className="close-modal-button" onClick={this.closeModal}>X</button>
            </div>
            <input value={this.state.rename} onChange={(e) => this.setState({rename: e.target.value})}></input>
            <button onClick={() => this.renameMovieTitle()}>Rename</button>
          </Modal>
        </div>
      </React.Fragment>
    )  
  };
}

export default withHocs(MoviesTable);
