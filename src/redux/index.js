/** @format */

import { persistCombineReducers } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducer as ToastRedux } from "./ToastRedux";
import { reducer as AppConfigRedux } from "./AppConfigRedux";
import { reducer as UserRedux } from "./UserRedux";
import { reducer as ContactUsRedux } from "./ContactUsRedux";
import { reducer as CategoryRedux } from "./CategoryRedux";
import { reducer as SoundsRedux } from "./SoundsRedux";

import { reducer as PuzzlesRedux } from "./PuzzlesRedux";
import { reducer as QuizzesRedux } from "./QuizzesRedux";
import { reducer as MasterCategoryRedux } from "./MasterCategoryRedux";
import { reducer as MathRedux } from "./MathRedux";
import { reducer as PaymentRedux } from "./PaymentRedux";
import { reducer as DailyActivityRedux } from "./DailyActivityRedux";
import { reducer as StoriesRedux } from "./StoriesRedux";
import { reducer as ActionRedux } from "./ActionRedux";
import { reducer as FactsRedux } from "./FactsRedux";

const config = {
  key: "allInOneLearningForKids",
  storage: AsyncStorage,
  debug: true,
};

export default persistCombineReducers(config, {
  toast: ToastRedux,
  appConfig: AppConfigRedux,
  user: UserRedux,
  contactUs: ContactUsRedux,
  category: CategoryRedux,
  sounds: SoundsRedux,
  puzzles: PuzzlesRedux,
  quizzes: QuizzesRedux,
  masterCategory: MasterCategoryRedux,
  math: MathRedux,
  payment: PaymentRedux,
  dailyActivity: DailyActivityRedux,
  stories: StoriesRedux,
  action: ActionRedux,
  facts: FactsRedux,
});
