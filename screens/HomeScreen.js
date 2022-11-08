import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon ,AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import { SparklesIcon } from "react-native-heroicons/solid";
import Svg, { Path } from 'react-native-svg';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import featured from '../sanity/schemas/featured';
import category from '../sanity/schemas/category';

const HomeScreen = () => {

  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "restaurant"]{
      ...,
    }
    `).then(data => {
      setFeaturedCategories(data);
    });
  }, []);

  // console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className='flex-row pb-3 items-center px-4 space-x-2'>
        <Image source={{uri: 'https://links.papareact.com/wru'}} className='h-7 w-7 bg-gray-300 p-4 rounded-full'/>

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now</Text>
          <Text className='font-bold text-xl'>
            Current Location
            <ChevronDownIcon size={20} color='#00CCBB'/>
          </Text>
        </View>

        <UserIcon size={35} color='#00CCBB'/>
      </View>

      {/* Search */}
      <View className='px-4 flex-row items-center pb-2 space-x-2'>
        <View className='flex-row items-center space-x-2 flex-1 bg-gray-200 p-3'>
          <MagnifyingGlassIcon color='gray'/>
          <TextInput placeholder='Restaurants and cuisines' keyboardType='default'/>
        </View>
        <AdjustmentsVerticalIcon color='#00CCBB'/>
      </View>

      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories/>

        {/* {featuredCategories.map((category) => (
          // console.log(category);
          <FeaturedRow key={category._id} id={category._id} title={category.name} description={category.short_description}/>
        ))} */}
        {/* Featured Rows */}
        <FeaturedRow id="123" title="Featured" description="Paid placements from our partners"/>
        {/* Tasty Discounts */}
        <FeaturedRow id="1234" title="Tasty Discounts" description="Everyone's been enjoying these juicy discounts!"/>
        {/* Offers near you */}
        <FeaturedRow id="12345" title="Offers near you!" description="Why not support your local restaurant tonight!"/>
      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen