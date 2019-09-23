import React, { Component } from 'react';
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
    backgroundColor       : 'rgb(84, 126, 162)',
    color                 : '#ffffff'
  }
};

export default class ModalComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: this.props.name,
        isWatched: this.props.isWatched,
        nameId: this.props.nameId,
        flag: this.props.flag,
      }
  }

  componentWillReceiveProps(newProps) {
      if(newProps !== this.props) {
        this.setState({
            flag: newProps.flag,
            nameId: newProps.nameId,
            isWatched: newProps.isWatched,
            name: newProps.name
        })
      }
  }

  renameMovieTitle = () => {
    const { name, nameId, isWatched} = this.state
    this.props.renameMovieTitle({nameId,name,isWatched})
    this.setState({name: '', nameId:''})
    this.props.closeModal()
  }

  addNewMovieTitle = () => {
    const { name, isWatched } = this.state;
    if(name !== "") {
      this.props.addMovieTitle({name,isWatched})
      this.setState({name: '',isWatched: false})
      this.props.closeModal()
    }
  }

  render() {
      const { isWatched, flag } = this.state;
      const { closeModal, titleModal, renameMovieTitle } = this.props;
      return(
        <div>
           <Modal
            isOpen={flag}
            style={customStyles}
            ariaHideApp={false}>
                <div>
                    <span>
                        <h2>{titleModal}</h2>
                    </span>
                    <button className="close-modal-button" onClick={closeModal}>X</button>
                </div>

                <div className="item-container-modal">
                    <div>
                        <label>New Name</label>
                        <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}></input>
                    </div>
                    <div>
                        <label>Is Watched</label>
                        <Checkbox size={3} checked={isWatched} onChange={() => this.setState({ isWatched: !isWatched})}/>
                    </div>
                </div>

                <button className="modal-footer-button" onClick={() => renameMovieTitle !== undefined ? this.renameMovieTitle() : this.addNewMovieTitle() }>{titleModal}</button>

            </Modal> 
        </div>   
    );
  }
}
