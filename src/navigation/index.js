import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Color } from '@common';
import { log } from "@common/Tools";

import LoginScreen from '@screen/LoginScreen';
import CategoryScreen from '@screen/CategoryScreen';
import SubCategoryScreen from '@screen/SubCategoryScreen';
import DetailScreen from '@screen/DetailScreen';
import PuzzleScreen from '@screen/PuzzleScreen';
import CompassScreen from '@screen/CompassScreen';
import SubscriptionScreen from '@screen/SubscriptionScreen';
import PuzzleListScreen from '@screen/PuzzleListScreen';
import QuizScreen from '@screen/QuizScreen';
import SoundCategoriesScreen from '@screen/SoundCategoriesScreen';
import SoundsScreen from '@screen/SoundsScreen';
import HomeScreen from '@screen/HomeScreen';
import MathScreen from '@screen/MathScreen';
import FillImageScreen from '@screen/FillImageScreen';
import DailyActivityScreen from '@screen/DailyActivityScreen';
import StoriesListScreen from '@screen/StoriesListScreen';
import StoriesScreen from '@screen/StoriesScreen';
import FactsScreen from '@screen/FactsScreen';
import FillImageListScreen from '@screen/FillImageListScreen';
import SudokuScreen from '@screen/SudokuScreen';
import FindDifferenceScreen from '@screen/FindDifferenceScreen';
import PuzzleMasterListScreen from '@screen/PuzzleMasterListScreen';

const Stack = createNativeStackNavigator();

function MainNavigation({ navigation, user }) {
  // log('-----------MainNavigation user MainNavigation----------')
  // log(user)
  // alert(JSON.stringify(user))
  // log(Object.keys(user.userConfigResult).length == 0)
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={Color.white} />
      <Stack.Navigator
        screenOptions={{ animationEnabled: false }}
        mode='modal'
        Setting
        headerMode="screen"
      >
        {(user !== '' && user !== null) ?
          <>
            <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='LoginScreen'
              component={LoginScreen}
              options={{ headerShown: false }}
            />

          </>
          :
          <>
            <Stack.Screen
              name='LoginScreen'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{ headerShown: false }}
            />

          </>
        }
        <Stack.Screen
          name='CategoryScreen'
          component={CategoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SubCategoryScreen'
          component={SubCategoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='DetailScreen'
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PuzzleScreen'
          component={PuzzleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CompassScreen'
          component={CompassScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SubscriptionScreen'
          component={SubscriptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PuzzleListScreen'
          component={PuzzleListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='QuizScreen'
          component={QuizScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SoundCategoriesScreen'
          component={SoundCategoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SoundsScreen'
          component={SoundsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MathScreen'
          component={MathScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FillImageScreen'
          component={FillImageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='DailyActivityScreen'
          component={DailyActivityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='StoriesListScreen'
          component={StoriesListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='StoriesScreen'
          component={StoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FactsScreen'
          component={FactsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FillImageListScreen'
          component={FillImageListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SudokuScreen'
          component={SudokuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FindDifferenceScreen'
          component={FindDifferenceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PuzzleMasterListScreen'
          component={PuzzleMasterListScreen}
          options={{ headerShown: false }}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
