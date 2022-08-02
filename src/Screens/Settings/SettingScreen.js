import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import useAuth from "../../Hooks/UseAuth";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { Feather } from "@expo/vector-icons";

const SettingScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [lookingForJob, setLookingForJob] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true
    })
  })

  const incompleteForm = !name || !city || !occupation || !age || !imageUrl;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: name,
      age: age,
      city: city,
      job: occupation,
      lookingForJob: lookingForJob,
      photoURL: imageUrl,
      timestamp: serverTimestamp()
    })
      .then(() => {
        console.log("User created in Firestore Database");

        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    setLoading(true);
    if (!result.cancelled) {
      const reference = ref(storage, user.uid);
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(reference, bytes);
      await getDownloadURL(reference)
        .then((x) => {
          setImageUrl(x);
          setLoading(false);
        })
        .finally(() => {
          console.log("Picture uploaded in Firebase storage");
        });
    }
  };

  return (
    <SafeAreaView className="items-center">
      <View className="flex-1 ">
        <View className="items-center pb-6">
          <Text className={logo}>MORE PAY</Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View className="items-center pb-6">
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  className="rounded-full w-20 h-20 "
                />
              ) : (
                <TouchableOpacity
                  className="rounded-full bg-gray-300 p-3"
                  onPress={pickImage}
                >
                  {!loading ? (
                    <MaterialCommunityIcons
                      name="camera-plus-outline"
                      size={24}
                      color="#9CA3AF"
                    />
                  ) : (
                    <Feather name="loader" size={24} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              className="text-xl text-green-400 pb-6 font-bold"
              value={name}
              onChangeText={setName}
              placeholder="Name"
            ></TextInput>
            <TextInput
              className="text-xl text-green-400 pb-6 font-bold"
              value={age}
              onChangeText={setAge}
              placeholder="Age"
            ></TextInput>
            <TextInput
              className="text-xl text-green-400 pb-6 font-bold"
              value={city}
              onChangeText={setCity}
              placeholder="City"
            ></TextInput>
            <TextInput
              className="text-xl text-green-400 pb-6 font-bold"
              value={occupation}
              onChangeText={setOccupation}
              placeholder="Occupation"
            ></TextInput>
            <View className="items-center">
              <Text className="text-xl mt-6 text-green-400 font-bold">
                Looking for :
              </Text>
            </View>

            <View className="flex-row justify-around mt-4">
              <TouchableOpacity
                onPress={() => {
                  setLookingForJob(true);
                }}
                className={lookingForJob ? jobButton : choiceButtonDisabled}
              >
                <Text className={textJobButton}>Job</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLookingForJob(false);
                }}
                className={lookingForJob ? choiceButtonDisabled : staffButton}
              >
                <Text className={textJobButton}>Staff</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View className="items-center pt-6">
          <TouchableOpacity
            disabled={incompleteForm}
            className={incompleteForm ? updateButtonDisabled : updateButton}
            onPress={updateUserProfile}
          >
            <Text className="text-center text-white font-bold text-xl">
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const logo = " text-green-400 font-bold text-2xl pt-1";
const jobButton = "p-2 rounded-xl my-2 w-36 mr-1 bg-green-400";
const choiceButtonDisabled = "p-2 rounded-xl my-2 w-36 mr-1 bg-gray-500";
const staffButton = "p-2 rounded-xl my-2 w-36 mr-1 bg-green-400";

const imageButton = "p-2 rounded-xl bg-gray-300 mt-1 w-36 ";
const textJobButton = "text-center text-xl text-white p-2 font-bold";
const updateButtonDisabled = " bg-gray-300 w-64 rounded-xl p-3  items-center";
const updateButton = " bg-indigo-600 w-64 rounded-xl p-3  items-center";
