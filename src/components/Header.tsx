import { Ionicons } from "@expo/vector-icons";
import { GlassView } from 'expo-glass-effect';
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    title: string;
};

export default function Header({ title }: HeaderProps) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", padding: 5, }}>

            <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <GlassView isInteractive style={{ ...StyleSheet.absoluteFill, borderRadius: 100, justifyContent: "center", alignItems: "center" }} >

                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </GlassView>
            </Pressable>
            <View style={{ paddingLeft: 10 }}>

                <Text>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    backButton: {
        flexDirection: "row",
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },

    placeholder: {
        width: 40,
    },
});