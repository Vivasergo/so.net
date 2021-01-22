import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import cn from "classnames";
import style from "./ErrorBlock.module.css";

function ErrorBlock(props) {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (e) => {
		setOpen(false);
		props.errorReset();
		e.target.name === "goBack" && props.history.goBack();
	};

	useEffect(() => {
		if (props.error) {
			handleOpen();
		}
	}, [props.error]);

	// useEffect(() => {
	//         errorModalWindow.addEventListener('hide.bs.modal', function (event) {
	//             alert(event)
	//         })
	//     }
	// )

	// const appRoot = document.getElementById("root");
	// const wrapBlock = document.createElement("div");
	// const errorCont = <>
	//     <h3>Sorry</h3>
	//     <h4>Error has occurred</h4>
	//     <div>props.error</div>
	// </>;

	// useEffect(() => {
	//     appRoot.prepend(wrapBlock);
	//
	//     return () => appRoot.removeChild(wrapBlock);
	// })

	// return ReactDOM.createPortal(errorCont, wrapBlock)
	// console.log(props.error);

	return (
		<>
			<div>
				{/*<button className={"mt-5"} type="button" onClick={handleOpen}>*/}
				{/*    react-transition-group*/}
				{/*</button>*/}
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

			{/*<button type="button" className="btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#appErrorModal">*/}
			{/*    Launch demo modal*/}
			{/*</button>*/}

			{/*/!*Modal*!/*/}
			{/*<div class="modal fade" ref={errorModalWindow} id="appErrorModal" tabindex="-1"*/}
			{/*     aria-labelledby="appErrorModalLabel" aria-hidden="true">*/}
			{/*    <div class="modal-dialog">*/}
			{/*        <div class="modal-content">*/}
			{/*            <div class="modal-header">*/}
			{/*                <h5 class="modal-title" id="appErrorModalLabel">Sorry, error {props.error.response.status} has*/}
			{/*                    occurred</h5>*/}
			{/*                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>*/}
			{/*            </div>*/}
			{/*            <div class="modal-body">*/}
			{/*                {props.error.message}*/}
			{/*            </div>*/}
			{/*            <div class="modal-footer">*/}
			{/*                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}

			{/*            </div>*/}
			{/*        </div>*/}
			{/*    </div>*/}
			{/*</div>*/}

			{/*<h3>Sorry</h3>*/}
			{/*<h4>Error {props.error.response.status} has occurred</h4>*/}
			{/*<div>{props.error.message}</div>*/}
			{/*<button onClick={()=>props.history.goBack()}>Go Back</button>*/}
		</>
	);
}

export default withRouter(ErrorBlock);
