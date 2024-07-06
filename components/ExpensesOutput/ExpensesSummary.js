import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesSummary({ expenses, expensePeriod }) {
 
    const expensesSum = expenses.reduce((sum, expense)=>{return sum + expense.amount}, 0);
 
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{expensePeriod}</Text>
            <Text style={styles.sumTotal}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:8,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius:6,
        alignContent:'center'
    },
    period:{
        fontSize:14,
        color:GlobalStyles.colors.primary400,
    },
    sumTotal:{
        fontSize:16,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary500,
    }
});