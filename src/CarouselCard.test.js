import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';
import Carousel from './Carousel';

// Smoke test for Card component
test('renders Card component without crashing', () => {
  render(
    <Card
      caption="Test Caption"
      src="test-image.jpg"
      currNum={1}
      totalNum={3}
    />
  );
});

// Snapshot test for Card component
test('matches snapshot for Card component', () => {
  const { container } = render(
    <Card
      caption="Test Caption"
      src="test-image.jpg"
      currNum={1}
      totalNum={3}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

// Smoke test for Carousel component
test('renders Carousel component without crashing', () => {
  render(
    <Carousel
      photos={[
        { src: 'image1.jpg', caption: 'Image 1' },
        { src: 'image2.jpg', caption: 'Image 2' },
        { src: 'image3.jpg', caption: 'Image 3' },
      ]}
      title="Test Carousel"
    />
  );
});

// Snapshot test for Carousel component
test('matches snapshot for Carousel component', () => {
  const { container } = render(
    <Carousel
      photos={[
        { src: 'image1.jpg', caption: 'Image 1' },
        { src: 'image2.jpg', caption: 'Image 2' },
        { src: 'image3.jpg', caption: 'Image 3' },
      ]}
      title="Test Carousel"
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

// Failing test for left arrow bug
test('clicking left arrow moves to previous image', () => {
    const photos = [
      { src: 'image1.jpg', caption: 'Image 1' },
      { src: 'image2.jpg', caption: 'Image 2' },
      { src: 'image3.jpg', caption: 'Image 3' },
    ];
    const { getByTestId, getByAltText } = render(
      <Carousel photos={photos} title="Test Carousel" />
    );
  
    // Navigate to the second image
    fireEvent.click(getByAltText('Image 2'));
  
    // Click the left arrow
    fireEvent.click(getByTestId('left-arrow'));
  
    // Check if we are now on the first image
    expect(getByAltText('Image 1')).toBeInTheDocument();
  });

  // Failing test to check if left arrow is missing when on the first image
test('left arrow is missing when on the first image', () => {
    const photos = [
      { src: 'image1.jpg', caption: 'Image 1' },
      { src: 'image2.jpg', caption: 'Image 2' },
      { src: 'image3.jpg', caption: 'Image 3' },
    ];
    const { queryByTestId } = render(
      <Carousel photos={photos} title="Test Carousel" />
    );
  
    // Check if left arrow is missing
    expect(queryByTestId('left-arrow')).toBeNull();
  });
  
  // Failing test to check if right arrow is missing when on the last image
  test('right arrow is missing when on the last image', () => {
    const photos = [
      { src: 'image1.jpg', caption: 'Image 1' },
      { src: 'image2.jpg', caption: 'Image 2' },
      { src: 'image3.jpg', caption: 'Image 3' },
    ];
    const { queryByTestId } = render(
      <Carousel photos={photos} title="Test Carousel" />
    );
  
    // Navigate to the last image
    fireEvent.click(queryByAltText('Image 3'));
  
    // Check if right arrow is missing
    expect(queryByTestId('right-arrow')).toBeNull();
  });
