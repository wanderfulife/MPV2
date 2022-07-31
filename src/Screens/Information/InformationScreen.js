import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image
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

const InformationScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [choice, setChoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonChoice, setButtonChoice] = useState(false);
  const navigation = useNavigation();
  const {user} = useAuth()

  const incompleteForm = !name || !city || !occupation || !age || !imageUrl || !choice;
  

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: name,
      age: age,
      city: city,
      job: occupation,
      research: choice,
      photoURL: imageUrl,
      timestamp: serverTimestamp()
    }).then(() => {
      navigation.goBack()
    }).catch(error => alert(error.message))
  }

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
          console.log("firebased");
        });
    }
  };

  return (
    <SafeAreaView className="items-center">
      <View className="flex-1 p-4">
        <View className="items-center pb-10">
          <Text className={logo}>MORE PAY</Text>
        </View>

        <TextInput
          className="text-xl"
          value={name}
          onChangeText={setName}
          placeholder="Name"
        ></TextInput>
        <TextInput
          className="text-xl mt-8"
          value={age}
          onChangeText={setAge}
          placeholder="Age"
        ></TextInput>
        <TextInput
          className="text-xl mt-8"
          value={city}
          onChangeText={setCity}
          placeholder="City"
        ></TextInput>
        <TextInput
          className="text-xl mt-8"
          value={occupation}
          onChangeText={setOccupation}
          placeholder="Occupation"
        ></TextInput>
        <Text className="text-xl mt-8 text-gray-400">Looking for :</Text>

        <View className="flex-row justify-around mt-4">
          <TouchableOpacity
            onPress={() => {
              setChoice("employer");
              setButtonChoice((prev) => !prev);
            }}
            className={!buttonChoice ? choiceButtonDisabled : jobButton}
          >
            <Text className={textJobButton}>Job</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setChoice("employee");
              setButtonChoice((prev) => !prev);
            }}
            className={buttonChoice ? choiceButtonDisabled : staffButton}
          >
            <Text className={textJobButton}>Staff</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center p-4">
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              className="rounded-full w-20 h-20 "
            />
          ) : (
            <TouchableOpacity className={imageButton} onPress={pickImage}>
              {!loading ? (
                <Text className="text-center text-white font-bold">
                  Pick an image
                </Text>
              ) : (
                <Text className="text-center text-white font-bold">
                  Image loading...
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity
        disabled={incompleteForm}
        className={incompleteForm ? updateButtonDisabled : updateButton}
        onPress={updateUserProfile}
      >
        <Text className="text-center text-white font-bold text-xl">
          Update Profile
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InformationScreen;

const logo = " text-green-400 font-bold text-2xl pt-1";
const jobButton = "p-2 rounded-2xl my-2 w-36 mr-1 bg-green-400";
const staffButton = "p-2 rounded-xl my-2 w-36 ml-1 bg-indigo-500";
const choiceButtonDisabled = "p-2 rounded-xl my-2 w-36 ml-1 bg-gray-500";

const imageButton = "p-2 rounded-xl bg-gray-300 mt-1 w-36 ";
const textJobButton = "text-center text-xl text-white p-2 font-bold";
const updateButtonDisabled = " bg-gray-300 w-64 rounded-xl p-3 items-center";
const updateButton = " bg-red-400 w-64 rounded-xl p-3 items-center";
