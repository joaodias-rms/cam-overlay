import DocumentPicker, {
    DocumentPickerResponse
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { PicturesProps } from '../../../contract/components/selfie/ModalCam';
var RNFS = require('react-native-fs');

interface Props {
    saveImage: (Image: PicturesProps[]) => void;
}
export const getImageFromLib = async (props: Props) => {
    const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images]
    });
    
    const { fs } = RNFetchBlob;
    
    let base64: any;
    
    let imageCollection: PicturesProps[] = [];
    async function saveImageCollection(imageCollect: DocumentPickerResponse) {
        if (imageCollect.uri.startsWith('content://')) {
            
            const fileName = imageCollect.name;
            const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
            
            await fs.exists(destPath).then(async exist=>{
                if(exist){
                   await fs.readFile(destPath, 'base64').then(data => {
                       base64 = data
                    });

                }else{
                    await RNFS.copyFile(imageCollect.uri, destPath);
                    await fs.readFile(destPath, 'base64').then(data => {
                        base64 = data;
                    });
                    
                }
            })

            
            
            const nameFormatted = imageCollect.uri.split('/').pop();
            const typeFormatted = imageCollect.uri.split('.').pop();

            const image: PicturesProps = {
                uri: base64,
                name: imageCollect.name ? nameFormatted! : imageCollect.name!,
                type: imageCollect.type ? typeFormatted! :  imageCollect.type,
                path: imageCollect.uri
            };
            console.log(image);
            
            imageCollection.push(image);
        } else {
            await fs.readFile(imageCollect.uri, 'base64').then(data => {
                base64 = data;
            });

            const nameFormatted = imageCollect.uri.split('/').pop();
            const typeFormatted = imageCollect.uri.split('.').pop();
            const image: PicturesProps = {
                uri: base64,
                name: imageCollect.name ? imageCollect.name : nameFormatted!,
                type: imageCollect.type ? imageCollect.type : typeFormatted!,
                path: imageCollect.uri
            };

            imageCollection.push(image);
            console.log(imageCollection);
            
        }
    }

    results.forEach(picture => {
        saveImageCollection(picture);
    });
    
    props.saveImage(imageCollection);
};

export default getImageFromLib;
