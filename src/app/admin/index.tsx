import Header from "@/components/Header";
import { update_Shoes } from "@/redux/Slice/ShoesSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import AddShoe from "./addShoe";


export default function AdminHome() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  const [selectedShoe, setSelectedShoe] = useState<any>([]);
  const shoes = useSelector((state: RootState) => state.shoes.data);
  const deleteItem = (item: any) => {
    const NewData = shoes.filter((data) => {
      return data.id !== item.id
    })
    dispatch(update_Shoes(NewData))
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Admin" />
      <FlatList
        data={shoes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>ShoeCart Admin</Text>

            <View style={styles.inventoryCard}>
              <View>
                <Text style={styles.inventoryTitle}>Inventory</Text>
                <Text style={styles.inventoryCount}>
                  {shoes.length} Shoes Available
                </Text>
              </View>

              <TouchableOpacity onPress={() => {
                setSelectedShoe([])
                setVisible(true)
              }} style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add New Shoe</Text>
              </TouchableOpacity>
            </View>
          </>
        }
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
            <Text style={styles.brand}>{item.brand}</Text>

            <Text style={styles.model}>{item.model}</Text>

            <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>

            <Text style={styles.sizeLabel}>Available Sizes</Text>

            <View style={styles.sizeRow}>
              {item.sizes.map((size) => (
                <View key={size} style={styles.sizeChip}>
                  <Text style={styles.sizeText}>{size}</Text>
                </View>
              ))}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => {
                setVisible(true)
                setSelectedShoe([item])


              }} style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { deleteItem(item) }} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <AddShoe setVisible={setVisible} selectedShoe={selectedShoe} visible={visible} setSelectedShoe={setSelectedShoe} />

          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  title: {
    marginBottom: 25,
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 15,
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 25,
  },

  inventoryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  inventoryTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  inventoryCount: {
    color: "#6B7280",
    marginTop: 4,
  },

  addButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 170,
    resizeMode: "contain",
    marginBottom: 15,
  },

  brand: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  model: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 3,
  },

  price: {
    fontSize: 20,
    color: "#2563EB",
    fontWeight: "bold",
    marginTop: 10,
  },

  sizeLabel: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "600",
  },

  sizeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  sizeChip: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },

  sizeText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },

  editButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});