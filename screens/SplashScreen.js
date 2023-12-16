import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const splashImages = [
  require('../assets/Chao1.png'),
  require('../assets/Chao2.png'),
  require('../assets/Chao3.png'),
];

const SplashScreenComponent = ({ onSkip }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(slideIndex);
  };

  const handleSlideChange = index => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: index * screenWidth, animated: true });
    }
  };

  const skipSplashScreen = () => {
    onSkip(); // Gọi callback khi người dùng bấm "Skip"
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {splashImages.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[styles.image, { resizeMode: 'cover' }]}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {splashImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: currentIndex === index ? '#333' : '#ccc' },
            ]}
            onTouchEnd={() => handleSlideChange(index)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={skipSplashScreen} style={styles.skipButton}>
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  skipButton: {
    position: 'absolute',
    top: 730,
    right: 40,
  },
});

export default SplashScreenComponent;
