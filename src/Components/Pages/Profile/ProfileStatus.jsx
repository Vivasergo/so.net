import React, {Component} from "react";

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
                        <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "Double mouse click to enter new status"}
            </span>
                    )}
                </div>
                <div className="alert alert-warning alert-dismissible fade show mt-3 border border-warning" role="alert">
                    To change status please double click on it and type another one
                    <button type="button" className="btn-close p-1" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        );
    }
}
