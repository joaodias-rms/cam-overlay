import * as React from 'react';
import moment from 'moment';
import {Alert, View, TouchableOpacity, Modal} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {CamOverlay} from '../camOverlay';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface PicturesProps {
  uri: string;
  name: string;
  type: string;
  path: string;
}

export interface Props {
  saveImage: (pic: PicturesProps[]) => void;
  image?: PicturesProps;
  camVisible: boolean;
  handleCamVisible: () => void;
  handleClearImage: () => void;
  handleModalVisible?: () => void;
  modalVisible?: boolean;
}

export const CamModal = (props: Props) => {
  const [camera, setCamera] = React.useState('back');
  const [documentType, setDocumentType] = React.useState<
    'FrontID' | 'BackID' | 'SelfiePIC'
  >('FrontID');
  const [flash, setFlash] = React.useState(false);
  const [picture, setPicture] = React.useState<PicturesProps[]>([]);
  let refCamera = React.useRef(null);

  const handleChangeCamera = () => {
    camera == 'back' ? setCamera('front') : setCamera('back');
  };
  const handleChangeFlash = () => {
    flash == false ? setFlash(true) : setFlash(false);
  };

  const takePicture = async function () {
    const options = {quality: 0.5, base64: true};
    const data = await refCamera.takePictureAsync(options);
    const pic = {
      uri: data.base64,
      name: `anexo${moment().format('DD-MM-YYYY')}`,
      type: 'image',
      path: data.uri,
    };
    // props.saveImage(pic);
    if (documentType === 'FrontID') {
      Alert.alert(i18n.t('success'), i18n.t('CamSucess'), [
        {
          text: 'ok',
          onPress: () => {
            setPicture(prevState => [...prevState, pic]);
            setDocumentType('BackID');
          },
        },
      ]);
    } else if (documentType === 'BackID') {
      Alert.alert(i18n.t('success'), i18n.t('CamSucess'), [
        {
          text: 'ok',
          onPress: () => {
            setPicture(prevState => [...prevState, pic]);
            setDocumentType('SelfiePIC');
            setCamera('front');
          },
        },
      ]);
    } else {
      setDocumentType('FrontID');
      Alert.alert(i18n.t('success'), i18n.t('CamSucess'), [
        {
          text: 'ok',
          onPress: () => {
            setPicture(prevState => [...prevState, pic]);
            setDocumentType('FrontID');
            setCamera('back');
            props.handleCamVisible();
          },
        },
      ]);
    }
    return (
      <Modal visible={props.camVisible}>
        <View style={styles.ContainerModal}>
          <View style={styles.Header}>
            <TouchableOpacity
              style={styles.button}
              onPress={props.handleCamVisible}>
              <Icon name="close" style={styles.buttonIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleChangeFlash()}>
              <Icon
                name={flash ? 'flash' : 'flash-off'}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleChangeCamera()}>
              <Icon name="camera-switch" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.Main}>
            <RNCamera
              ref={ref => {
                refCamera = ref;
              }}
              style={styles.image}
              type={
                camera == 'back'
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
              }
              flashMode={
                flash == false
                  ? RNCamera.Constants.FlashMode.off
                  : RNCamera.Constants.FlashMode.on
              }
            />
            <CamOverlay type={documentType} />
          </View>
          <View style={styles.Footer}>
            <TouchableOpacity
              style={styles.centerIcon}
              onPress={() => takePicture()}>
              <Icon name="camera" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.background}
            onPress={props.handleCamVisible}
          />
        </View>
      </Modal>
    );
  };
};
