import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RoleSelection() {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>👟</Text>

            <Text style={styles.title}>Shoe Mart</Text>
            <Text style={styles.subtitle}>
                Select the role you want to continue with
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    router.push("/admin")
                }} style={[styles.button, styles.adminButton]}>
                    <Text style={styles.buttonText}>Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    router.push("/user")
                }} style={[styles.button, styles.userButton]}>
                    <Text style={styles.buttonText}>User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    logo: {
        fontSize: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#111827",
    },
    subtitle: {
        fontSize: 16,
        color: "#6B7280",
        marginTop: 8,
        marginBottom: 40,
        textAlign: "center",
    },
    buttonContainer: {
        alignItems: "center",
        width: "100%",
        gap: 20,
    },
    button: {
        width: "100%",
        padding: 18,
        borderRadius: 16,
        alignItems: "center",
        elevation: 4,
    },
    adminButton: {
        backgroundColor: "#2563EB",
    },
    userButton: {
        backgroundColor: "#10B981",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});