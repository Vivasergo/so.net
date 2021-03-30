import React, { Component } from 'react'
import { connect } from 'react-redux'
import DialogForm from './DialogForm'
import { setNewMessageThunk } from '../../../../Redux/dialogsReducer';
import { AppStateType } from '../../../../Redux/redux-store';


type MapDispatchToPropsType = {
    setNewMessageThunk: (message: { message: string })=>void
}

type PropsType = MapDispatchToPropsType 

class DialogFormContainer extends Component<PropsType> {

    render() {
        return (
            <DialogForm {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({});

export default connect<{}, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, { setNewMessageThunk })(DialogFormContainer);
