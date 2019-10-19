import React, { useState} from 'react';
//import { Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { Container, Push } from './styles';
import api from '~/services/api';

export default function SelectImage() {
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  function showImagePicker() {
    ImagePicker.showImagePicker(
      {
        title: 'Select image',
      },
      upload => {
        if (upload.uri) {
          const previewData = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const imageData = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          setPreview(previewData);
          handleUploadImage(imageData);
        }
      },
    );
  }

  async function handleUploadImage(imageData) {
    setLoadingAvatar(true);
    const data = new FormData();

    data.append('images', imageData);

    const response = await api.post('files', data);

    setImage(response.data.successes[0].id);
    setLoadingAvatar(false);
  }



  return (
    <Container>
      <Push onPress={showImagePicker}>Upload</Push>
    </Container>
  );
}
