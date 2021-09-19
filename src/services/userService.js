import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post("/api/login", {
        email,
        password,
    });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data);
};

const deleteUser = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId,
        },
    });
};

const updateUser = (data) => {
    return axios.put(`/api/edit-user`, data);
};

const getAllCodeService = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorsService = () => {
    return axios.get(`/api/all-doctors`);
};

const postInfoDoctorService = (doctorInfo) => {
    return axios.post(`/api/save-info-doctor`, doctorInfo);
};

const getInfoDoctorService = (doctorId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
};

const bulkCreateScheduleService = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleByDateService = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraInfoDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postBookAppointmentService = (data) => {
    return axios.post(`/api/book-appointment`, data);
};

const postVerifyBookingService = (data) => {
    return axios.post(`/api/verify-booking`, data);
};

const createNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialtiesService = () => {
    return axios.get(`/api/get-all-specialties`);
};

const getDetailSpecialtyByIdService = (params) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${params.id}&location=${params.location}`
    );
};

const editSpecialtyService = (data) => {
    return axios.put(`/api/edit-specialty`, data);
};

const deleteSpecialtyService = (specialtyId) => {
    return axios.delete(`/api/delete-specialty?id=${specialtyId}`);
};

const createNewClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinicsService = () => {
    return axios.get(`/api/get-all-clinics`);
};

const getDetailClinicByIdService = (clinicId) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${clinicId}`);
};

const editClinicService = (data) => {
    return axios.put(`/api/edit-clinic`, data);
};

const getAllPatientByDateService = (params) => {
    return axios.get(
        `/api/get-all-patient-by-date?doctorId=${params.doctorId}&date=${params.date}`
    );
};

const sendPrescriptionService = (data) => {
    return axios.post(`/api/send-prescription`, data);
};

const deleteClinicService = (clinicId) => {
    return axios.delete(`/api/delete-clinic?id=${clinicId}`);
};

export {
    handleLoginApi,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    postInfoDoctorService,
    getInfoDoctorService,
    bulkCreateScheduleService,
    getScheduleByDateService,
    getExtraInfoDoctorByIdService,
    getProfileDoctorByIdService,
    postBookAppointmentService,
    postVerifyBookingService,
    createNewSpecialtyService,
    getAllSpecialtiesService,
    editSpecialtyService,
    deleteSpecialtyService,
    getDetailSpecialtyByIdService,
    createNewClinicService,
    getAllClinicsService,
    getDetailClinicByIdService,
    editClinicService,
    deleteClinicService,
    getAllPatientByDateService,
    sendPrescriptionService,
};
