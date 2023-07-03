<?php
$validNum1 = false;
$validNum2 = false;
$num1 = null;
$num2 = null;

while (!$validNum1 || !$validNum2) {
    if (!$validNum1) {
        echo "Enter a number: ";
        $inputNum1 = trim(fgets(STDIN));
        if (is_numeric($inputNum1)) {
            $validNum1 = true;
            $num1 = $inputNum1;
        } else {
            echo "Please enter a valid number.\n";
        }
    }

    if (!$validNum2) {
        echo "Enter another number: ";
        $inputNum2 = trim(fgets(STDIN));
        if (is_numeric($inputNum2)) {
            $validNum2 = true;
            $num2 = $inputNum2;
        } else {
            echo " Please enter a valid number.\n";
        }
    }
}

$result = $num1 * $num2;
echo "Result: $result\n";
?>