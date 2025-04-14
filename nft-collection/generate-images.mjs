import dotenv from 'dotenv';
dotenv.config();
import axios from "axios"
import fs from "fs"

const generateImageUnsplash = async (prompt) => {
  const response = await axios.get(`https://source.unsplash.com/random/1024x1024/?${prompt}`, {
    responseType: 'arraybuffer',
})

  return response.data
}

const saveImage = async (imageData, index) => {
    const buffer = Buffer.from(imageData, 'base64');
    const fileName = `./images/image_${index}.png`;

    try {
        await fs.promises.writeFile(fileName, buffer);
        console.log(`Image saved: ${fileName}`);
    } catch (error) {
        console.error(`Error saving image ${index}:`, error);
    }
};

const main = async () => {
    for (let i = 0; i < 10; i++) {
        const imageData = await generateImageUnsplash("art")

        if (imageData) {
            saveImage(imageData, i);
        }
    }
};

main();