import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import useAuth from "../../Hooks/UseAuth";
import {
  AntDesign,
  Entypo,
  Ionicons,
  SimpleLineIcons
} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { shouldUseActivityState } from "react-native-screens";

const DUMMY_DATA = [
  {
    firstName: "Sonny",
    lastName: "Sangha",
    job: "Software Developer",
    photoURL:
      "data:image/jpeg;base64,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 ",
    age: 28,
    id: 1
  },
  {
    firstName: "peter",
    lastName: "Pan",
    job: "Flyer",
    photoURL:
      "https://static.wikia.nocookie.net/disney/images/5/5e/Profile_-_Peter_Pan.jpeg/revision/latest?cb=20190312151341",
    age: 32,
    id: 2
  },
  {
    firstName: "Jimmy",
    lastName: "Hendrix",
    job: "Guitarist",
    photoURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QDeRXhpZgAASUkqAAgAAAACAA4BAgCwAAAAJgAAABIBAwABAAAAAQAAAAAAAABBbWVyaWNhbiBndWl0YXJpc3QsIHNpbmdlciBhbmQgc29uZ3dyaXRlciBKaW1pIEhlbmRyaXggKDE5NDIgLSAxOTcwKSBhcnJpdmVzIGF0IEhlYXRocm93IEFpcnBvcnQsIExvbmRvbiwgMjd0aCBBdWd1c3QgMTk3MC4gKFBob3RvIGJ5IENlbnRyYWwgUHJlc3MvSHVsdG9uIEFyY2hpdmUvR2V0dHkgSW1hZ2VzKf/tAPRQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAA2BwCUAANQ2VudHJhbCBQcmVzcxwCeACwQW1lcmljYW4gZ3VpdGFyaXN0LCBzaW5nZXIgYW5kIHNvbmd3cml0ZXIgSmltaSBIZW5kcml4ICgxOTQyIC0gMTk3MCkgYXJyaXZlcyBhdCBIZWF0aHJvdyBBaXJwb3J0LCBMb25kb24sIDI3dGggQXVndXN0IDE5NzAuIChQaG90byBieSBDZW50cmFsIFByZXNzL0h1bHRvbiBBcmNoaXZlL0dldHR5IEltYWdlcykcAm4ADEdldHR5IEltYWdlc//hBS5odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiAgIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMiIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI4NjIyNDIzNTYiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmdldHR5aW1hZ2VzLmNvbS9ldWxhP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+Q2VudHJhbCBQcmVzczwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PGRjOmRlc2NyaXB0aW9uPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+QW1lcmljYW4gZ3VpdGFyaXN0LCBzaW5nZXIgYW5kIHNvbmd3cml0ZXIgSmltaSBIZW5kcml4ICgxOTQyIC0gMTk3MCkgYXJyaXZlcyBhdCBIZWF0aHJvdyBBaXJwb3J0LCBMb25kb24sIDI3dGggQXVndXN0IDE5NzAuIChQaG90byBieSBDZW50cmFsIFByZXNzL0h1bHRvbiBBcmNoaXZlL0dldHR5IEltYWdlcyk8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzpkZXNjcmlwdGlvbj4KPHBsdXM6TGljZW5zb3I+PHJkZjpTZXE+PHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+PHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuZ2V0dHlpbWFnZXMuY29tL2RldGFpbC84NjIyNDIzNTY/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZjpEZXNjcmlw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",
    age: 27,
    id: 3
  }
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className={safeArea}>
      {/* HEADER */}
      <View className={header}>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="ios-settings-outline" size={30} color="#4ade80" />
        </TouchableOpacity>
        <TouchableOpacity className="">
          <Text className={logo}>MORE PAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#4ade80" />
        </TouchableOpacity>
      </View>

      {/* SWIPER */}
      <View className="flex-1 -mt-10">
        <Swiper
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
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
          renderCard={(card) => (
            <View key={card.id} className="relative h-3/4 rounded-xl">
              <Image
                className="absolute top-0 h-full w-full rounded-xl"
                source={{ uri: card.photoURL }}
              />
              <View style={styles.cardShadow}>
                <View>
                  <Text className="text-xl  font-bold">{card.firstName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text className="text-2xl  font-bold">{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const header = "p-4 items-center justify-around flex-row";
const logo = "text-green-400 font-bold text-2xl";
const safeArea = "flex-1 bg-indigo-600";

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
  }
});
