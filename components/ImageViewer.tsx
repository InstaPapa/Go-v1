import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  theme?: 'start' | 'mainRunner';
  imgSource: ImageSource;
};

export default function ImageViewer({ theme, imgSource }: Props) {
  // Выбираем стиль в зависимости от темы
  const imageStyle = theme === 'mainRunner' 
    ? [styles.image, styles.imageRunner] 
    : styles.image;

  return <Image source={imgSource} style={imageStyle} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  imageRunner: {
    width: 400,
    height: 480  // Переопределяем ширину для mainRunner
    // height остаётся 440 из базового стиля
    // borderRadius остаётся 18 из базового стиля
  },
});