import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";

export default function ExpenseForm({
  onCancel,
  submitButtonLabel,
  onSubmit,
  initialData,
}) {
  const [inputValues, setInputValues] = useState({
    amount: initialData ? initialData.amount.toString() : "",
    date: initialData ? initialData.date.toISOString() : "",
    description: initialData ? initialData.description : "",
  });

  function inputValueHandler(identifier, value) {
    setInputValues({
      ...inputValues,
      [identifier]: value,
    });
  }

  function submitHandler() {
    const expense = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    
    const isAmountValid = !isNaN(expense.amount) && expense.amount>0;
    const isDateValid = expense.date.toString() !== "Invalid Date";
    const isDescriptionValid = expense.description.trim().length > 0;
    
    if(isAmountValid && isDateValid && isDescriptionValid){
      onSubmit(expense);
    }else{
      Alert.alert('Invalid input','Please check your input values!');
    }
    
  }

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.innerContainer}>
          <Input
            style={styles.rowInput}
            label="Amount"
            inputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputValueHandler.bind(this, "amount"),
              value: inputValues.amount,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Date"
            inputConfig={{
              keyboardType: "number-pad",
              maxLength: 10,
              placeholder: "YYYY-MM-DD",
              onChangeText: inputValueHandler.bind(this, "date"),
              value: inputValues.date,
            }}
          />
        </View>
        <Input
          label="Description"
          inputConfig={{
            multiline: true,
            onChangeText: inputValueHandler.bind(this, "description"),
            value: inputValues.description,
          }}
          style={{ minHeight: 100, textAlignVertical: "top" }}
        />
        {/*  */}
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 18,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
