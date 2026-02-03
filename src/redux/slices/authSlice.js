import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commanServices from '../services/commanServices';
import authService from '../services/authServices';
import { ToastAndroid } from 'react-native';
const initialState = {
  isInitial: false,
  pending: false,
  error: false,
  token: null,
  isLoading: false,
  messasge: null,
  refCode: '',
  isOtp: false,
  isLogout: false,
  firstTime: true,
  helpline_number: '',
  // authService
  name: '',
  army_no: '',
  unit: '',
  rank: '',
  mobile: '',
  block: '',
  qtr_no: '',
  fcm_token: '',
  status: '',
  user_id: '',
  image: '',
  tokenType: '',
};

// export const chkLogin = createAsyncThunk('auth/chkLogin', async thunkAPI => {
//   try {
//     const user = await AsyncStorage.getItem('user_info');
//     const first = await AsyncStorage.getItem('firstTime');
//     console.log('authslice at 30', user);
//     const tmp_user = { user: user, firstTime: first };
//     return tmp_user;
//   } catch (e) {
//     const message =
//       (e.response && e.response.data && e.response.data.message) ||
//       e.message ||
//       e.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const chkLogin = createAsyncThunk(
  'auth/chkLogin',
  async (_, thunkAPI) => {
    // <-- underscore means "no argument"
    try {
      const user = await AsyncStorage.getItem('user_info');
      const first = await AsyncStorage.getItem('firstTime');

      console.log('authslice at 30', user);

      return { user, firstTime: first };
    } catch (e) {
      const message = e.response?.data?.message || e.message || e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async ({ mobile, password, fcm_token }, thunkAPI) => {
    try {
      // console.log('i am here at 46 in slice', uid, date_of_birth);
      const res = await authService.login({ mobile, password, fcm_token });
      return res;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// check status
export const checkStatus = createAsyncThunk(
  'auth/checkStatus',
  async ({ token }, thunkAPI) => {
    try {
      console.log('i am here at 72 in slice', token);
      const res = await authService.checkStatus({ token });
      return res;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Register here
export const register = createAsyncThunk(
  'auth/register',
  async (
    { name, unit, rank, armyNo, mobile, block, qtrNo, password, fcmToken },
    thunkAPI,
  ) => {
    try {
      return await authService.register({
        name,
        unit,
        rank,
        armyNo,
        mobile,
        block,
        qtrNo,
        password,
        fcmToken,
      });
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get OTP here
export const getotp = createAsyncThunk(
  'auth/getotp',
  async ({ email, mobile, password }, thunkAPI) => {
    try {
      return await authService.getotp({
        email,
        mobile,
        password,
      });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
// Resend OTP here
export const ResendOtp = createAsyncThunk(
  'auth/resendOtp',
  async ({ mobile }, thunkAPI) => {
    try {
      return await authService.ResendOtp({
        mobile,
      });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// logout slice

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ token }, thunkAPI) => {
    console.log('Logout Token=>' + token);
    try {
      return await authService.logout({ token });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ token, old_pin, new_pin }, thunkAPI) => {
    try {
      return await authService.changePassword({ token, old_pin, new_pin });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ mobile, otp, password }, thunkAPI) => {
    try {
      return await authService.resetPassword({ mobile, otp, password });
    } catch (e) {
      console.log('in catch', e);
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const updateProfilePic = createAsyncThunk(
  'auth/updateProfilePic',
  async ({ token, formData }, thunkAPI) => {
    try {
      return await authService.updateProfilePic({
        token,
        formData,
      });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// suggetion
export const suggestions = createAsyncThunk(
  'auth/suggestions',
  async ({ token, service_type, suggestion }, thunkAPI) => {
    try {
      return await authService.suggestions({ token, service_type, suggestion });
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// update profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ token, formData }, thunkAPI) => {
    try {
      const res = await authService.updateProfile({ token, data: formData });
      return res; // contains {status, message, user}
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// states manage here

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    ////////////////////////////===========Login==========/////////////////////////////
    builder.addCase(fetchLogin.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      //const status = Number(action?.payload?.status);
      if (action.payload.status == 200) {
        console.log(action.payload);
        authService.commanTask(state, action);
        // authService.createChannel();
      } else {
        console.log(
          'error message for password in else 289',
          action.payload.message,
        );
        //  commanServices.showToast('somthing went wrong');
        //commanServices.showToast(action.payload.message);
        ToastAndroid.showWithGravity(
          action.payload.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
      console.log('action.payload.status', action.payload.status);
      state.pending = false;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
    });

    ////////////////////////////===========Login==========/////////////////////////////
    builder.addCase(checkStatus.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(checkStatus.fulfilled, (state, action) => {
      console.log('checkStatus payload:', action.payload.user.status);
      state.status = action.payload.user.status;
      console.log('state-status', state.status);
      let user = null;

      // action.payload.user is the stored JSON string
      if (action.payload.user) {
        try {
          user = JSON.parse(action.payload.user);
        } catch (e) {
          console.log('JSON parse error:', e);
        }
      }

      if (user) {
        // ==== NEW API FIELDS ====
        state.token = user.access_token;
        state.tokenType = user.token_type;
        state.name = user.user.name;
        state.army_no = user.user.army_no;
        state.unit = user.user.unit;
        state.rank = user.user.rank;
        state.mobile = user.user.mobile;
        state.block = user.user.block;
        state.qtr_no = user.user.qtr_no;
        state.fcm_token = user.user.fcm_token;
        state.status = user.user.status;
        state.user_id = user.user.id;

        state.image = user.user.image;
      }

      // First time flag
      state.firstTime = action.payload.firstTime
        ? JSON.parse(action.payload.firstTime)
        : false;

      state.isLoading = false;
      state.pending = false;
      state.isInitial = false;
    });
    builder.addCase(checkStatus.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
    });

    ///////////////////////////////////////////////////////////
    builder.addCase(chkLogin.pending, (state, action) => {
      state.pending = true;
      state.isLoading = true;
      state.isInitial = true;
    });

    builder.addCase(chkLogin.fulfilled, (state, action) => {
      console.log('chkLogin payload:', action.payload.user);

      let user = null;

      // action.payload.user is the stored JSON string
      if (action.payload.user) {
        try {
          user = JSON.parse(action.payload.user);
        } catch (e) {
          console.log('JSON parse error:', e);
        }
      }

      if (user) {
        // ==== NEW API FIELDS ====
        state.token = user.access_token;
        state.tokenType = user.token_type;
        state.name = user.user.name;
        state.army_no = user.user.army_no;
        state.unit = user.user.unit;
        state.rank = user.user.rank;
        state.mobile = user.user.mobile;
        state.block = user.user.block;
        state.qtr_no = user.user.qtr_no;
        state.fcm_token = user.user.fcm_token;
        state.status = user.user.status;
        state.user_id = user.user.id;

        state.image = user.user.image;
      }

      // First time flag
      state.firstTime = action.payload.firstTime
        ? JSON.parse(action.payload.firstTime)
        : false;

      state.isLoading = false;
      state.pending = false;
      state.isInitial = false;
    });

    builder.addCase(chkLogin.rejected, (state, action) => {
      state.isInitial = false;
      state.isLoading = false;
      state.pending = false;
      console.log('Failed to load user');
    });

    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Register 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(register.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        console.log(action.payload);
        authService.commanTask(state, action);
        // authService.createChannel();
      } else {
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.payload);
      state.pending = false;
      state.error = true;
      state.token = null;
    });

    // ================= UPDATE PROFILE ==================
    builder.addCase(updateProfile.pending, state => {
      state.pending = true;
      state.error = false;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const user = action.payload.user;

      // UPDATE REDUX STATE
      state.name = user.name;
      state.unit = user.unit;
      state.rank = user.rank;
      state.army_no = user.army_no;
      state.mobile = user.mobile;
      state.block = user.block;
      state.qtr_no = user.qtr_no;
      state.image = user.image;
      state.status = user.status;

      state.pending = false;
      state.error = false;
    });

    builder.addCase(updateProfile.rejected, state => {
      state.pending = false;
      state.error = true;
    });

    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 GET OTP 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(getotp.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(getotp.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        console.log(action.payload);
        state.isOtp = true;
        console.log('is OTP true part' + state.isOtp);
        commanServices.showToast(action.payload.message);
      } else {
        state.isOtp = false;
        console.log('is OTP else part' + state.isOtp);
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(getotp.rejected, (state, action) => {
      console.log(action.payload);
      state.pending = false;
      state.error = true;
      state.token = null;
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Resend OTP 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(ResendOtp.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(ResendOtp.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        console.log(action.payload);
        state.isOtp = true;
        // console.log('is OTP true part' + state.isOtp);
        commanServices.showToast(action.payload.message);
      } else {
        state.isOtp = false;
        console.log('is OTP else part' + state.isOtp);
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(ResendOtp.rejected, (state, action) => {
      console.log(action.payload);
      state.pending = false;
      state.error = true;
      state.token = null;
    });

    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Logout 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(logout.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log(action.payload);

      state.token = null;
      state.image = '';
      state.email = '';
      state.name = '';
      state.mobile = '';
      state.user_id = '';
      state.studentclass = '';
      state.fathername = '';
      state.mothername = '';
      state.section = '';
      state.dob = '';
      state.bloodgroup = '';
      state.rollnumber = '';
      state.emergencynumber = '';

      state.pending = false;
      state.error = false;
      state.isLogout = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Change Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(changePassword.pending, (state, action) => {
      // console.log('Pending State');
      commanServices.showToast("Please Wait we'll get back to you.");
      state.pending = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      commanServices.showToast(action.payload.message);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Reset Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(resetPassword.pending, (state, action) => {
      // console.log('Pending State');
      commanServices.showToast("Please Wait we'll get back to you.");
      state.pending = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        commanServices.showToast(action.payload.message);
      } else {
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
      state.error = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Change Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(updateProfilePic.pending, (state, action) => {
      // console.log('Pending State');
      commanServices.showToast("Please Wait we'll get back to you.");
      state.pending = true;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action) => {
      commanServices.showToast(action.payload.message);
      console.log('action.payload.profile', action.payload.profile);
      if (action.payload.errors === undefined) {
        state.image = action.payload.profile;
      }
      state.pending = false;
      state.error = false;
    });
    builder.addCase(updateProfilePic.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Suggestion 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(suggestions.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(suggestions.fulfilled, (state, action) => {
      //console.log(action.payload.message);
      commanServices.showToast(action.payload.message);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(suggestions.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    //  add all states here
  },
});

export default authSlice.reducer;
