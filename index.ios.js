/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicatorIOS,
} from 'react-native';

const ProgressBar = require('ProgressBarAndroid');
const Platform = require('Platform');

const RNFS = require('react-native-fs');
const FileOpener = require('react-native-file-opener');

const SavePath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
const ProgressIndicator = Platform.OS === 'ios' ? ActivityIndicatorIOS : ProgressBar;


const sampleImageFileURL = 'https://github.com/huangzuizui/react-native-file-opener-demo/blob/master/sample/sample.jpg?raw=true';
const sampleDocFileURL = 'https://github.com/huangzuizui/react-native-file-opener-demo/blob/master/sample/sample.doc?raw=true';

const sampleImageFilePath = SavePath + '/sample.jpg';
const sampleDocFilePath = SavePath + '/sample.doc';

class testApp25 extends Component {
    constructor (props) {
        super(props);

        this.state = {
            imageLoaded: false,
            docLoaded: false,
            imageLoading: false,
            docLoading: false,
        };
    }

    getSampleImage () {

        this.setState({
            imageLoading: true
        });

        RNFS.downloadFile(
            sampleImageFileURL,
            sampleImageFilePath
        ).then(() => {
            this.setState({
                imageLoaded: true,
            });
        });

    }

    getSampleDoc () {

        this.setState({
            docLoading: true
        });

        RNFS.downloadFile(
            sampleDocFileURL,
            sampleDocFilePath
        ).then(() => {
            this.setState({
                docLoaded: true,
            });
        });

    }

    openSampleImage () {
        FileOpener.open(
            sampleImageFilePath,
            'image/jpeg'
        ).then(() => {
            console.log('success!!');
        },(e) => {
            console.log('error!!');
        });

    }

    openSampleDoc () {
        FileOpener.open(
            sampleDocFilePath,
            'application/msword'
        ).then(() => {
            console.log('success!!');
        },(e) => {
            console.log('error!!');
        });

    }
    render() {
        return (
            <View style={styles.container}>
                {!this.state.imageLoaded && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.getSampleImage.bind(this)}>
                        {this.state.imageLoading && (
                            <ProgressIndicator />
                        )}
                        <Text>get image file </Text>
                    </TouchableOpacity>
                )}
                {this.state.imageLoaded && (
                    <TouchableOpacity
                        style={[styles.button, styles.buttonOrangeBorder]}
                        onPress={this.openSampleImage.bind(this)}>
                        <Text style={styles.textColor}>open image file</Text>
                    </TouchableOpacity>
                )}
                {!this.state.docLoaded && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.getSampleDoc.bind(this)}>
                        {this.state.docLoading && (
                            <ProgressIndicator />
                        )}
                        <Text>get doc file {this.state.docLoadedPercentage}</Text>
                    </TouchableOpacity>
                )}
                {this.state.docLoaded && (
                    <TouchableOpacity
                        style={[styles.button, styles.buttonOrangeBorder]}
                        onPress={this.openSampleDoc.bind(this)}>
                        <Text style={styles.textColor}>open doc file</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        margin: 10,
        borderWidth: 1,
        borderColor: '#333333',
    },
    buttonOrangeBorder: {
        borderColor: '#ff6600'
    },
    textColor: {
        color: '#ff6600'
    }
});

AppRegistry.registerComponent('testApp25', () => testApp25);
