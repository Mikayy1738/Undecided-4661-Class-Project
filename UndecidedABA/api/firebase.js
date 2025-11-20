import axios from 'axios';
import CryptoJS from 'crypto-js';

const firebase_url = "https://undecided-aba-app-default-rtdb.firebaseio.com/";

const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const emailKey = email.toLowerCase().replace(/[.#$[\]]/g, '_');
    const response = await axios.get(`${firebase_url}users/${emailKey}.json`);
    
    if (!response.data) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const hashedPassword = hashPassword(password);
    if (response.data.password === hashedPassword) {
      return { success: true, data: { email: response.data.email, uid: emailKey } };
    } else {
      return { success: false, error: 'Invalid email or password.' };
    }
  } catch (error) {
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    if (!email.trim() || !password.trim()) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const emailKey = email.toLowerCase().replace(/[.#$[\]]/g, '_');
    const checkResponse = await axios.get(`${firebase_url}users/${emailKey}.json`);
    
    if (checkResponse.data) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const hashedPassword = hashPassword(password);
    const response = await axios.put(`${firebase_url}users/${emailKey}.json`, {
      email: email.trim(),
      password: hashedPassword,
    });

    return { success: true, data: { email: response.data.email || email.trim(), uid: emailKey } };
  } catch (error) {
    let errorMessage = 'Sign up failed. Please try again.';
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        errorMessage = 'Database access denied. Please check Firebase permissions.';
      } else if (error.response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else {
        errorMessage = `Sign up failed: ${error.response.status} ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else {
      errorMessage = error.message || 'Sign up failed. Please try again.';
    }
    return { success: false, error: errorMessage };
  }
};

export const checkIfFirstTimeUser = async () => {
  try {
    const response = await axios.get(`${firebase_url}users.json`);
    return !response.data || Object.keys(response.data).length === 0;
  } catch (error) {
    return true;
  }
};

export const saveClients = async (userId, clients) => {
  try {
    const emailKey = userId.toLowerCase().replace(/[.#$[\]]/g, '_');
    await axios.put(`${firebase_url}users/${emailKey}/clients.json`, clients);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to save clients.' };
  }
};

export const loadClients = async (userId) => {
  try {
    const emailKey = userId.toLowerCase().replace(/[.#$[\]]/g, '_');
    const response = await axios.get(`${firebase_url}users/${emailKey}/clients.json`);
    return { success: true, data: response.data || [] };
  } catch (error) {
    return { success: false, error: 'Failed to load clients.', data: [] };
  }
};