import React from 'react'
import { connect } from 'react-redux'
import { errorGenerate } from '../../../Redux/appReducer'
import { AppStateType } from '../../../Redux/redux-store'
import NavMenu from './NavMenu'

type MapStateToPropsType = {
    isLogged: boolean
    authId: number | null
}

type MapDispatchToPropsType = {
    errorGenerate: () => void
}

type OwnProps = {}

export type NavMenuContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

const NavMenuContainer: React.FC<NavMenuContainerPropsType> = (props) => {
    return <NavMenu {...props} />
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isLogged: state.auth.isLogged,
        authId: state.auth.id,
    }
}

//connect to the Redux Store
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(
    mapStateToProps,
    { errorGenerate }
)(NavMenuContainer)
