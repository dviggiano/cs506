const API_URL = 'http://127.0.0.1:5000'; // 'http://cs506-team-23.cs.wisc.edu:5000';

/**
 * Creates a user.
 * @param email The user's email, which will serve as the user's unique DB identifier.
 * @param username The user's display name.
 * @returns A JSON confirmation of user creation.
 */
const createUser = async (email: string, username: string) => {
  const response = await fetch(`${API_URL}/create-user/${email}/${username}`, { method: 'POST' });
  return response.json();
};

/**
 * Fetches data for a particular user.
 * @param email The email address of the user to fetch data for.
 * @returns A JSON response containing the user's data, including display name, sequences, and folders.
 */
const getUserData = async (email: string) => {
  const response = await fetch(`${API_URL}/get-user-data/${email}`);
  return response.json();
};

/**
 * Fetches the MP3 file corresponding to a recorded sequence.
 * @param sequenceId The sequence to be retrieved.
 * @returns The recorded sequence as an MP3 file.
 */
const getRecordingFile = async (sequenceId: number): Promise<Blob> => {
  const response = await fetch(`${API_URL}/get-recording-file/${sequenceId}`);
  return response.blob();
};

/**
 * Processes an uploaded vocal recording by converting it into a note sequence, saving it, and returning it to the frontend.
 * @param file An MP3 file of the vocal recording of the audio sequence.
 * @param user The email of the creator of the song.
 * @param displayName The display name associated with the recording.
 * @param instrumentId The ID of the default playback instrument.
 * @returns A JSON response containing the processed sequence data for the frontend.
 */
const processRecording = async (file: Blob, user: string, displayName: string, instrumentId: number = 0) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user', user);
  formData.append('display_name', displayName);
  formData.append('instrument', instrumentId.toString());

  const response = await fetch(`${API_URL}/process-recording`, { method: 'POST', body: formData });
  return response.json();
};

/**
 * Updates the note data associated with an audio sequence.
 * @param sequenceId The unique identifier for the sequence.
 * @param updatedSequence The new note data of the sequence, formatted sequentially as a string.
 * @returns A JSON confirmation of the note data update.
 */
const updateSequenceData = async (sequenceId: number, updatedSequence: string) => {
  const response = await fetch(`${API_URL}/update-sequence-data/${sequenceId}/${updatedSequence}`, { method: 'PUT' });
  return response.json();
};

/**
 * Renames a sequence.
 * @param sequenceId The unique identifier for the sequence.
 * @param displayName The new name of the sequence.
 * @returns A JSON confirmation of the sequence rename.
 */
const renameSequence = async (sequenceId: number, displayName: string) => {
  const response = await fetch(`${API_URL}/rename-sequence/${sequenceId}/${displayName}`, { method: 'PUT' });
  return response.json();
};

/**
 * Deletes a sequence.
 * @param sequenceId The unique identifier for the sequence to be deleted.
 * @returns A JSON confirmation of the sequence deletion.
 */
const deleteSequence = async (sequenceId: number) => {
  const response = await fetch(`${API_URL}/delete-sequence/${sequenceId}`, { method: 'DELETE' });
  return response.json();
};

/**
 * Creates a new folder.
 * @param displayName The display name for the folder.
 * @param owner The email of the user who owns the folder.
 * @returns A JSON response containing the new folder ID.
 */
const createFolder = async (displayName: string, owner: string) => {
  const response = await fetch(`${API_URL}/create-folder/${displayName}/${owner}`, { method: 'POST' });
  return response.json();
};

/**
 * Renames a folder.
 * @param folderId The unique identifier for the folder.
 * @param displayName The new name of the folder.
 * @returns A JSON confirmation of the folder rename.
 */
const renameFolder = async (folderId: number, displayName: string) => {
  const response = await fetch(`${API_URL}/rename-folder/${folderId}/${displayName}`, { method: 'PUT' });
  return response.json();
};

/**
 * Update the contents of a folder, including adding or removing sequences.
 * @param folderId The unique identifier for the folder.
 * @param sequences An array of the sequences now contained in the folder.
 * @returns A JSON confirmation of the folder contents update.
 */
const updateFolderContents = async (folderId: number, sequences: number[]) => {
  const response = await fetch(`${API_URL}/update-folder-contents`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder_id: folderId, sequences })
  });
  return response.json();
};

/**
 * Deletes a folder.
 * @param folderId The unique identifier for the folder to be deleted.
 * @returns A JSON confirmation of the folder deletion.
 */
const deleteFolder = async (folderId: number) => {
  const response = await fetch(`${API_URL}/delete-folder/${folderId}`, { method: 'DELETE' });
  return response.json();
};

