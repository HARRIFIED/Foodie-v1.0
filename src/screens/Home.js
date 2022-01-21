import React, {useState} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput, 
  FlatList,
  RefreshControl
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons'
import { COLOURS, Categories, Specials } from '../database/items';
import ActivityIndicatorEg from '../components/ActivityIndicatorEg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';



const Home = ({navigation}) => {
  const [currentSelected, setCurrentSelected] = useState([0]);

    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

  const renderSpecials = ({ item }) => {
    return (
      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
            
      }}
        activeOpacity={0.9}>
        <View
          style={{
            width: 140,
            height: 140,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: COLOURS.white,
            borderRadius: 70,
            margin: 10,
            elevation: 5,
            zIndex: 3,
            elevation: 10,
            
          }}>
          <Image source={item.image} style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}/>
        </View>
        <View style={{
          backgroundColor: COLOURS.white,
          elevation: 5,
          height: 100,
          width: 250,
          opacity: 0.8,
          marginLeft: -95,
          zIndex: 1,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20
        }}>
          <View style={{
            marginTop: 7,
            marginLeft: 100,
            maeginBottom:20
          }}>
            <Text style={{
              fontSize: 18,
              color: COLOURS.black,
              fontWeight: 'bold',
              
            }}>{item.name}</Text>
            <Text style={{
              color: COLOURS.black, 
              fontSize: 13, 
              fontWeight: '100',
              
            }}
              >${item.price}</Text>
          </View>
          <View style={{
            marginLeft: 200,
            borderBottomEndRadius: 20,
            backgroundColor: COLOURS.white,
            
          }}>
            <AntDesign name="pluscircle" style={{
              fontSize: 25,
              color: COLOURS.accent,
              
            }}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderCategories = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setCurrentSelected(index)}>
        <View
          style={{
            width: 120,
            height: 180,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor:
              currentSelected == index ? COLOURS.accent : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}>
          <View style={{width: 60, height: 60}}>
            <Image
              source={item.image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: '600',
            }}>
            {item.name}
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor:
                currentSelected == index ? COLOURS.white : COLOURS.accentRed,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome
              name="angle-right"
              style={{
                fontSize: 12,
                color: currentSelected == index ? COLOURS.black : COLOURS.white,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItems = (data, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={{
          width: '100%',
          height: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() =>
          navigation.push('Details', {
            name: data.name,
            price: data.price,
            image: data.image,
            size: data.size,
            crust: data.crust,
            delivery: data.delivery,
            ingredients: data.ingredients,
            isTopOfTheWeek: data.isTopOfTheWeek,
            navigation: navigation,
          })
        }>
        <View
          style={{
            width: '90%',
            height: 160,
            backgroundColor: COLOURS.white,
            borderRadius: 20,
            elevation: 4,
            position: 'relative',
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 50}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                display: data.isTopOfTheWeek ? 'flex' : 'none',
              }}>
              <FontAwesome
                name="crown"
                style={{
                  fontSize: 10,
                  color: COLOURS.accent,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.black,
                  opacity: 0.8,
                  marginLeft: 5,
                }}>
                top of the week
              </Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                color: COLOURS.black,
                fontWeight: 'bold',
                paddingTop: 10,
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                opacity: 0.5,
              }}>
              {data.weight}
            </Text>
          </View>
          <View style={{width: 150, height: 150, marginRight: -45}}>
            <Image
              source={data.image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 85,
                height: 50,
                backgroundColor: COLOURS.accent,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo
                name="plus"
                style={{fontSize: 18, color: COLOURS.black}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <AntDesign
                name="star"
                style={{fontSize: 12, color: COLOURS.black, paddingRight: 5}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: COLOURS.black,
                  fontWeight: 'bold',
                }}>
                {data.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  


  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOURS.white,
          position: 'relative'
        }} >
          <StatusBar backgroundColor = {COLOURS.white} barStyle = 'dark-content'/>
          <Image source = {require('../database/images/background.png')} style={{
            position: 'absolute',
            top: 0,
            left: -100
          }} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20
          }} >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={{
                width: 50,
                height: 50,
                marginRight: 5
              }}>
                <Image source={require('../database/images/harrison.jpg')} style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  borderRadius: 600,
                }} />
              </TouchableOpacity>
              <Text style={{color: COLOURS.black, fontSize:15}} >Hi, Harrison</Text>
            </View>
            <TouchableOpacity style={{
              flexDirection: 'row',
            }} >
              <View style={{flexDirection: 'row',}}> 
                <FontAwesome name="bell" style={{
                  color: COLOURS.black,
                  fontSize: 28,
                  marginRight: 5
                }} />
              </View>
              <View style={{
                backgroundColor: COLOURS.accent,
                height: 20,
                width: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                
                }}>
                  <Text>4</Text>
                </View>
              <Material name='segment' style={{
                fontSize: 28,
                color: COLOURS.black
              }} />
            </TouchableOpacity>
          </View>
          <View style = {{
            paddingHorizontal: 20, 
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center', 
          }} >
            <Ionicons name = 'search' style={{
              color: COLOURS.black,
              fontSize:20,
              opacity: 0.8
            }} />
            <TextInput placeholder = 'Search...' style={{
              color: COLOURS.black,
              fontSize: 16,
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderBottomColor: COLOURS.black + 20,
              width: '90%',
              marginLeft: 10,
              letterSpacing:1
            }}/>
          </View>
          <Text style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            fontSize: 18,
            fontWeight: '700',
            color: COLOURS.black,
            letterSpacing: 1
          }} >Today's Special</Text>
          <FlatList 
            horizontal={true} 
            data={Specials} 
            renderItem={renderSpecials}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            fontSize: 18,
            fontWeight: '700',
            color: COLOURS.black,
            letterSpacing: 1
          }} >Categories</Text>
          <FlatList 
            horizontal={true} 
            data={Categories} 
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            fontSize: 18,
            fontWeight: '700',
            color: COLOURS.black,
          }} >Popular</Text>
           {Categories[currentSelected].items.map(renderItems)}
           
          <TouchableOpacity 
            style={{
              margin: 30,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}>
            <ActivityIndicatorEg />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOURS.white,
  }
})