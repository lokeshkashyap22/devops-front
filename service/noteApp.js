import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.APP_API_URL || 'http://localhost:8000/api/note';
console.log("APP_API_URL:", process.env.APP_API_URL);
console.log('API_URL:', API_URL);

export const fetchNotes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error('Unable to fetch notes. Please try again later.');
  }
};

export const addNote = async (note) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error(`Failed to add note: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding note:', error);
    throw new Error('Unable to add note. Please try again.');
  }
};

export const deleteNote = async (id) => {
  try {
    console.log('Deleting note with id:', id);
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }
    // Return an empty object if there's no content
    return response.status === 204 ? {} : response.json();
  } catch (error) {
    console.error('Error deleting note:', error);
    throw new Error('Unable to delete note. Please try again.');
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    });
    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.statusText}`);
    }
    // Return an empty object if there's no content
    return response.status === 204 ? {} : response.json();
  } catch (error) {
    console.error('Error updating note:', error);
    throw new Error('Unable to update note. Please try again.');
  }
};
