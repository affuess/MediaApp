import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShopScreenProps } from '../types/navigation';
import { Product } from '../types/product';
import { getProducts, addProduct, deleteProduct } from '../service/database';
import { ProductCard } from '../components/ProductCard';

export const ShopScreen: React.FC<ShopScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося завантажити товари з БД');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!title.trim() || !price.trim() || !description.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      Alert.alert('Помилка', 'Введіть коректну ціну');
      return;
    }

    try {
      await addProduct({
        title: title.trim(),
        price: numericPrice,
        description: description.trim(),
      });
      setTitle('');
      setPrice('');
      setDescription('');
      await loadProducts();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти товар у БД');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося видалити товар');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>‹ Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Магазин (БД SQLite)</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Назва товару"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Ціна ($)"
          placeholderTextColor="#94a3b8"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Опис товару"
          placeholderTextColor="#94a3b8"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddProduct}>
          <Text style={styles.addBtnText}>Зберегти в БД</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color="#6366f1" size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <ProductCard product={item} onDelete={handleDeleteProduct} />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>База даних порожня. Додайте перший товар!</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#1e293b',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backBtnText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#1e293b',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  addBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
});