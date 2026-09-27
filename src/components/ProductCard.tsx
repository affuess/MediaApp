import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types/product';

interface Props {
  product: Product;
  onDelete: (id: number) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteBtn} 
        onPress={() => product.id && onDelete(product.id)}
      >
        <Text style={styles.deleteBtnText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  price: {
    fontSize: 16,
    color: '#22c55e',
    marginVertical: 4,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
  },
  deleteBtn: {
    backgroundColor: '#334155',
    padding: 10,
    borderRadius: 8,
  },
  deleteBtnText: {
    fontSize: 16,
  },
});