import React from 'react';

import {Container, CamButton} from './styles';
import {CamModal, Props} from '../../components/CamModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Home(props: Props) {
  return (
    <Container>
      <CamButton>
        <Icon name="camera" />
        <CamModal
          saveImage={props.saveImage}
          camVisible={props.camVisible}
          handleCamVisible={props.handleCamVisible}
          handleClearImage={props.handleClearImage}
        />
      </CamButton>
    </Container>
  );
}
