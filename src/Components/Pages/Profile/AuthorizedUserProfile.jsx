import React from "react";
import profImg from "../../../Images/user.png";
import ProfileStatus from "./ProfileStatus";
import ProfileEditForm from "./ProfileEditForm/ProfileEditForm";
import _ from "lodash";

const AuthorizedUserProfile = (props) => {
	const handleFileChange = (e) => {
		props.uploadNewAvatar(e.target.files[0]);
	};

	return (
		<>
			<h3>Welcome to your personal account, {props.profile.fullName}</h3>
			<div className={"col-12"}>
				<div className="profile-container__big-img">
					<div className={"text-center text-sm-start"}>
						<img
							className={"rounded mb-3 ms-md-3"}
							src={
								props.profile.photos.large
									? props.profile.photos.large
									: profImg
							}
							alt=""
						/>
					</div>

					<div
						className="alert alert-warning fade show border border-warning"
						role="alert"
					>
						To change the avatar please chose another file below
					</div>
					<div className={"overflow-auto"}>
						<input onChange={handleFileChange} type="file" />
					</div>
				</div>
				<hr />
				<ProfileStatus
					currentUserProfileId={props.currentUserProfileId}
					authorizedUserId={props.authorizedUserId}
					status={props.status}
					updateStatus={props.updateStatus}
				/>
				<hr />

				{/*Sending initialValues for form fields which were taken from state and will be inserted as placeholders*/}
				{/*according to the fieldname*/}
				<ProfileEditForm
                //deleting photos object from profile object for initial form values
					initialValues={_.omit(props.profile, "photos")}
					isProfileUpdated={props.isProfileUpdated}
					updateProfile={props.updateProfile}
					profile={props.profile}
					exitEditMode={props.exitEditMode}
				/>
			</div>
		</>
	);
};

export default AuthorizedUserProfile;
