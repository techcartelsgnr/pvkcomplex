import axios from 'axios';
import Toast from 'react-native-toast-message';

const authAxios = axios.create({
  baseURL: 'https://pvkcomplex.rwahajipir.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

// ---------------------------
// GET SLIDER IMAGES (SchoolMate)
// ---------------------------
const getSlider = async token => {
  console.log('line number 17 at common services', token);
  try {
    const res = await authAxios.get('/get-gallery', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    // API returns: res.data.data = array of slider objects
    const sliderList = res.data.data || [];
    console.log('sliderlist in common services', sliderList);
    // Convert to usable format
    const images = sliderList.map((item, index) => ({
      id: item.id,
      img: item.image_url, // full URL from API
    }));
    console.log('line 35 common services', images);
    return { images };
  } catch (error) {
    console.log('Slider API Error:', error);
    return { images: [] };
  }
};

// // getGallery.js

// const getGallery = async () => {
//   try {
//     const res = await authAxios.get('/get-gallery', {
//       headers: {
//         Accept: 'application/json',
//       },
//     });

//     const list = res.data.data || [];

//     const gallery = list
//       .filter(item => item.image_url) // only valid images
//       .map(item => ({
//         id: item.id,
//         title: item.title,
//         image: item.image_url,
//       }));

//     return { gallery };
//   } catch (error) {
//     console.log('Gallery API Error:', error);
//     return { gallery: [] };
//   }
// };

// getAnnouncements
const getAnnouncements = async token => {
  try {
    const res = await authAxios.get('/get-announcements', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const list = res.data.data || [];

    // FORMAT ANNOUNCEMENTS
    const announcements = list.map(item => ({
      id: item.id,
      title: item.title,
      fileUrl: item.full_pdf_url, // PDF or IMAGE
      validUpto: item.valid_upto,
      createdAt: item.created_at,
      isPDF: item.full_pdf_url.toLowerCase().endsWith('.pdf'),
      isImage:
        item.full_pdf_url.toLowerCase().endsWith('.jpg') ||
        item.full_pdf_url.toLowerCase().endsWith('.jpeg') ||
        item.full_pdf_url.toLowerCase().endsWith('.png') ||
        item.full_pdf_url.toLowerCase().endsWith('.webp') ||
        item.full_pdf_url.toLowerCase().endsWith('.heic'),
    }));

    return { announcements };
  } catch (error) {
    console.log('Announcements API Error:', error);
    return { announcements: [] };
  }
};

// getEvents
const getEvents = async token => {
  try {
    const res = await authAxios.get('/get-events', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log(res.data.data);
    const list = res.data.data || [];

    // FORMAT events
    const events = list.map(item => ({
      id: item.id,
      title: item.title,
      fileUrl: item.full_pdf_url, // PDF or IMAGE
      validUpto: item.valid_upto,
      createdAt: item.created_at,
      isPDF: item.full_pdf_url.toLowerCase().endsWith('.pdf'),
      isImage:
        item.full_pdf_url.toLowerCase().endsWith('.jpg') ||
        item.full_pdf_url.toLowerCase().endsWith('.jpeg') ||
        item.full_pdf_url.toLowerCase().endsWith('.png') ||
        item.full_pdf_url.toLowerCase().endsWith('.webp') ||
        item.full_pdf_url.toLowerCase().endsWith('.heic'),
    }));

    return { events };
  } catch (error) {
    console.log('events API Error:', error);
    return { events: [] };
  }
};
// getRwaAdvisory
const getRwaAdvisory = async token => {
  try {
    const res = await authAxios.get('/get-rwa-advisories', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log(res.data.data);
    const list = res.data.data || [];

    // FORMAT rwaadvisories
    const rwaadvisories = list.map(item => ({
      id: item.id,
      title: item.title,
      fileUrl: item.full_pdf_url, // PDF or IMAGE
      validUpto: item.valid_upto,
      createdAt: item.created_at,
      isPDF: item.full_pdf_url.toLowerCase().endsWith('.pdf'),
      isImage:
        item.full_pdf_url.toLowerCase().endsWith('.jpg') ||
        item.full_pdf_url.toLowerCase().endsWith('.jpeg') ||
        item.full_pdf_url.toLowerCase().endsWith('.png') ||
        item.full_pdf_url.toLowerCase().endsWith('.webp') ||
        item.full_pdf_url.toLowerCase().endsWith('.heic'),
    }));

    return { rwaadvisories };
  } catch (error) {
    console.log('rwaadvisories API Error:', error);
    return { rwaadvisories: [] };
  }
};

// getAllComplaints
const getAllComplaints = async token => {
  try {
    const res = await authAxios.get('/all-complaint', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const list = res.data.data || [];

    // FORMAT COMPLAINTS
    const complaints = list.map(item => ({
      id: item.id,
      userId: item.user_id,
      date: item.date_of_complaint,
      block: item.block,
      qtrNo: item.qtr_no,
      type: item.type_of_complaint,
      message: item.complaint_message,
      status: item.status, // 0,1,2
      priority: item.priority,
      image: item.image_url,
      updatedBy: item.updated_by,
      createdAt: item.created_at,
    }));

    return { complaints };
  } catch (error) {
    console.log('Complaints API Error:', error);
    return { complaints: [] };
  }
};

// getContacts
const getContacts = async token => {
  try {
    const res = await authAxios.get('/get-contacts', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const list = res.data.data || [];

    // FORMAT CONTACT LIST
    const contacts = list.map(item => ({
      id: item.id,
      name: item.name,
      designation: item.designation,
      phone: item.phone,
      order: item.order,
      image: item.image_url,
      createdAt: item.created_at,
    }));

    return { contacts };
  } catch (error) {
    console.log('Contacts API Error:', error);
    return { contacts: [] };
  }
};

const addComplaint = async ({ token, data }) => {
  const response = await authAxios.post('/complaint-submit', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

// getHelplineNumber (no token)
const getHelplineNumber = async () => {
  try {
    const res = await authAxios.get('/helpline-number');
    return res.data.data.mobile; // return number only
  } catch (error) {
    console.log('Helpline API Error:', error);
    return null;
  }
};

const showToast = Message => {
  Toast.show({
    type: 'success',
    text1: Message,
    visibilityTime: 5000,
  });
};

const commanServices = {
  showToast,
  getSlider,
  getEvents,
  getAnnouncements,
  getRwaAdvisory,
  getAllComplaints,
  getContacts,
  addComplaint,
  getHelplineNumber,
};
export default commanServices;
