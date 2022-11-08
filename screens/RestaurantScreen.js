import { View, Text, ScrollView, Image, TouchableOpacity, Animated, Button } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import { selectBasketItems } from '../features/basketSlice';
import FadeInOut from 'react-native-fade-in-out';

const RestaurantScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const {params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_desc,
        dishes,
        long,
        lat
    }} = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    });

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_desc,
            dishes,
            long,
            lat
        }))
    },[dispatch]);

  return (
    <>  
        <BasketIcon/>
        <ScrollView>
            <View className='relative'>
                <Image source={{uri: imgUrl}} className='w-full h-56'/>
                <TouchableOpacity className='absolute top-10 left-5 bg-gray-100 rounded-full p-2' 
                    onPress={() => {navigation.goBack()}}
                >
                    <ArrowLeftIcon size={20} color='#00CCBB'/>
                </TouchableOpacity>
            </View>
            
            <View className='bg-white'>
                <View className='px-4 pt-4'>
                    <Text className='text-3xl font-bold'>{title}</Text>
                    <View className='flex-row space-x-2 my-1'>
                        <View className='flex-row items-center space-x-1'>
                            <StarIcon size={22} opacity={0.5} color='green'/>
                            <Text className='text-xs text-gray-500'>
                                <Text className='text-green-500'>{rating}</Text> {genre}
                            </Text>
                        </View>
                        <View className='flex-row items-center space-x-1'>
                            <MapPinIcon size={22} opacity={0.5} color='green'/>
                            <Text className='text-xs text-gray-500'>Nearby {address}</Text>
                        </View>
                    </View>
                    <Text className='text-gray-500 mt-2 pb-4'>{short_desc}</Text>
                </View>

                <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                    <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20}/>
                    <Text className='pl-2 flex-1 text-md font-bold'>
                        Have a food allergy?
                    </Text>
                    <ChevronRightIcon color='#00CCBB'/>
                </TouchableOpacity>
            </View>
                
            <View className='pb-36'>
                <Text className='px-4 pt-6 mb-3 font-bold text-xl'>
                    Menu
                </Text>
                {/* Dishrow */}
                <DishRow  id={123} name="Testing" description="This is a desc" price={123} image="https://links.papareact.com/gn7"/>
                <DishRow  id={1234} name="Testing" description="This is a desc" price={1234} image="https://links.papareact.com/gn7"/>
                <DishRow  id={12345} name="Testing" description="This is a desc" price={1235} image="https://links.papareact.com/gn7"/>
                <DishRow  id={123456} name="Testing" description="This is a desc" price={1236} image="https://links.papareact.com/gn7"/>
            </View>
        </ScrollView>
    </>
  );
}

export default RestaurantScreen