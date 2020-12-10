import React, { Component } from 'react'
import { connect } from 'react-redux'
import DialogForm from './DialogForm'
import { setNewMessageThunk } from './../../../../Redux/dialogsReducer';

class DialogFormContainer extends Component {

    render() {
        return (
            <DialogForm {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({});


export default connect(mapStateToProps, { setNewMessageThunk })(
  DialogFormContainer
);
