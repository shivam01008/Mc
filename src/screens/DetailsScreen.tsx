import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ProductType} from '../Service/Auth/typess';
import WrapperComponent from '../Utils/WrapperComponent';
import Expanded from '../Componenets/Expanded';
import GeneralInfo from '../Componenets/GeneralInfo';
import LinearGradient from 'react-native-linear-gradient';
import {Img} from '../Utils/Imagepath';

type DetailsScreenRouteProp = RouteProp<
  {DetailsScreen: {product: ProductType}},
  'DetailsScreen'
>;

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {product} = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <LinearGradient
        colors={['#EBF6FF', 'white']}
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === 'ios' ? 0 : 10,
          paddingBottom: Platform.OS === 'ios' ? 0 : 100,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#E4E4E7',
            borderRadius: 100,
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            flexDirection: 'row',
          }}>
          <Image
            source={Img.Home}
            style={{width: 20, height: 20, marginRight: 5}}
          />

          <Text style={{fontWeight: '600', fontSize: 16, marginStart: 2}}>
            {product.rating?.rate ?? 'Product Name'}{' '}
            <Text style={{fontWeight: 'normal'}}>
              ({product.rating?.count ?? '345'})
            </Text>
          </Text>
        </View>

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>

        <Expanded title="Product Description">
          <GeneralInfo
            description={product.description || 'No description available'}
          />
        </Expanded>

        <Expanded title="Category">
          <GeneralInfo description={product.category || 'Not specified'} />
        </Expanded>

        <TouchableOpacity style={[styles.button]} onPress={() =>
                    navigation.navigate('UserHome')
                  }>
          <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
            Buy it now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons]}>
          <Text style={{fontSize: 16, fontWeight: '500', color: '#0487DE'}}>
            Buy it now
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    paddingBottom: 20,
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#0487DE',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 30,
    height: 56,
  },
  buttons: {
    borderColor: '#E4E4E7',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 15,
    height: 56,
    borderWidth: 1,
    color: 'white',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  price: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#444',
  },
});
