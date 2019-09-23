import React from 'react';
import withHocs from './MoviesTableHoc';
import ModalComponent from '../ModalWindow/modalWindow'



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

  deletMovieTitle = (id) => {
    this.props.deleteMovieTitle({id})
  }

  closeModal = () => {
    this.setState({flagEdit: false , flagAdd: false })
  }

  render() {
    const { flagEdit, renameIsWatched, isWatched ,flagAdd, renameId , rename, name} = this.state;
    const { data = {}, renameMovieTitle, addMovieTitle} = this.props;
    const { movies = [] } = data;
    const propsByModal = flagEdit ? {
      renameMovieTitle: renameMovieTitle,
      name: rename,
      isWatched: renameIsWatched,
      nameId: renameId,
      flag: flagEdit,
      titleModal: 'Change',
      closeModal: () => this.closeModal()
    }:{
      name: name,
      isWatched: isWatched,
      addMovieTitle: addMovieTitle,
      flag: flagAdd,
      titleModal: 'Create',
      closeModal: () => this.closeModal()
    }
   
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

        <ModalComponent {...propsByModal}/>

      </React.Fragment>
    )  
  };
}

export default withHocs(MoviesTable);
