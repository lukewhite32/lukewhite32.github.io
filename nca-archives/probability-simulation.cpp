#include <iostream>
#include <bits/stdc++.h>

int main() {
    srand(time(0));
    int total = 0;

    for (int x = 0; x < 1000000000; x ++) {
        int firstNum = (rand() % 6) + 1;
        int secondNum = (rand() % 6) + 1;
        

        //std::cout << "First Num: " << firstNum << ", Second Num: " << secondNum << std::endl;   

        if ((firstNum == 1) || (firstNum == 5) || (secondNum == 1) || (secondNum == 5)) {
            total ++;
        }     
    }
    std::cout << "TOTAL: " << total << std::endl;
    std::cout << "PROBABILITY: " << total / 10000000 << "%" << std::endl;
    return 0;
}