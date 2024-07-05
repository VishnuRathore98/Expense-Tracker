import { View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

function ManageExpense({route, navigation}) {
  const editedExpenseId = route.params?.expenseId;
  const isEditable = !!editedExpenseId;
  navigation.setOptions({title: isEditable?'Edit Expense':'Add Expense'});
  return(
    <View>
        {
          isEditable && (<View>
            <IconButton icon="trash" color={GlobalStyles.colors.error500} size={34} onPress={()=>{}}/>
            </View>)
        }
    </View>
    );
}

export default ManageExpense;