import java.util.*;
public class HelloWorld {
    static boolean hill(int number1, int number2, int number3, int number4, int number5) {
        return (((number1 < number2) && (number2 > number3)) || ((number2 < number3) && (number3 > number4)) || ((number3 < number4) && (number4 > number5)));
    }

    static boolean valley(int number1, int number2, int number3, int number4, int number5) {
        return (((number1 > number2) && (number2 < number3)) || ((number2 > number3) && (number3 < number4)) || ((number3 > number4) && (number4 < number5)));
    }

    static boolean plain(int number1, int number2, int number3, int number4, int number5) {
        return (((number1 == number2)==true) && ((number2 == number3)==true) && ((number3 == number4)==true) && ((number4 == number5)==true));
    }

    static void select(int[] array) {
        if (plain(array[0], array[1], array[2], array[3], array[4])==true) {
            System.out.println("- plain");
        }else if ((valley(array[0], array[1], array[2], array[3], array[4])==true) &&(hill(array[0], array[1], array[2], array[3], array[4])==true)){
            System.out.println("- none of them");
        } else if (valley(array[0], array[1], array[2], array[3], array[4])==true) {
            System.out.println("- valley");
        } else if (hill(array[0], array[1], array[2], array[3], array[4])==true) {
            System.out.println("- hill");
        }
        else {
            System.out.println("- none of them");
        }
    }

     static int countDuplicates(int[] arr) {
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int num : arr) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        int sameNumbersCount = 0;
        for (int numCount : countMap.values()) {
            if (numCount > 1) {
                sameNumbersCount += numCount;
            }
        }

        return sameNumbersCount;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] array = new int[5];
        int k = 0;
        while (k < 5) {
            System.out.print("Write a number: ");
            int number = sc.nextInt();
            if (number >= 0) {
                array[k] = number;
                k++;
            } else {
                System.out.println("Error: Only positive numbers are allowed. Try again.");
                k = -1;
                break;
            }
        }
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " , ");
        }
        select(array);
        int duplicates = countDuplicates(array);
        if ((duplicates==0) && (hill(array[0], array[1], array[2], array[3], array[4]))){
            System.out.print(" , no same numbers");
        }else if ((duplicates==0) && (valley(array[0], array[1], array[2], array[3], array[4]))){
            System.out.print(" , no numbers are the same");
        }else {
            System.out.print(" , "+duplicates+" numbers are the same");
        }
    }
}
//made by Elyes
