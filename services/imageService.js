const cloudName = "dumjz8ka3";
const uploadPreset = "imports4ever";
const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export async function uploadImage(uri) {
  const data = new FormData();


  const fileType = uri.split('.').pop();
  const mimeType = fileType === 'jpg' || fileType === 'jpeg' ? 'image/jpeg' : `image/${fileType}`;
  const fileName = `upload.${fileType}`;

  data.append('file', {
    uri,
    type: mimeType,
    name: fileName,
  });

  data.append('upload_preset', uploadPreset);

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: data,
 
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error.message || 'Erro no upload da imagem');
    }

    return result.secure_url;
  } catch (error) {
    console.error('Erro no upload da imagem:', error);
    throw error;
  }
}
