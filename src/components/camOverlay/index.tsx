import * as React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Svg, { Circle, Defs, Rect, Mask } from 'react-native-svg';
import { styles } from './styles';
import { design } from '../../global/color.config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DocumentType {
    type: 'FrontID' | 'BackID' | 'SelfiePIC';
}

const CamOverlay = (documentType: DocumentType) => {
    const { height, width } = Dimensions.get('window');
    const circleRadius = width / 2.5;
    const viewBox = `0 0 ${width} ${height}`;

    return documentType.type === 'SelfiePIC' ? (
        <View style={styles.container}>
                <Svg height={height} viewBox={viewBox}>
                    <Defs>
                        <Mask id="mask">
                            <Rect height={height} width={width} fill="#ffffff" />
                            <Circle
                                r={circleRadius}
                                cx={width / 2}
                                cy={height / 3}
                                fill="#000"
                            />
                        </Mask>
                    </Defs>
                    <Rect
                        height={height}
                        width={width}
                        fill="#2a26269f"
                        mask="url(#mask)"
                    />
                </Svg>
                <View style={styles.holdingInstructions}>
                    <Icon
                        style={styles.icon}
                        size={34}
                        name="account-details"
                        color={design.button_text}
                    />
                    <Text style={styles.selfiePicInstructions}>
                       Take a selfie
                    </Text>
                </View>
        </View>
    ) : (
        <View style={styles.container}>
            <View style={[styles.maskFrame, { height: 100 }]} />
            <View style={styles.main}>
                <View style={styles.marginStyle} />
                <View style={styles.grid} />
                <View style={styles.marginStyle} />
            </View>
            <View style={[styles.maskFrame, { height: '90%' }]} />
            <View style={styles.instructions}>
                <Icon
                    style={styles.icon}
                    size={34}
                    name="credit-card"
                    color={design.button_text}
                />
                <Text style={styles.textInstructions}>
                    {documentType.type === 'FrontID'
                        ? 'Take a photo of the front part of your id'
                        : 'Take a photo of the back part of your id'}
                </Text>
            </View>
        </View>
    );
};
export { CamOverlay, DocumentType };
