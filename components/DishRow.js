import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from "react-currency-formatter";
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({
    id,
    key,
    name,
    description,
    price,
    image
}) => {

    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}))
    }

    const removeItemFromBasket = () => {
        if(!items.length) return;
        dispatch(removeFromBasket({id}));
    }

  return (
    <>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`bg-white border p-4 border-gray-100 ${isPressed && "border-b-0"}`}>
            <View className='flex-row'>
                <View className='flex-1'>
                    <Text className='text-lg mb-1'>{name}</Text>
                    <Text className='text-gray-400'>{description}</Text>
                    <Text className='text-gray-400 mt-2'>
                        <Currency quantity={price} currency='GBP'/>
                    </Text>
                </View>
                <View>
                    <Image source={{uri: image}} className='h-20 w-20 bg-gray-300 p-4' style={{borderWidth: 1, borderColor: 'black'}}/>
                </View>
            </View>
        </TouchableOpacity>

        {isPressed && (
            <View className='bg-white px-4'>
                <View className='flex-row items-center space-x-2 pb-3'>
                    <TouchableOpacity onPress={removeItemFromBasket}>
                        <MinusCircleIcon size={40} color={items.length > 0 ? "#00CCBB" : "gray"}/>
                    </TouchableOpacity>
                    <Text>{items.length}</Text>
                    <TouchableOpacity onPress={addItemToBasket}>
                        <PlusCircleIcon size={40} color='#00CCBB'/>
                    </TouchableOpacity>
                </View>
            </View>
        )}
    </>
    
  )
}

export default DishRow