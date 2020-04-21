import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Alert, ActivityIndicator, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';
import { updateProfileRequest } from '../../../store/modules/user/actions';

import { Container, Image, Avatar, Separator, Form, FormInput, SubmitButton } from './styles';
import api from '../../../services/api';

export default function EditUser({ navigation }) {
  const dispatch = useDispatch();
  const user = navigation.getParam('user');

  const emailRef = useRef();
  const passwordRef = useRef();

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [imageProfile, setImageProfile] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
    setImageProfile(user);
    setLoading(false);
  }, [user]);

  function showImagePicker() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma nova foto',
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

    data.append('file', imageData);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setImage(id);
    setPreview(url);
    handleImage(id);
    setLoadingAvatar(false);

  }

  function handleImage(id) {
    dispatch(updateProfileRequest({
      name,
      email,
      avatar_id: id,
    }))
  }

  async function handleSubmit() {
    setLoading(true);
    await api.put('usersUpdate', {
      id: user.id,
      name: name,
      email: email,
      password: password,
    });

      Alert.alert('Dados do usuário atualizados');
      setLoading(false);
      navigation.navigate('DashboardAdm');
      navigation.openDrawer();

  }

  return (
    <Background>
      { loading ? (
        <ActivityIndicator size="large" color="#FFF" align="center"
        style={styles.load}/>
      ) : (
        <Container>
          <Form>

          { imageProfile === '' ? (
            <ActivityIndicator size="small" color="#fff" align="center"
              style={styles.loadAvatar} />
          ) : (
            <Avatar
              source={{
              uri: imageProfile.avatar
              ? imageProfile.avatar.url
              : `https://api.adorable.io/avatars/50/${profile.name}.png`,
              }}
            />
          )}
          <FormInput
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome do usuário"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />

            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={email}
              onChangeText={setEmail}

            />

            <Separator />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="nova senha"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}

            />

          <SubmitButton loading={loading} onPress={handleSubmit}>Atualizar Perfil</SubmitButton>

          </Form>
      </Container>
      )}

    </Background>
  );
}

EditUser.navigationOptions = ({ navigation }) => ({
  title: 'Editar usuário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Users');
        navigation.openDrawer();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center'
  },

  loadAvatar: {
    flex: 1,
    padding: 100,
    flexDirection: "column",
    justifyContent: "flex-start",
  }
})

