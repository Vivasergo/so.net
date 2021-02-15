import React, { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import cn from "classnames";
import style from "./ErrorBlock.module.css";
import { AppErrorType } from "../../../Types/types";

// type Route

type OwnPropsType = {
	error: AppErrorType
	errorReset: () => void
}

// type PropsType=

const ErrorBlock: FC<OwnPropsType & RouteComponentProps> = (props)=>  {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};


	const handleClose = (event: any) => {
		setOpen(false);
		props.errorReset();
		event.target.name === "goBack" && props.history.goBack();
	};

	useEffect(() => {
		if (props.error) {
			handleOpen();
		}
	}, [props.error]);

	return (
		<>
			<div>

				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={""}
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={open}>
						<div className={cn("m-auto", style.errorBlock)}>
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h4 id="transition-modal-title">
											{props.error.response.status} error has occurred
										</h4>
										<button
											onClick={handleClose}
											type="button"
											className="btn-close"
										></button>
									</div>
									<div className="modal-body">
										<p id="transition-modal-description">
											{props.error.message}
										</p>
										{/* if error is not a server response then showing message */}
										{props.error.response.status !== "Server response" && (
											<p id="transition-modal-description">
												Please try a little later.
											</p>
										)}
									</div>
									<div className="modal-footer">
										<button
											name="goBack"
											onClick={handleClose}
											type="button"
											className="btn btn-info"
										>
											Go back
										</button>
										<button
											name="close"
											onClick={handleClose}
											type="button"
											className="btn btn-warning"
										>
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</Fade>
				</Modal>
			</div>
		</>
	);
}

export default withRouter(ErrorBlock);
