// Authentication utility functions

export const isAuthenticated = () => {
  const staff = localStorage.getItem('staff');
  
  if (!staff) {
    return false;
  }
  
  try {
    const staffData = JSON.parse(staff);
    return staffData && staffData.serviceNumber && staffData.isActive;
  } catch (error) {
    console.error('Error parsing staff data:', error);
    return false;
  }
};

export const getCurrentUser = () => {
  const staff = localStorage.getItem('staff');
  
  if (!staff) {
    return null;
  }
  
  try {
    return JSON.parse(staff);
  } catch (error) {
    console.error('Error parsing staff data:', error);
    return null;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const logout = () => {
  localStorage.removeItem('staff');
  localStorage.removeItem('authToken');
  window.location.href = '/login';
};

export const setAuthHeader = (axios) => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};