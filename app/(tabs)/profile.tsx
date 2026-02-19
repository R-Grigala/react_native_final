import AppButton from "@/components/appButton/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const AVATAR_STORAGE_KEY = "profile_avatar_uri";

  useEffect(() => {
    const loadUser = async () => {
      try {
        const registered = await AsyncStorage.getItem("user");
        if (registered) {
          const data = JSON.parse(registered);
          setUsername(data.username ?? null);
        }
      } catch {
        setUsername(null);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const storedUri = await AsyncStorage.getItem(AVATAR_STORAGE_KEY);
        setAvatarUri(storedUri || null);
      } catch {
        setAvatarUri(null);
      }
    };
    loadAvatar();
  }, []);

  const persistAvatar = async (uri: string | null) => {
    setAvatarUri(uri);
    try {
      if (!uri) {
        await AsyncStorage.removeItem(AVATAR_STORAGE_KEY);
      } else {
        await AsyncStorage.setItem(AVATAR_STORAGE_KEY, uri);
      }
    } catch (error) {
      console.error("Avatar persist error:", error);
    }
  };

  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "ნებართვა საჭიროა",
        "გალერეიდან სურათის ასარჩევად საჭიროა მედია-ბიბლიოთეკაზე წვდომა.",
        [{ text: "კარგი", style: "default" }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      await persistAvatar(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "ნებართვა საჭიროა",
        "კამერით სურათის გადასაღებად საჭიროა კამერაზე წვდომა.",
        [{ text: "კარგი", style: "default" }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      await persistAvatar(result.assets[0].uri);
    }
  };

  const removeAvatar = async () => {
    if (!avatarUri) return;
    Alert.alert("ავატარის წაშლა", "გსურთ ავატარის წაშლა?", [
      { text: "გაუქმება", style: "cancel" },
      {
        text: "წაშლა",
        style: "destructive",
        onPress: () => {
          void persistAvatar(null);
        },
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/(auth)");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const initial = (username?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatar}
            contentFit="cover"
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>{initial}</Text>
          </View>
        )}
      </View>
      <Text style={styles.username}>{username ?? "მომხმარებელი არ მოიძებნა"}</Text>
      <AppButton
        title="სურათის არჩევა"
        handlePress={() => {
          void pickFromLibrary();
        }}
        activeOpacity={0.8}
      />
      <AppButton
        title="კამერით გადაღება"
        handlePress={() => {
          void takePhoto();
        }}
        activeOpacity={0.8}
      />
      {!!avatarUri && (
        <AppButton
          title="ავატარის წაშლა"
          handlePress={() => {
            void removeAvatar();
          }}
          activeOpacity={0.8}
        />
      )}
      <AppButton
        title="გასვლა"
        handlePress={handleLogout}
        activeOpacity={0.8}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
  },
  avatarRow: {
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e5e7eb",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    color: "white",
    fontSize: 40,
    fontWeight: "800",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  username: {
    textAlign: "center",
    fontSize: 24,
    color: "#4b5563",
    fontWeight: "600",
    marginBottom: 24,
  },
});