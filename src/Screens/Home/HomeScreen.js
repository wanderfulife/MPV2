import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import useAuth from "../../Hooks/UseAuth";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef();
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState()

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Information");
        }
      }),
    []
  );

  useEffect(() => {
   onSnapshot(doc(db, "users", user.uid), (snapshot) => {
     if (snapshot.exists()) {
       setSearch(snapshot.data().research);
       console.log(search)
     }
   });
 }, [])


  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub =  onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs.filter(doc => doc.data().research !== search && doc.id !== user.uid ).map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      });
    };
    
    fetchCards();
    return unsub;
  }, [search]);

  console.log(profiles)

  return (
    <SafeAreaView className={safeArea}>
      {/* HEADER */}
      <View className={header}>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="ios-settings-outline" size={30} color="#4ade80" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Information")}>
          <Text className={logo}>MORE PAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#4ade80" />
        </TouchableOpacity>
      </View>

      {/* SWIPER */}
      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => console.log("swipe next")}
          onSwipedRight={() => console.log("swipe hire")}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "HIRE",
              style: {
                label: {
                  color: "#4ade80"
                }
              }
            }
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.id} className="relative h-3/4 rounded-xl">
                <Image
                  className="absolute top-0 h-full w-full rounded-xl"
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={styles.cardShadow}
                  className="absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl"
                >
                  <View>
                    <Text className="text-xl  font-bold">
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text className="text-2xl  font-bold">{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                className="relative bg-white h-3/4 rounded-xl justify-center items-center"
                style={styles.cardShadow}
              >
                <Text className="font-bold pb-5">No more profiles</Text>
                <Image
                  className="h-20 w-full"
                  height={100}
                  width={100}
                  source={require("./../../../assets/emoji.jpg")}
                />
              </View>
            )
          }
        />
      </View>

      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          className="absolute bottom-4 left-20 items-center justify-center rounded-full w-16 h-16 bg-red-200"
        >
          <Entypo name="cross" color="red" size={26} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          className="absolute bottom-4 right-20 items-center justify-center rounded-full w-16 h-16 bg-green-200"
        >
          <MaterialCommunityIcons name="cash-fast" size={26} color="#4ade80" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const header = "p-4 items-center justify-around flex-row";
const logo = "text-green-400 font-bold text-2xl";
const safeArea = "flex-1";

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
