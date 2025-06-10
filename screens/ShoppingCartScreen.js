import { View, Text, ScrollView, FlatList } from "react-native";
import ProductShoppingCartCard from "../components/ProductShoppingCartCard";

export default function ShoppingCartScreen({navigation}){
  
  const products =[{
    id: 1,
    productName: "Camisa do Internacional",
    productType: "camisa",
    productPrice: 199.99,
    productNumber: 2,
    productImage: "https://acdn-us.mitiendanube.com/stores/001/402/723/products/46ad91371-749d1d84e172a0717516752739475657-640-0.jpg"
  },
  {
    id: 2,
    productName: "Camisa do Bagual do Sul",
    productType: "camisa",
    productPrice: 300,
    productNumber: 1,
    productImage: "https://acdn-us.mitiendanube.com/stores/001/055/309/products/376fad4f1-57ca58960a0e7750d116645796652096-1024-1024.jpeg"
  },
  {
    id: 3,
    productName: "Camisa do Herobrine",
    productType: "camisa",
    productPrice: 456.33,
    productNumber: 32,
    productImage: "https://acdn-us.mitiendanube.com/stores/002/499/697/products/861-bd968d5ac7fe3915a516898772451723-1024-1024.jpg"
  }];
  
  return(
    <View style={StyleSheet.mainContainer}>
      <ScrollView>
        <View style={styles.listContainer}>
          <Text style={styles.subtitle}>CARRINHO DE COMPRAS</Text>
          <FlatList
            data={products} 
            horizontal={false}
            keyExtractor={(item) => item.productName}
            renderItem={({item}) => {
              return <ProductShoppingCartCard 
                product={{...item}}
                onPress={() => console.log("")}/>
            }}/>
      
        </View>




      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
    },
    list: {
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 500
    },
    listContainer: {
      marginTop: 40,
    }

});

