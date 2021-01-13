import React, {Component} from "react";
import LongPressable from "react-longpressable";

//functionality for status edition
//dobleClick on status (span) -> activateEditMode - input field with current status ->
//onBlur or Enter key press -> disactivateEditMode -> calling updateStatus thunk to send data to server
//and dispatch new data to the Redux Store

export default class ProfileStatus extends Component {
    state = {
        editMode: false,
        statusToChange: this.props.status,
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };
    disactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.statusToChange);
    };

    handleInputStatusChange = (e) => {
        this.setState({
            statusToChange: e.target.value,
        });
    };

    //to sync local state status to props status after component rerender
    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({statusToChange: this.props.status});
        }
    };

    render() {

        return (
            <div>
                <div className="profile-container__status">
                    <h5>
                        Current status:
                    </h5>
                    {this.state.editMode ? (
                        <input
                            onKeyPress={(({key}) => key == "Enter" && this.disactivateEditMode())}
                            onBlur={this.disactivateEditMode}
                            onChange={this.handleInputStatusChange}
                            autoFocus={true}
                            type="text"
                            value={this.state.statusToChange || ""}
                        />
                    ) : (
                        <LongPressable onLongPress={this.activateEditMode} onShortPress={()=>{}}>
                            {/* <span onDoubleClick={this.activateEditMode}> */}
                       <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "Double mouse click to enter new status"}
            </span></LongPressable>
                    )}
                </div>
                <div className="alert alert-warning alert-dismissible fade show mt-3 border border-warning" role="alert">
                    To change the status please double click or long press on it and type another one then press Enter or just move focus out
                    <button type="button" className="btn-close p-1" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        );
    }
}
