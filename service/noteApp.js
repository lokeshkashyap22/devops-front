const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/note';

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
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }
    return response.json();
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw new Error('Unable to update note. Please try again.');
  }
};