import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm({
  onCancel,
  submitButtonLabel,
  onSubmit,
  initialData,

}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: initialData ? initialData.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: initialData ? initialData.date.toISOString() : "",
      isValid: true,
    },
    description: {
      value: initialData ? initialData.description : "",
      isValid: true,
    },
  });

  function inputValueHandler(identifier, value) {
    setInputs((curInputs)=> {return{
      ...curInputs,
      [identifier]: { value: value, isValid: true },
    }});
  }

  function submitHandler() {
    const expense = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expense.amount) && expense.amount > 0;
    const isDateValid = expense.date.toString() !== "Invalid Date";
    const isDescriptionValid = expense.description.trim().length > 0;

    if (isAmountValid && isDateValid && isDescriptionValid) {
      onSubmit(expense);
    } else {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: isAmountValid },
          date: { value: curInputs.date.value, isValid: isDateValid },
          description: {
            value: curInputs.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
      return;
    }
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.innerContainer}>
          <Input
            style={styles.rowInput}
            label="Amount"
            invalid={!inputs.date.isValid}
            inputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputValueHandler.bind(this, "amount"),
              value: inputs.amount.value,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Date"
            invalid={!inputs.date.isValid}
            inputConfig={{
              keyboardType: "number-pad",
              maxLength: 10,
              placeholder: "YYYY-MM-DD",
              onChangeText: inputValueHandler.bind(this, "date"),
              value: inputs.date.value,
            }}
          />
        </View>
        <Input
          label="Description"
          invalid={!inputs.date.isValid}
          inputConfig={{
            multiline: true,
            onChangeText: inputValueHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
          style={{ minHeight: 100, textAlignVertical: "top" }}
        />

        {formIsInvalid && (
          <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
        )}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
