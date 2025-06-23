export async function uploadImage(uri) {
  const cloudName = "dumjz8ka3";
  const uploadPreset = "imports4ever";
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();

  const fileType = uri.split('.').pop();
  const mimeType = fileType === 'jpg' || fileType === 'jpeg' ? 'image/jpeg' : `image/${fileType}`;
  const fileName = `upload.${fileType}`;

  formData.append('file', {
    uri,
    name: fileName,
    type: mimeType,
  });

  formData.append('upload_preset', uploadPreset);

  console.log('Enviando imagem com:', { uri, fileName, mimeType });

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    const result = await res.json();

    console.log('Resposta do Cloudinary:', result);

    if (!res.ok) {
      throw new Error(result?.error?.message || 'Erro no upload');
    }

    return result.secure_url;
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
    throw error;
  }
}
