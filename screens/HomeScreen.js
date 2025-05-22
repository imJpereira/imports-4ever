import { View, FlatList, StyleSheet, Text, ScrollView } from "react-native";
import ProductCard from "../components/ProductCard";
import MiniProductType from "../components/MiniProductType";
import MiniSportCard from "../components/MIniSportCard";


export default function HomeScreen({navigation}) {

    const products = [
        {
          id: 1,
          name: "Camisa do Brasil",
          description: "Camisa oficial da seleção brasileira 2024",
          review: 4.5,
          price: 199.90,
          discount: 20,
          finalPrice: 159.92,
          category: "Futebol",
          brand: "Nike",
          stock: 25,
          image: "https://acdn-us.mitiendanube.com/stores/001/055/309/products/376fad4f1-57ca58960a0e7750d116645796652096-1024-1024.jpeg",
          tags: ["camisa", "seleção", "brasil"],
          createdAt: "2025-05-10",
          updatedAt: "2025-05-11",
          isAvailable: true,
          soldCount: 132
        },
        {
          id: 2,
          name: "Camisa do Real Madrid",
          description: "Camisa branca tradicional do Real Madrid temporada 23/24",
          review: 4.7,
          price: 249.90,
          discount: 15,
          finalPrice: 212.42,
          category: "Futebol",
          brand: "Adidas",
          stock: 40,
          image: "https://acdn-us.mitiendanube.com/stores/001/402/723/products/46ad91371-749d1d84e172a0717516752739475657-640-0.jpg",
          tags: ["camisa", "real madrid", "espanha"],
          createdAt: "2025-04-20",
          updatedAt: "2025-05-01",
          isAvailable: true,
          soldCount: 95
        },
        {
          id: 3,
          name: "Camisa do Flamengo",
          description: "Camisa rubro-negra retro 1990",
          review: 4.6,
          price: 189.90,
          discount: 10,
          finalPrice: 170.91,
          category: "Futebol",
          brand: "Adidas",
          stock: 30,
          image: "https://acdn-us.mitiendanube.com/stores/002/499/697/products/861-bd968d5ac7fe3915a516898772451723-1024-1024.jpg",
          tags: ["flamengo", "brasileirão", "camisa"],
          createdAt: "2025-03-15",
          updatedAt: "2025-04-01",
          isAvailable: true,
          soldCount: 210
        },
        {
          id: 4,
          name: "Camisa do Barcelona",
          description: "Camisa preta 2024",
          review: 4.8,
          price: 229.90,
          discount: 18,
          finalPrice: 188.52,
          category: "Futebol",
          brand: "Nike",
          stock: 22,
          image: "https://acdn-us.mitiendanube.com/stores/001/055/309/products/camisa-do-barcelona-nike-2024-2025-away-2-fora-reserva-ii-segunda-preta-vermelha-azul-torcedor-masculina-homem-uniforme-original-oficial-lancamento-nova-qualidade-roque-1-78a9a4646481b1866517181507277091-1024-1024.jpg",
          tags: ["barcelona", "espanha", "camisa"],
          createdAt: "2025-04-10",
          updatedAt: "2025-05-10",
          isAvailable: true,
          soldCount: 160
        },
        // {
        //   id: 5,
        //   name: "Camisa do Manchester United",
        //   description: "Camisa vermelha oficial 2024 com escudo bordado",
        //   review: 4.3,
        //   price: 219.90,
        //   discount: 25,
        //   finalPrice: 164.92,
        //   category: "Futebol",
        //   brand: "Adidas",
        //   stock: 35,
        //   images: ["/images/manunited-1.jpg"],
        //   tags: ["manchester", "camisa", "premier league"],
        //   createdAt: "2025-03-30",
        //   updatedAt: "2025-04-15",
        //   isAvailable: true,
        //   soldCount: 85
        // },
        // {
        //   id: 6,
        //   name: "Camisa do Palmeiras",
        //   description: "Camisa verde com detalhes dourados 2024",
        //   review: 4.9,
        //   price: 199.90,
        //   discount: 10,
        //   finalPrice: 179.91,
        //   category: "Futebol",
        //   brand: "Puma",
        //   stock: 28,
        //   images: ["/images/palmeiras-1.jpg"],
        //   tags: ["palmeiras", "camisa", "brasileirão"],
        //   createdAt: "2025-05-01",
        //   updatedAt: "2025-05-08",
        //   isAvailable: true,
        //   soldCount: 105
        // },
        // {
        //   id: 7,
        //   name: "Camisa da Argentina",
        //   description: "Camisa oficial campeã da Copa do Mundo 2022",
        //   review: 4.4,
        //   price: 239.90,
        //   discount: 20,
        //   finalPrice: 191.92,
        //   category: "Futebol",
        //   brand: "Adidas",
        //   stock: 18,
        //   images: ["/images/argentina-1.jpg"],
        //   tags: ["argentina", "seleção", "camisa"],
        //   createdAt: "2025-04-05",
        //   updatedAt: "2025-04-12",
        //   isAvailable: true,
        //   soldCount: 140
        // },
        // {
        //   id: 8,
        //   name: "Camisa do PSG",
        //   description: "Camisa azul com detalhes vermelhos da temporada 2024",
        //   review: 4.2,
        //   price: 219.90,
        //   discount: 12,
        //   finalPrice: 193.51,
        //   category: "Futebol",
        //   brand: "Nike",
        //   stock: 26,
        //   images: ["/images/psg-1.jpg"],
        //   tags: ["psg", "camisa", "mbappé"],
        //   createdAt: "2025-03-20",
        //   updatedAt: "2025-04-01",
        //   isAvailable: true,
        //   soldCount: 78
        // },
        // {
        //   id: 9,
        //   name: "Camisa do Corinthians",
        //   description: "Camisa branca com detalhes pretos 2024",
        //   review: 4.1,
        //   price: 189.90,
        //   discount: 15,
        //   finalPrice: 161.42,
        //   category: "Futebol",
        //   brand: "Nike",
        //   stock: 32,
        //   images: ["/images/corinthians-1.jpg"],
        //   tags: ["corinthians", "brasil", "camisa"],
        //   createdAt: "2025-04-25",
        //   updatedAt: "2025-05-05",
        //   isAvailable: true,
        //   soldCount: 120
        // },
        // {
        //   id: 10,
        //   name: "Camisa do Chelsea",
        //   description: "Camisa azul royal com logo dourado 2024",
        //   review: 4.0,
        //   price: 209.90,
        //   discount: 10,
        //   finalPrice: 188.91,
        //   category: "Futebol",
        //   brand: "Nike",
        //   stock: 20,
        //   images: ["/images/chelsea-1.jpg"],
        //   tags: ["chelsea", "camisa", "inglaterra"],
        //   createdAt: "2025-03-28",
        //   updatedAt: "2025-04-10",
        //   isAvailable: true,
        //   soldCount: 66
        // },
        // {
        //   id: 11,
        //   name: "Camisa da Alemanha",
        //   description: "Camisa branca com listras pretas 2024",
        //   review: 4.6,
        //   price: 229.90,
        //   discount: 18,
        //   finalPrice: 188.52,
        //   category: "Futebol",
        //   brand: "Adidas",
        //   stock: 15,
        //   images: ["/images/alemanha-1.jpg"],
        //   tags: ["alemanha", "camisa", "seleção"],
        //   createdAt: "2025-04-18",
        //   updatedAt: "2025-05-02",
        //   isAvailable: true,
        //   soldCount: 74
        // }
      ];

    const types = [
      {
        id: 1,
        name: "Camisetas",
        url: "adwada",
      },
      {
        id: 2,
        name: "Jerseys",
        url: "wdawdadad",
      },
      {
        id: 3,
        name: "Tênis",
        url: "wdawdadad",
      },
      {
        id: 4,
        name: "Moletons",
        url: "wdawdadad",
      },
    ]

    const sports = [
      {
        id:1,
        name: "Futebol",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi265r_m06jfKFVfeFfl-Uh-QefekUUfMBhw&s"
      },
      {
        id:2,
        name: "Basquete",
        url: "https://imageio.forbes.com/specials-images/imageserve/63a269a972a478f92cc9d405/From-Getty--Ja-Morant--12-of-the-Memphis-Grizzlies-looks-on-against-the-Minnesota/0x0.jpg?format=jpg&width=960"
      },
      {
        id:3,
        name: "Futebol Americano",
        url: "https://i.guim.co.uk/img/media/6e53c57c9faf11bd8e373956b0a9407b65321bd5/0_95_2193_1315/master/2193.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=dade40f44c419742c8714bcf2c034f58"
      },
      {
        id:4,
        name: "Hóquei",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Connor_McDavid_2-FEB-2022.jpg/1200px-Connor_McDavid_2-FEB-2022.jpg"
      },
    ]
      
    return(
        <View style={styles.mainContainer}>
          <ScrollView style={styles.baseScroll}>
            <View style={styles.listContainer}>
              <Text style={styles.subtitle}>MAIS VISTOS</Text>
              <FlatList 
                  data={products}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.name}
                  renderItem={({item}) => {
                      return <ProductCard
                              product={{...item}}
                              onPress={() => console.log("")} 
                              />
                  }}
                  contentContainerStyle={styles.list}                
              />  
            </View>      

            <View style={styles.listContainer}>
              <Text style={styles.subtitle}>CATEGORIAS</Text>
              <FlatList 
                  data={types}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => {
                      return <MiniProductType
                              type={{...item}}
                              onPress={() => console.log("")} 
                              />
                  }}
                  contentContainerStyle={styles.list}                
              />  
            </View>

            <View style={styles.listContainer}>
              <Text style={styles.subtitle}>BUSQUE POR ESPORTE </Text>
              <FlatList 
                  data={sports}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.name}
                  renderItem={({item}) => {
                      return <MiniSportCard
                              sport={{...item}}
                              onPress={() => console.log("")} 
                              />
                  }}
                  contentContainerStyle={styles.list}                
              />  
            </View>
          
          </ScrollView>                 
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        padding: 10,
    },
    baseScroll: {
      marginBottom: 20,
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
