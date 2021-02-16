import React, { Component } from 'react'
import { connect } from 'react-redux'
import DialogForm from './DialogForm'
import { setNewMessageThunk } from '../../../../Redux/dialogsReducer';
import { AppStateType } from '../../../../Redux/redux-store';

type MapStateToPropsType = {}
type MapDispatchToPropsType = {}
type OwnProps = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

class DialogFormContainer extends Component<PropsType> {

    render() {
        return (
            <DialogForm {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({});


export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>
(mapStateToProps, { setNewMessageThunk })(
    DialogFormContainer
);
