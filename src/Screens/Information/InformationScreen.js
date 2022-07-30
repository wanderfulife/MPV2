import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useState } from "react";
import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import useAuth from "../../Hooks/UseAuth";

const InformationScreen = () => {
  const [imageUrl, setImageUrl] = useState();
  const { user } = useAuth();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      reference = ref(storage, user.uid);
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(reference, bytes);
      await getDownloadURL(reference)
        .then((x) => {
          setImageUrl(x);
          console.log(x);
        })
        .finally(() => {
          console.log("firebased pictured");
        });
    }
  };

  return (
    <SafeAreaView>
      <View className="flex-1 p-4">
        <View className="items-center pb-10">
          <Text className={logo}>MORE PAY</Text>
        </View>

        <TextInput
          className="text-xl "
          placeholder="Name"
        ></TextInput>
        <TextInput className="text-xl mt-8" placeholder="Age"></TextInput>
        <TextInput className="text-xl mt-8" placeholder="City"></TextInput>

        <TextInput
          className="text-xl mt-8"
          placeholder="Occupation"
        ></TextInput>
        <Text className="text-xl mt-8 text-gray-400">Looking for :</Text>
        <View className="flex-row justify-around mt-4">
          <TouchableOpacity className={loginButton}>
            <Text className={topTextInput}>Job</Text>
          </TouchableOpacity>
          <TouchableOpacity className={staffButton}>
            <Text className={topTextInput}>Staff</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center pt-10">
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              className="rounded-full w-20 h-20 "
            />
          ) : (
            <TouchableOpacity className={imageButton} onPress={pickImage}>
              <Text className="text-center text-gray-400">
                Pick an image from camera roll
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InformationScreen;

const logo = " text-green-400 font-bold text-2xl pt-1";
const loginButton = "p-2 rounded-2xl my-2 w-36 bg-green-400";
const staffButton = "p-2 rounded-2xl my-2 w-36 bg-indigo-500";
const imageButton = "p-2 rounded-2xl my-2 w-36 border";


const topTextInput = "text-center text-white font-bold m-2";
