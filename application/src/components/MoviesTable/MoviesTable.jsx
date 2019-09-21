import React from 'react';
import withHocs from './MoviesTableHoc';
import Modal from 'react-modal';
import Checkbox from 'react-simple-checkbox';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'rgb(173, 43, 43)',
    color                 : '#ffffff'
  }
};



class MoviesTable extends React.Component {
  state = {
    serchName:'',
    isWatched: false,
    renameIsWatched: false,
    name: '',
    rename: '',
    renameId:'',
    flagEdit: false,
    flagAdd: false

  }

  handleSearch = (e) => {
    const { data } = this.props;
    const { serchName } = this.state;
   
    if(e.charCode === 13) {
      data.fetchMore({
        variables: {serchName},
        updateQuery: (previousResult, { fetchMoreResult}) => fetchMoreResult
      })
    }
  }

  addNewMovieTitle = () => {
    const { name, isWatched} = this.state;
    if(name !== "") {
      this.props.addMovieTitle({name,isWatched})
      this.setState({name: '',isWatched: false, flagAdd:false})
      this.closeModal()
    }
  }

  renameMovieTitle = () => {
    const { rename, renameId, renameIsWatched} = this.state
    console.log("renameIsWatched ", renameIsWatched)
    this.props.renameMovieTitle({renameId,rename,renameIsWatched})
    this.setState({rename: '', renameId:''})
    this.closeModal()
  }

  deletMovieTitle = (id) => {
    this.props.deleteMovieTitle({id})
  }

  closeModal = () => {
    const { flagEdit, flagAdd} = this.state;
    this.setState({flagEdit: false , flagAdd: false })
  }

  render() {
    const { flagEdit, renameIsWatched, isWatched ,flagAdd} = this.state;
    const { data = {}} = this.props;
    const { movies = [] } = data;
    return (
      <React.Fragment>
        <div>
          <input placeholder='Search...' onKeyPress={(e) => this.handleSearch(e)} onChange={(e) => this.setState({serchName: e.target.value})}/>
          <button onClick={() => this.setState({flagAdd: !flagAdd})}>Add new movie</button>
        </div>
        <div className="names-ground">
          { 
            movies.map((item, key) => 
              <div className="items" key={key}>
                <button className="delet-button" onClick={() => this.deletMovieTitle(item.id)}>X</button>
                <button className="edit-button" onClick={() => this.setState({flagEdit: !flagEdit, renameId: item.id , rename: item.name , renameIsWatched: item.isWatched })}>Edit</button>
                {item.name} 
                {item.isWatched ? <label className="isWatched-label" > ✓</label> : null}
              </div>)
          } 
        </div>
        
        <div>
          <Modal
            isOpen={flagAdd}
            style={customStyles}
            ariaHideApp={false}
          >
           <div>
              <span>
                <h2>New Movie</h2>
              </span>
              <button className="close-modal-button" onClick={this.closeModal}>X</button>
            </div>
            <div>
              <label>Name</label>
              <input
              value={this.state.name}
              onChange={(e) => this.setState({name: e.target.value})}
              placeholder='Enter a good movie'
              />
            </div>
            <div>
              <label>Is Watched</label>
              <Checkbox size={3} checked={isWatched} onChange={() => this.setState({ isWatched: !isWatched})} />
            </div>
            <button className="modal-footer-button" onClick={() => this.addNewMovieTitle()}>Add</button>
          </Modal>
        </div>

        <div>
          <Modal
            isOpen={flagEdit}
            style={customStyles}
            ariaHideApp={false}
          >
            <div>
              <span>
                <h2>Rename</h2>
              </span>
              <button className="close-modal-button" onClick={this.closeModal}>X</button>
            </div>
            <div className="item-container-modal">
              <div>
                <label>New Name</label>
                <input value={this.state.rename} onChange={(e) => this.setState({rename: e.target.value})}></input>
              </div>
              <div>
              <label>Is Watched</label>
              <Checkbox size={3} checked={renameIsWatched} onChange={() => this.setState({ renameIsWatched: !renameIsWatched})}/>
              </div>
            </div>
            <button className="modal-footer-button"  onClick={() => this.renameMovieTitle()}>Rename</button>
          </Modal>
        </div>
      </React.Fragment>
    )  
  };
}

export default withHocs(MoviesTable);
