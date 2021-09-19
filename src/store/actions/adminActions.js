import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getTopDoctorHomeService,
    getAllDoctorsService,
    postInfoDoctorService,
    getAllSpecialtiesService,
    getAllClinicsService,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            const response = await getAllCodeService("GENDER");
            if (response && response.errCode === 0) {
                dispatch(fetchGenderSuccess(response.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error: ", error);
        }
    };
};

// gender action
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

// position action
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

// role action
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getAllCodeService("POSITION");
            if (response && response.errCode === 0) {
                dispatch(fetchPositionSuccess(response.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionFailed error: ", error);
        }
    };
};
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getAllCodeService("ROLE");
            if (response && response.errCode === 0) {
                dispatch(fetchRoleSuccess(response.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log("fetchPositionFailed error: ", error);
        }
    };
};

// CREATE
export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const response = await createNewUser(data);
            if (response && response.errCode === 0) {
                toast.success("Create user successfully!");
                dispatch(createNewUserSuccess());
                dispatch(fetchAllUsersStart()); // will update right after creating action
            } else {
                toast.error("Create user failed!");

                dispatch(createNewUserFailed());
            }
        } catch (error) {
            toast.error("Create user failed!");

            dispatch(createNewUserFailed());
            console.log("createNewUserFailed error: ", error);
        }
    };
};

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

// READ
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getAllUsers("all");
            if (response && response.errCode === 0) {
                dispatch(fetchAllUsersSuccess(response.users));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersFailed error: ", error);
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// DELETE
export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            const response = await deleteUser(id);
            if (response && response.errCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success("Delete user successfully!");
                dispatch(fetchAllUsersStart()); // will update right after deleting action
            } else {
                dispatch(deleteUserFailed());
                toast.error("Delete user failed!");
            }
        } catch (error) {
            toast.error("Delete user failed!");
            dispatch(deleteUserFailed());
            console.log("fetchAllUsersFailed error: ", error);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const response = await updateUser(data);
            if (response && response.errCode === 0) {
                dispatch(editUserSuccess(response.data));
                toast.success("Update user successfully!");
                dispatch(fetchAllUsersStart()); // will update right after deleting action
            } else {
                dispatch(editUserFailed());
                toast.error("Edit user failed!");
            }
        } catch (error) {
            console.log("editUserFailed error: ", error);
            dispatch(editUserFailed());
        }
    };
};

export const editUserSuccess = (data) => ({
    user: data,
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getTopDoctorHomeService(+6);
            if (response && response.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(response.data));
            } else {
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFailed());
        }
    };
};

export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FECTH_TOP_DOCTORS_SUCCESS,
    topDoctors: data,
});
export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FECTH_TOP_DOCTORS_FAILED,
});

export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getAllDoctorsService();
            if (response && response.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(response.data));
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFailed());
        }
    };
};

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    allDoctors: data,
});
export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveInfoDoctorStart = (doctorInfo) => {
    return async (dispatch, getState) => {
        try {
            const response = await postInfoDoctorService(doctorInfo);
            if (response && response.errCode === 0) {
                dispatch(saveInfoDoctorSuccess());
                toast.success("Save doctor info successflly!");
            } else {
                dispatch(saveInfoDoctorFailed());
                toast.error("Save doctor info failed!");
            }
        } catch (error) {
            console.log(error);
            dispatch(fetchAllDoctorsFailed());
            toast.error("Save doctor info failed!");
        }
    };
};

export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
    isSaveSuccess: true,
});
export const saveInfoDoctorFailed = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
});

export const fetchAllScheduleTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getAllCodeService("TIME");
            if (response && response.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(response.data));
            } else {
                dispatch(fetchAllScheduleTimeFailed());
            }
        } catch (error) {
            dispatch(fetchAllScheduleTimeFailed());
        }
    };
};

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    allTimes: data,
});
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

// use for ManageDoctor.js
export const fetchRequiredDoctorInfoStart = () => {
    return async (dispatch, getState) => {
        try {
            // wrap 3 API call in only 1 function instead of (success+failed)*3
            const resPrice = await getAllCodeService("PRICE");
            const resPayment = await getAllCodeService("PAYMENT");
            const resProvince = await getAllCodeService("PROVINCE");
            const resSpecialty = await getAllSpecialtiesService();
            const resClinic = await getAllClinicsService();

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                const data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInfoSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInfoFailed());
        }
    };
};

export const fetchRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    allRequiredData: data,
});
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
