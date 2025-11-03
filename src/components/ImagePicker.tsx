import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Options,
  openCamera,
  openPicker,
  Image as ResponseImage,
} from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { Icon } from './Icon';
import { cn } from '@/utils/cn';
import { Text } from './Text';
import { SecondaryBottom } from './SecondaryButton';
import { PrimaryBottom } from './PrimaryBottom';
import Toast from 'react-native-toast-message';

type Props = {
  className?: string;
  image: ResponseImage | string | undefined;
  setImage:
    | Dispatch<SetStateAction<ResponseImage | string | undefined>>
    | Dispatch<SetStateAction<ResponseImage | undefined>>;
  errorMessage?: string;
};

export const ImagePicker = ({
  className,
  image,
  errorMessage,
  setImage,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prev => !prev);

  const commonOption: Options = {
    mediaType: 'photo',
    width: 300,
    height: 300,
    cropping: true,
  };

  const handleCamera = async () => {
    try {
      setShowModal(false);

      setTimeout(async () => {
        const result = await openCamera({
          cameraType: 'back',
          ...commonOption,
        });

        if (result) {
          setImage(result);
        }
      }, 400);
    } catch (err) {
      console.log('camera err', err);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Unable to open camera',
      });
    }
  };

  const handleGallery = async () => {
    try {
      setShowModal(false);

      setTimeout(async () => {
        const result = await openPicker({
          ...commonOption,
        });

        if (result) {
          console.log(result);
          setImage(result);
        }
      }, 400);
    } catch (err) {
      console.log('camera err', err);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Unable to open camera',
      });
    }
  };

  return (
    <View className="gap-1.5 pt-4">
      <View className="flex-row items-center gap-2">
        <Text
          className={`text-lg font-semibold text-slate-800 dark:text-white`}
          value={'Image'}
        />
        <Text className="font-bold text-red-500" value={'*'} />
      </View>
      <Pressable
        className={cn(
          'aspect-square min-h-64 w-[100%] items-center justify-center overflow-hidden rounded-xl bg-white object-cover dark:bg-slate-800',
          className,
        )}
        onPress={toggleModal}
      >
        {image ? (
          <Image
            className="aspect-square h-full w-full object-cover"
            source={{ uri: typeof image === 'string' ? image : image.path }}
          />
        ) : (
          <Icon name="camera" size={40} />
        )}
      </Pressable>
      <Text
        className="text-sm font-semibold text-red-500"
        value={errorMessage}
      />
      <Modal
        style={styles.modal}
        isVisible={showModal}
        onBackdropPress={toggleModal}
      >
        <View className="min-h-30 rounded-t-xl bg-white px-6 pt-6 dark:bg-slate-700">
          <Text
            className="mb-8 text-center text-lg"
            value="Please Choose and Take Photo"
          />

          <View className="mb-safe-offset-6 gap-5">
            <SecondaryBottom title="Take from Camera" onPress={handleCamera} />
            <PrimaryBottom title="Pick from Gallery" onPress={handleGallery} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'flex-end' },
});
