import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';
import { updateProfileRequest } from '../../../store/modules/user/actions';

import {
  Container,
  Image,
  Avatar,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';
import api from '../../../services/api';

export default function ProfileEditAdm({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const emailRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [imageProfile, setImageProfile] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
    setImageProfile(profile);
    setLoading(false);
  }, [profile]);

  function showImagePicker() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma nova foto',
      },
      (upload) => {
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

          const data = new FormData();

          data.append('file', imageData);

          setPreview(previewData);

          Alert.alert(
            'Atualizar imagem de perfil',
            'Deseja alterar a imagem de perfil com a imagem selecionada?',
            [
              {
                text: 'Não',
                onPress: () => {
                  setPreview('');
                  return;
                },
                style: 'cancel',
              },
              {
                text: 'Sim',
                onPress: () => {
                  handleUploadImage(data);
                },
              },
            ],
          );
        }
      },
    );
  }

  async function handleUploadImage(data) {
    setLoadingAvatar(true);

    const response = await api.post('files', data);

    const { id } = response.data;

    setImage(id);
    handleImage(id);
    setLoadingAvatar(false);
  }


  function handleImage(id) {
    dispatch(
      updateProfileRequest({
        name,
        email,
        avatar_id: id,
      }),
    );
  }

  function handleSubmit() {
    setLoading(true);
    dispatch(
      updateProfileRequest({
        name,
        email,
        phone,
        oldPassword,
        password,
        confirmPassword,
        //avatar_id: id,
      }),
    );
    setLoading(false);
    navigation.navigate('DashboardAdm');
    navigation.openDrawer();
  }

  return (
    <Background>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFF"
          align="center"
          style={styles.load}
        />
      ) : (
          <Container>
            <Form>
              <Image onPress={showImagePicker}>Alterar foto</Image>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  align="center"
                  style={styles.loadAvatar}
                />
              ) : (
                  <>
                    {preview ? (
                      <Avatar source={preview} />
                    ) : (
                        <Avatar
                          source={{
                            uri: imageProfile.avatar
                              ? imageProfile.avatar.url
                              : `https://api.adorable.io/avatars/50/${profile.name}.png`,
                          }}
                        />
                      )}
                  </>
                )}

              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite seu nome completo"
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
                placeholder="Digite seu e-mail"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => OldpasswordRef.current.focus()}
                value={email}
                onChangeText={setEmail}
              />

              <FormInput
                icon="mail-outline"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Telefone/Celular"
                ref={phoneRef}
                returnKeyType="next"
                onSubmitEditing={() => OldpasswordRef.current.focus()}
                value={phone}
                onChangeText={setPhone}
              />

              <Separator />

              <FormInput
                icon="lock-outline"
                secureTextEntry
                placeholder="Sua senha atual"
                ref={oldPasswordRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                value={oldPassword}
                onChangeText={setOldPassword}
              />

              <FormInput
                icon="lock-outline"
                secureTextEntry
                placeholder="Sua nova senha"
                ref={passwordRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                onSubmitEditing={handleSubmit}
                value={password}
                onChangeText={setPassword}
              />

              <FormInput
                icon="lock-outline"
                secureTextEntry
                placeholder="Confirmação de senha"
                ref={confirmPasswordRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <SubmitButton loading={loading} onPress={handleSubmit}>
                Atualizar Perfil
            </SubmitButton>
            </Form>
          </Container>
        )}
    </Background>
  );
}

ProfileEditAdm.navigationOptions = ({ navigation }) => ({
  title: 'Edite seu perfil',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashboardAdm');
        navigation.openDrawer();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center',
  },

  loadAvatar: {
    flex: 1,
    padding: 100,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
