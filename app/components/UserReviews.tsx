import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Review {
  id: string;
  review: string;
  rating: number;
  date: string;
}

const UserReviews = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleSubmitReview = () => {
    if (review && rating) {
      setReviews(prev => [
        ...prev,
        { id: Math.random().toString(), review, rating, date: new Date().toLocaleString() },
      ]);
      setReview('');
      setRating(0);
    } else {
      alert('Please provide both a review and rating.');
    }
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewBox}>
      <Text style={styles.reviewText}>{item.review}</Text>
      <View style={styles.ratingContainer}>
        {[...Array(item.rating)].map((_, index) => (
          <Ionicons key={index} name="star" size={20} color="gold" />
        ))}
      </View>
      <Text style={styles.reviewDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leave a Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={review}
        onChangeText={setReview}
        multiline
      />
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons name={rating >= star ? 'star' : 'star-outline'} size={30} color="gold" />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleSubmitReview} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={item => item.id}
        style={styles.reviewList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewBox: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  reviewList: {
    marginTop: 20,
  },
});

export default UserReviews;
