import { Dimensions, StyleSheet } from 'react-native';
import { design } from '../../global/theme/color.config';

const window = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    maskFrame: { backgroundColor: '#00000070', width: '100%'},
    grid: {
        alignItems: 'center',
        top: 0,
        left: 0,
        borderColor: '#fff',
        borderWidth: 8,
        width: '90%',
        height: (2 * (window - 80)) / 3,
        borderRadius: 10
    },
    container: {
        width: '100%',
        position: 'absolute'
    },
    main: {
        width: '100%',
        flexDirection: 'row'
    },
    marginStyle: {
        backgroundColor: '#00000070',
        width: '5%',
        height: (2 * (window - 80)) / 3
    },
    instructions: {
        zIndex: 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: -110,
        right: 0,
        left: 0
    },
    textInstructions: {
        textAlign: 'center',
        color: design.button_text,
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 35
    },
    icon: { marginTop: 30 },
    holdingInstructions: {
        position: 'absolute',
        top: 400,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selfiePicInstructions: {
        color: design.button_text,
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 35,
        width: '100%',
        height: 65,
        textAlign: 'center'
    }
});
