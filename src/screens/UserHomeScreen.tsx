import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  Alert,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import WrapperComponent from '../Utils/WrapperComponent';
import {getProducts} from '../Service/Auth/getProducts';
import {ProductType} from '../Service/Auth/typess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Img} from '../Utils/Imagepath';
import ProductGrid from '../Componenets/ProductGrid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserHomeScreen = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false); // Add refreshing state
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    if (result.status) {
      setProducts(result.response || []);
      setFilteredProducts(result.response || []);
    } else {
      console.error(result.message || 'Failed to fetch products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Back Button Handler (for Android)
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        const backAction = () => {
          Alert.alert('Exit App', 'Do you want to exit the app?', [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        };

        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );

        return () => backHandler.remove();
      }
    }, []),
  );

  // Handle Add and Remove from Cart
  const handleAddToCart = (id: string) => {
    setCart(prevCart => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prevCart => {
      const newCart = {...prevCart};
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  // Search Handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredProducts(products);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredProducts(filtered);
    }
  };

  // Logout Confirmation
  const handleLogout = () => {
    setModalVisible(true); // Show confirmation modal
  };

  const confirmLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Error clearing token:', error);
    }
    setModalVisible(false); // Close the modal after logout
  };

  const cancelLogout = () => {
    setModalVisible(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts(); // Re-fetch the products
    setRefreshing(false); // Stop refreshing indicator
  };

  return (
    <WrapperComponent>
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={styles.overView}>Products</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={Img.drawer} style={{width: 40, height: 40}} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 10}}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Products"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#CBD5E1" 

            
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View style={{marginHorizontal: 20}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={filteredProducts}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{
                paddingBottom: screenHeight * 0.2 + insets.bottom, // 10% screen height + safe area
              }}              onRefresh={handleRefresh} // Handle pull to refresh
              refreshing={refreshing} // Show refresh indicator when refreshing
              renderItem={({item}) => (
                <ProductGrid
                  item={item}
                  cart={cart}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  onPress={() =>
                    navigation.navigate('DetailsScreen', {product: item})
                  }
                />
              )}
              
            />
          </View>
        )}

        {/* Logout Confirmation Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent={true}
          onRequestClose={cancelLogout}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* <Text style={styles.modalText}>
              Are you sure to logout?
              </Text> */}
              <View style={styles.modalHeader}>
        <Text style={styles.modalText}>Are you sure to logout?</Text>
        <TouchableOpacity onPress={cancelLogout}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonss}
                  onPress={cancelLogout}>
                  <Text style={[styles.buttonText,{color:'#0487DE'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmLogout}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  overView: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  searchInput: {
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
    paddingHorizontal: 20,
    color: '#CBD5E1',
  // <-- this controls the text color
    backgroundColor: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    

  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight:'bold'
  },
  modalButtons: {

    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonss: {
    padding: 10,
    backgroundColor: '#EBF6FF',
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#0487DE',
    marginBottom:15
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  
  closeIcon: {
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 10,

  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold'
  },
});

export default UserHomeScreen;
