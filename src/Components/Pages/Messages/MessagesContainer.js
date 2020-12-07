import React, { Component } from 'react'
import { connect } from 'react-redux'
import Messages from './Messages'

class MessagesContainer extends Component {
    render() {
        return (
           <Messages />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
