import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setNewMessageThunk } from '../../../Redux/dialogsReducer'
import Messages from './Messages'
import withAuthRedirect from '../../../hoc/withAuthRedirect'
import { AppStateType } from '../../../Redux/redux-store'
import { DialogType } from '../../../Types/types'

type MapStateToPropsType = {
    dialogs: Array<DialogType>
}
type MapDispatchToPropsType = {
    setNewMessageThunk: (newMessage: { message: string }) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

class MessagesContainer extends Component<PropsType> {
    render() {
        return <Messages {...this.props} />
    }
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state: AppStateType) => ({
    dialogs: state.userDialogs.dialogs,
})

//connection to the Redux Store
//applying
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        setNewMessageThunk,
    }),
    withAuthRedirect
)(MessagesContainer)
