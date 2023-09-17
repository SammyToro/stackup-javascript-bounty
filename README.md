# ATM Simulator
This website simulates the operation of a an ATM machine. To use it you need to first enter a pin number and then you can perform actions like checking balance, deposit and withdrawal
Some predefined pins for stored accounts include *1234*, *1908*, and *2023*

## Implementation of classes in the website
This website uses two classes; 
1. `Account` which contains properties of `pin`,`balance`, and `fullname`. There two main methods in tis function `withdraw` to perform withdrawals and `deposit` to perform deposits.
2. `AtmMachine` which contains a list of `Account`s and `availableAmount` as properties. The method of this class `withdraw` and `deposit` are used to update the `availableAmount` based on the transaction type.

##Implementation of switch-case-default

