import Header from "@/components/Header";
import { addToCart } from "@/redux/Slice/AddtoCartSlice";
import { update_Shoes } from "@/redux/Slice/ShoesSlice";
import { RootState } from "@/redux/store";
import { Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";


export default function UserHome() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const shoes = useSelector((state: RootState) => state.shoes.data);
    const cart = useSelector((state: RootState) => state.cart.data);
    const [selectedSizes, setSelectedSizes] = useState<{
        [key: string]: number;
    }>({}); const dispatch = useDispatch()

    const updateCart = (item: any, key: string, id: any) => {
        const data = shoes.map((data: any) => {
            if (data.id == item.id)
                if (key == "add") {

                    return {
                        ...data, quantity: data.quantity + 1, selectedSize: selectedSizes[data.id],
                    }
                } else {
                    return {
                        ...data, quantity:
                            data.quantity > 0
                                ? data.quantity - 1
                                : 0
                    }
                }
            return data
        })

        dispatch(update_Shoes(data))
        dispatch(addToCart({ ...item, selected_Sizes: selectedSizes[id] }))


    }
    const getSizes = (shoeId: string, selectedSize: number) => {
        setSelectedSizes(prev => ({
            ...prev,
            [shoeId]: selectedSize,
        }));
    };
    const filteredShoes =
        selectedCategory === "All"
            ? shoes
            : shoes.filter(
                shoe =>
                    shoe.brand.toLowerCase() === selectedCategory.toLowerCase()
            );

    return (
        <SafeAreaView style={styles.container}>

            <Header title="User" />



            <Text style={styles.sectionTitle}>Featured Shoes</Text>

            <FlatList
                data={filteredShoes}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={
                                typeof item.image === "string"
                                    ? { uri: item.image }
                                    : item.image
                            }
                            style={styles.image}
                        />
                        <Text style={styles.name}>
                            {item.brand} {item.model}
                        </Text>

                        <Text style={styles.price}>
                            ₹{item.price.toLocaleString()}
                        </Text>

                        <View style={styles.sizeRow}>
                            <Text style={styles.sizeLabel}>Sizes:</Text>

                            {item.sizes.map(j => (
                                <TouchableOpacity
                                    key={j}
                                    onPress={() => getSizes(item.id, j)}
                                    style={[
                                        styles.sizeChip,
                                        selectedSizes[item.id] === j && styles.selected,
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: selectedSizes[item.id] === j ? "white" : "black",
                                        }}
                                    >
                                        {j}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>


                        {item.quantity !== 0 ? (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 12,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => { updateCart(item, "remove", item.id) }}
                                    style={{
                                        backgroundColor: "#2563EB",
                                        width: 36,
                                        height: 36,
                                        borderRadius: 18,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Minus size={20} color="#fff" />
                                </TouchableOpacity>

                                <View
                                    style={{
                                        marginHorizontal: 20,
                                        minWidth: 30,
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "700",
                                        }}
                                    >
                                        {item.quantity}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => { updateCart(item, "add", item.id) }}
                                    style={{
                                        backgroundColor: "#2563EB",
                                        width: 36,
                                        height: 36,
                                        borderRadius: 18,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Plus size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ) : (<TouchableOpacity onPress={() => { updateCart(item, "add", item.id) }} style={styles.cartButton}>
                            <Text style={styles.cartText}>Add to Cart</Text>
                        </TouchableOpacity>)}

                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        paddingHorizontal: 18,
        paddingTop: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    greeting: {
        fontSize: 24,
        fontWeight: "700",
    },

    subTitle: {
        color: "#777",
        marginTop: 5,
        fontSize: 15,
    },

    notification: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 25,
        elevation: 3,
    },

    searchContainer: {
        marginBottom: 20,
    },

    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingHorizontal: 18,
        height: 52,
        elevation: 2,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
    },

    categoryButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 12,

        elevation: 2,
    },

    selectedCategory: {
        backgroundColor: "#2563EB",
    },

    categoryText: {
        fontWeight: "600",
        padding: 10
    },

    selectedText: {
        color: "#fff",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginBottom: 18,
        elevation: 3,
    },

    image: {
        width: "100%",
        height: 170,
        resizeMode: "contain",
    },

    name: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 10,
    },

    price: {
        color: "#2563EB",
        fontWeight: "700",
        fontSize: 18,
        marginVertical: 8,
    },

    sizeRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 16,
    },

    sizeLabel: {
        marginRight: 8,
        fontWeight: "600",
    },
    selected: {
        backgroundColor: "#2563EB",
        borderColor: "#2563EB",
    },
    sizeChip: {
        backgroundColor: "#EEF2FF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 8,
        marginTop: 5,
    },

    cartButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    cartText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});