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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";
import { db } from "../../../firebase";
import generateId from "../../Lib/generateId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef();
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState();

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Information");
        }
      }),
    []
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (snapshot.exists()) {
          setSearch(snapshot.data().research);
        }
      }),
    []
  );

  useEffect(() => {
    let cancel = true;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["NotEmpty"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["NotEmpty"];

      onSnapshot(
        query(
          collection(db, "users"),
          where(
            "id",
            "not-in",
            [...passedUserIds, ...swipedUserIds].splice(0, 10)
          )
        ),
        (snapshot) => {
          if (cancel) {
            setProfiles(
              snapshot.docs
                .filter(
                  (doc) => doc.data().research !== search && doc.id !== user.uid
                )
                .map((doc) => ({
                  id: doc.id,
                  ...doc.data()
                }))
            );
          }
        }
      );
    };

    fetchCards();
    return () => cancel = false;
  
  }, [search]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    console.log(`You swiped Pass on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists()) {
          console.log(`Hooray you MATCHED with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp()
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped
          });
        } else {
          console.log(
            `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
          );
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };
  return (
    <SafeAreaView className={safeArea}>
      {/* HEADER */}
      <View className={header}>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="ios-settings-outline" size={30} color="#4ade80" />
        </TouchableOpacity>
        <TouchableOpacity >
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
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH");
            swipeRight(cardIndex);
          }}
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
                <View style={styles.cardShadow}>
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
              <View style={styles.nocardShadow}>
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
    elevation: 2,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFF",
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  nocardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    position: "relative",
    bottom: 0,
    backgroundColor: "#FFF",
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  }
});

// green #4ade80 // purple #4f46e5