import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scaleToDeviceWidth} from '../Utils/Responsive';
import DeviceDimensions from '../Config/DeviceDimensions';
import {Img} from '../Utils/Imagepath'

type ProductCardProps = {
  item: any;
  cart: Record<string, number>;
  handleAddToCart: (id: string) => void;
  handleRemoveFromCart: (id: string) => void;
  onPress: () => void;
};

const ProductGrid: React.FC<ProductCardProps> = ({
  item,
  cart,
  handleAddToCart,
  handleRemoveFromCart,
  onPress,
}) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
      onPress={onPress}>
      <View style={{borderRadius: 10}}>
        <Image
          source={{uri: item.image || 'https://example.com/default-image.jpg'}}
          resizeMode="cover"
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.wishlistIcon}>
          {/* <Image source={Img.heart} style={styles.heartIcon} /> */}
        </TouchableOpacity>

        <View
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}>
          {cart[item.id] ? (
            <View style={styles.cartOverlay}>
              <TouchableOpacity
                style={styles.cartButtons}
                onPress={() => handleRemoveFromCart(item.id)}>
                <Text style={styles.cartButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.cartCount}>{cart[item.id]}</Text>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => handleAddToCart(item.id)}>
                <Text style={styles.cartButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButtonOverlay}
              onPress={() => handleAddToCart(item.id)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>
        <Image source={Img.Home} style={styles.starIcon} />
        <Text style={{marginStart: -4}}>
            <Text style={{fontWeight:'600',fontSize:16}} >   {item.rating.rate || 'Product Name'}</Text>
            <Text>({item.rating?.count ?? '345'})</Text>
            </Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.title || 'Product Name'}
        </Text>
        <Text style={styles.price}>₹ {item.price || '800'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width:
      Platform.OS == 'android'
        ? scaleToDeviceWidth(DeviceDimensions.deviceWidth * 0.43)
        : DeviceDimensions.deviceWidth * 0.43,
        borderWidth:1,
        marginTop:10
        ,borderColor:'#E2E8F0',
        padding:2,
        borderRadius:10
  },
  productImage: {
    width:
      Platform.OS == 'android'
        ? scaleToDeviceWidth(DeviceDimensions.deviceWidth * 0.42)
        : DeviceDimensions.deviceWidth * 0.43,
    height: null,
    aspectRatio: 1,
    borderRadius: 10,
  },
  wishlistIcon: {
    padding: 6,
    borderRadius: 20,
    marginBottom: 8,
    position: 'absolute',
    right: 10,
  },

  heartIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  infoContainer: {
    paddingVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
 
    marginBottom: 2,
  },
  starIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
   
  },
  title: {
    fontSize: 14,
    color: 'black',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0487DE',
    marginTop: 5,
    
  },
  cartOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  cartButton: {
    backgroundColor: '#0487DE',
    width: 24,
    height: 24,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtons: {
    backgroundColor: '#0487DE',
    width: 24,
    height: 24,
    borderTopLeftRadius: 8,
    borderBottomStartRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 6,
  },
  addButtonOverlay: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#0487DE',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductGrid;
