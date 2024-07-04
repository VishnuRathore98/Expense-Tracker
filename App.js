import { NavigationContainer, } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { useState } from "react";
import { GlobalStyles } from "./constants/styles";
import { StatusBar, Text } from "react-native";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  const [isAllExpensesSelected, setAllExpensesSelected] = useState(false);
  const [isRecentExpensesSelected, setRecentExpensesSelected] = useState(false);
  
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor})=><IconButton icon="add" color={tintColor} size={24} onPress={()=>{}}/>,
      }}
    >
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          headerTitle: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon({ color, size }) {
            return (
              <Icon
                name={isAllExpensesSelected ? "calendar" : "calendar-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          headerTitle: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name={
                  isRecentExpensesSelected ? "hourglass" : "hourglass-outline"
                }
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
