import Header from "@/components/Header";
import { emptyCart } from "@/redux/Slice/AddtoCartSlice";
import { updateOrder } from "@/redux/Slice/ordersSlice";
import { update_Shoes } from "@/redux/Slice/ShoesSlice";
import { RootState } from "@/redux/store";
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

import telemetry from "@/telemetry";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.data);
  const shoes = useSelector((state: RootState) => state.shoes.data);

  const dispatch = useDispatch()
  const AddOrder = () => {
    const resetCart = shoes.map((item) => {
      return { ...item, quantity: 0 }
    })

    telemetry.track("order_placed", { items: cart.length, total: totalAmount })
    dispatch(updateOrder(cart))
    dispatch(emptyCart([]))
    dispatch(update_Shoes(resetCart))

  }

  const totalAmount = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cart" />

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <View>


          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <>
                {item.quantity !== 0 && (<View style={styles.card}>
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                    }
                    style={styles.image}
                  />

                  <View style={styles.info}>
                    <Text style={styles.name}>
                      {item.brand} {item.model}
                    </Text>

                    <Text style={styles.price}>
                      ₹{item.price.toLocaleString()}
                    </Text>

                    <Text style={styles.quantity}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={styles.quantity}>
                      size: {item.selected_Sizes}
                    </Text>

                  </View>

                </View>)}
              </>

            )}
          />
          <View>

            <View style={{ borderWidth: .3 }} />
            <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between" }}>
              <View>

                <Text style={{ fontSize: 18 }}>
                  Total:
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 18 }}>
                  {`-/ ${totalAmount}`}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={AddOrder}
                style={{
                  backgroundColor: "#2563EB",
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                }}>
                <Text style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 16,
                }}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 16,
    paddingTop: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#777",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  price: {
    marginTop: 6,
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "700",
  },

  quantity: {
    marginTop: 6,
    fontSize: 15,
    color: "#555",
  },
});