import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setNewMessageThunk } from '../../../Redux/dialogsReducer'
import Messages from './Messages'

class MessagesContainer extends Component {
    render() {
        return (
           <Messages {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    dialogs:state.userDialogs.dialogs
})


export default connect(mapStateToProps, { setNewMessageThunk })(
  MessagesContainer
);
