import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import DocumentScanner from 'react-native-document-scanner-plugin'
import { ResponseType } from 'react-native-document-scanner-plugin';

export default () => {
  const [scannedImage, setScannedImage] = useState<string[]>([]);

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument({
      letUserAdjustCrop: false,
      responseType: ResponseType.Base64,
      croppedImageQuality: 20
    })
  
    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      console.log('sc', scannedImages[0].substring(0, 20))
      const addedTypeImages = scannedImages.map(image => (`data:image/png;base64,${image}`));
      console.log('sc', addedTypeImages[0].substring(0, 20))

      setScannedImage(addedTypeImages)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça o scan de seus documentos</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => scanDocument()}
      >
        <Text style={styles.textButton}>Escanear</Text>
      </TouchableOpacity>
      <Text style={[styles.title, {marginTop: 40}]}>Documentos escaneados</Text>
      <FlatList
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        data={scannedImage}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <Image 
            source={{uri: item}}
            style={styles.image}
          />
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    backgroundColor: '#404040'
  },
  title: {
    fontSize: 40,
    color: '#F4F4F4F4',
    fontWeight: 'bold',
  },
  button: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    backgroundColor: '#00c2f3f4',
    marginTop: 30
  },
  textButton: {
    fontSize: 16,
    color: '#000000',
  },
  list: {
    flex: 1,
    padding: 10,
    width: '100%'
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 15
  }
})