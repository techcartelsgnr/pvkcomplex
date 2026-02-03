import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'https://pvkcomplex.rwahajipir.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

// const login = async ({ mobile, password, fcm_token }) => {
//   console.log('auth slice line number 14', mobile, password, fcm_token);
//   const response = await authAxios.post(`/user-login`, {
//     mobile: mobile,
//     password: password,
//     fcm_token: fcm_token,
//   });
//   // Save login response
//   console.log('response at line number 21', response.data);
//   if (response.data.status == 200) {
//     await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
//   }
//   console.log('i am at line 24 on services');

//   return response.data;
// };

const login = async ({ mobile, password, fcm_token }) => {
  console.log('auth slice line number 14', mobile, password, fcm_token);

  try {
    const response = await authAxios.post(`/user-login`, {
      mobile,
      password,
      fcm_token,
    });

    console.log('response at line number 21', response.data);

    // Success
    if (response.data.status === 200) {
      await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
      return response.data;
    }

    // Backend response but login failed
    return response.data;
  } catch (error) {
    // HTTP Error (wrong password = 402 or 401)
    console.log('❌ Login Axios Error:', error.response?.data);

    return {
      status: error.response?.data?.status || 500,
      message: error.response?.data?.message || 'Something went wrong',
      error: true,
    };
  }
};

// check Status API
const checkStatus = async ({ token }) => {
  console.log('auth slice line number 34', token);
  const response = await authAxios.get(`/check-user-status`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  // Save login response
  console.log('response at line number 21', response.data);
  if (!response.data.error) {
    await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
  }
  console.log('i am at line 24 on services');

  return response.data;
};

const register = async ({
  name,
  unit,
  rank,
  armyNo,
  mobile,
  block,
  qtrNo,
  password,
  fcmToken,
}) => {
  const response = await authAxios.post(`/user-register`, {
    name: name,
    unit: unit,
    rank: rank,
    army_no: armyNo,
    mobile: mobile,
    block: block,
    qtr_no: qtrNo,
    password: password,
    fcm_token: fcmToken,
  });

  if (response.data.errors === undefined) {
    console.log('Registration Success');
    await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
    await AsyncStorage.setItem('firstTime', JSON.stringify(false));
  }

  return response.data;
};

//GET OTP
const getotp = async ({ email, mobile, password }) => {
  const response = await authAxios.post(`/getotp`, {
    email: email,
    mobile: mobile,
    pin: password,
  });
  return response.data;
};
//GET OTP
const ResendOtp = async ({ mobile }) => {
  const response = await authAxios.post(`/resendotp`, {
    mobile: mobile,
  });
  return response.data;
};

// Logout
const logout = async ({ token }) => {
  const response = await authAxios.post(
    `/user/logout`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  AsyncStorage.removeItem('user_info').then(() => {
    console.log('Logut Successfully');
  });

  return response.data;
};
// changePassword
const changePassword = async ({ token, new_pin, old_pin }) => {
  console.log(new_pin);
  const response = await authAxios.post(
    `/change_password`,
    { old_pin: old_pin, new_pin: new_pin },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );

  return response.data;
};
const resetPassword = async ({ mobile, otp, password }) => {
  const response = await authAxios.post(`/userresetpassword`, {
    mobile,
    password,
    otp,
  });

  // ✅ Check for backend error manually
  if (response.data.errors) {
    throw new Error(response.data.errors); // forces catch in thunk
  }

  return response.data;
};

const updateProfilePic = async ({ token, formData }) => {
  const response = await axios({
    method: 'post',
    url: 'https://pvkcomplex.rwahajipir.com/api/user_image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });

  console.log('response in auth slice========>', response.data.user);

  const strUserInfo = await AsyncStorage.getItem('userInfo');
  const parsUserInfo = JSON.parse(strUserInfo);

  parsUserInfo.user = response.data.user;
  // // parsUserInfo.user.image = response.data.profile

  await AsyncStorage.setItem('userInfo', JSON.stringify(parsUserInfo));

  console.log('user info in update profile===>', response.data);
  return response.data;
};

// suggestions
const suggestions = async ({ token, service_type, suggestion }) => {
  const response = await authAxios.post(
    `/suggestions`,
    { service_type: service_type, suggestion: suggestion },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  console.log(response.data);
  return response.data;
};

const updateProfile = async ({ token, data }) => {
  console.log('line no 196 updateProfile', data);
  const response = await authAxios.post('/update-profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });
  console.log('line no 203 updateProfile', response.data);
  return response.data;
};

const commanTask = (state, action) => {
  const payload = action.payload;

  if (payload.user) {
    state.token = payload.access_token; // Bearer token
    state.tokenType = payload.token_type; // e.g., "Bearer"
    state.name = payload.user.name;
    state.army_no = payload.user.army_no;
    state.unit = payload.user.unit;
    state.rank = payload.user.rank;
    state.mobile = payload.user.mobile;
    state.block = payload.user.block;
    state.qtr_no = payload.user.qtr_no;
    state.fcm_token = payload.user.fcm_token;
    state.status = payload.user.status;
    state.user_id = payload.user.id;
    state.image = payload.user.image; // Profile image URL

    // status flags
    state.pending = false;
    state.error = false;
  }
};

const authService = {
  commanTask,
  register,
  getotp,
  login,
  logout,
  changePassword,
  updateProfilePic,
  ResendOtp,
  resetPassword,
  suggestions,
  checkStatus,
  updateProfile,
};

export default authService;
