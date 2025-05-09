import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Expanded from '../Componenets/Expanded';
import GeneralInfo from '../Componenets/GeneralInfo';

const { width } = Dimensions.get('window');

interface ImageData {
  id: number;
  source: any;
}

const images: ImageData[] = [
  { id: 1, source: { uri: 'https://example.com/path/to/your/image.jpg' } },
  { id: 2, source: { uri: 'https://example.com/path/to/another/image.jpg' } },
];

const ProductDetails: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<ImageData>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { colors, dark: isDark } = useTheme();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex < images.length - 1 ? prevIndex + 1 : 0;
        flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: isDark ? '#121212' : '#E2E8F0'},
      ]}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Image source={item.source} style={styles.productImage} />
          )}
          onScroll={handleScroll}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />

        <TouchableOpacity
          onPress={goBack}
          style={styles.leftIcon}
          accessible={true}
          accessibilityLabel="Go back">
          <Image
            source={require('../src/Image/backpress.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.heartIcon}>
          <Image
            source={
              liked
                ? require('../src/Image/heart_filled.png') // Use your heart icon
                : require('../src/Image/heart_outline.png')
            }
            style={styles.image}
          />
        </TouchableOpacity> */}

        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === index ? '#007AFF' : '#E0EAF5',
                },
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <LinearGradient
        colors={['#EBF6FF', 'white']}
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : 10,
          paddingBottom: Platform.OS === 'ios' ? 0 : 100,
        }}>
        <View style={styles.productInfo}>
          <View
            style={[
              styles.rating,
              {
                borderWidth: 1,
                borderColor: '#E4E4E7',
                borderRadius: 100,
                padding: 10,
                marginEnd: 10,
                width: '28%',
              },
            ]}>
            <Text
              style={[
                styles.ratingText,
                {color: isDark ? '#E4E4E7' : 'grey', paddingEnd: 10},
              ]}>
              <Text
                style={{fontWeight: 'bold', color: isDark ? '#fff' : '#000'}}>
                4.9{' '}
              </Text>
              (345)
            </Text>
          </View>

          <Text
            style={[styles.productTitle, {color: isDark ? '#fff' : '#000'}]}>
            Apple iPhone 15 Pro 128GB Natural{'\n'}Titanium
          </Text>
          <Text style={[styles.price, {color: isDark ? '#fff' : '#000'}]}>
            ₹800
          </Text>
        </View>

        <Expanded title="Product Description">
          <GeneralInfo description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..." />
        </Expanded>

        <Expanded title="Key Features">
          <GeneralInfo description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..." />
        </Expanded>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buyButton}
           >
            <Text
              style={[
                styles.buyButtonText,
                {color: isDark ? 'black' : 'white'},
              ]}>
              Buy it now
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cartButton,
              {
                backgroundColor: isDark ? 'black' : 'white',
                borderColor: isDark ? 'black' : '#429DDA',
              },
            ]}
           >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </View>
          </TouchableOpacity>

          <View style={{marginBottom: Platform.OS === 'ios' ? 50 : 0}} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  cartButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
  },
  cartButtonText: {
    color: '#429DDA',
    fontSize: 18,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#0487DE',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buyButtonText: {
    fontSize: 18,
  },
  leftIcon: {
    position: 'absolute',
    top: 5,
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 50,
  },
  image: {
    width: 44,
    height: 44,
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 50,
    elevation: 4,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: width,
    height: 390,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    padding: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 25,
  },
  productInfo: {
    padding: 5,
    marginHorizontal: 10,
    width: '100%',
    paddingTop: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
});

export default ProductDetails;
