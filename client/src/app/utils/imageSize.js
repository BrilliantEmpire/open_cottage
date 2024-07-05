
// Function to check if an image size is within the specified limit
export const checkImageSize = (file, maxSizeInMB) => {
    const fileSizeInMB = file.size / (1024 * 1024); 
    return fileSizeInMB <= maxSizeInMB; 
  };