async function imageUploadS3(url: string, file: File): Promise<void> {
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to S3');
  }
}

export default imageUploadS3;
