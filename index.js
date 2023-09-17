/** Account Class */
class Account{
    constructor(name,pin,balance){
        this.name = name;
        this.pin = pin;
        this.balance = balance;
    }

    deposit(amount){
        this.balance = +this.balance + +amount //Added + in front of values to prevent concatenation
    }

    withdraw(amount){
        this.balance -= amount;
    }
 }

 /**ATM Machine Class */
 class AtmMachine{

    constructor(availableAmount){
        let account1 = new Account("John Doe","1234","50000");
        let account2 = new Account("Kelly Smith","1908","24590");
        let account3 = new Account("Mary Stone","2023","97478");

        let accounts = [account1,account2,account3];

        this.accounts = accounts;
        this.availableAmount = availableAmount;
    }

    verifyPin(pinNumber){
        return this.accounts.filter(account => account.pin === pinNumber )
    }

    withdraw(amount){
        this.availableAmount -= amount;
    }

    deposit(amount){
        this.availableAmount  = +this.availableAmount + +amount; //Added + in front of values to prevent concatenation
    }

}

/**Program Flow */
//Initialize page
window.onload = function(){
    hideElement('errorAlert');
    hideElement('successAlert');
    hideElement('homeScreen');
    hideElement('checkBalanceBlock');
    hideElement('actionButtons');
    hideElement('spinner');
};

//Global variables;
let userAccount = null;
let transaction = null;
let login  = false;

myATM = new AtmMachine(100000);

//Handle user login with pin
document.getElementById('confirmButton').addEventListener('click',function(){
    let input = document.getElementById('textInput').value;
    let validatedInput = validateInput(input);
    //Delay of 2s to show animation
    const timer = setTimeout(function(){//Handle invalid input
        if(validatedInput == null){
            hideElement('spinner');
            showElement('errorAlert');
            showElement('confirmButton');
            document.getElementById('textInput').value = '';

        }else{//Valid input
            if(login == false){//Handle login
                let account = myATM.verifyPin(validatedInput);
                if(account.length === 0){
                    document.getElementById('errorMessage').innerHTML = "You entered a wrong pin try again";
                    hideElement('spinner');
                    showElement('confirmButton');
                    showElement('errorAlert');
                    document.getElementById('textInput').value = '';
                }else{
                    document.getElementById('successMessage').innerHTML = "Login successful";
                    hideElement('errorAlert')
                    showElement('successAlert');
                    hideElement('spinner');
                    showElement('confirmButton');
                    hideElement('inputSection');

                    userAccount = account[0];
                    document.getElementById('fullName').innerHTML = userAccount.name;
                    showElement('homeScreen');
                    login = true
                }
            }else{
                console.log(transaction);
                if(transaction == 'withdrawal'){
                    try{
                        if(validatedInput > userAccount.balance)
                            throw new Error('Your balance is insufficient to perform the transaction');
                        else if(validatedInput > myATM.availableAmount)
                            throw new Error('System Error. ATM funds is low. Contact support');
                        else{
                            userAccount.withdraw(validatedInput);
                            myATM.withdraw(validatedInput);
                            document.getElementById('successMessage').innerHTML = '<strong> Transaction successful </strong>.You account has been debited with GHC '+validatedInput;
                            document.getElementById('accountBalance').innerHTML = 'GHC ' + userAccount.balance;
                            document.getElementById('textInput').placeholder = 'Enter your PIN number';
                            document.getElementById('statusButton').innerHTML = 'Verifying...';
                            hideElement('spinner');
                            showElement('confirmButton');
                            hideElement('inputSection');
                            showElement('successAlert');
                            showElement('checkBalanceBlock');
                            showElement('actionButtons');
                        }
                    }catch(error){
                        document.getElementById('errorMessage').innerHTML = error;
                        document.getElementById('textInput').value = '';
                        showElement('errorAlert');
                        hideElement('spinner');
                        showElement('confirmButton');
                        hideElement('inputSection');
                        showElement('homeScreen');

                    }
                }else if(transaction == 'deposit'){
                    userAccount.deposit(validatedInput);
                    myATM.deposit(validatedInput);
                    document.getElementById('successMessage').innerHTML = '<strong> Transaction successful </strong>.You account has been credited with GHC '+validatedInput;
                    document.getElementById('accountBalance').innerHTML = 'GHC ' + userAccount.balance;
                    document.getElementById('textInput').placeholder = 'Enter your PIN number';
                    document.getElementById('statusButton').innerHTML = 'Verifying...';
                    hideElement('spinner');
                    showElement('confirmButton');
                    hideElement('inputSection');
                    showElement('successAlert');
                    showElement('checkBalanceBlock');
                    showElement('actionButtons');
                }
            }
             
        }
    },2000);
});

document.getElementById('confirmTransaction').addEventListener('click',function(){
    let transactionType = document.getElementById('transactionType').value;
    switch(transactionType){
        case 'checkBalance':
            hideElement('homeScreen');
            document.getElementById('successMessage').innerHTML = 'Transaction Successful'
            document.getElementById('accountBalance').innerHTML = 'GHC ' + userAccount.balance;
            showElement('checkBalanceBlock');
            showElement('actionButtons');   
        break;
        case 'withdrawal':
            hideElement('homeScreen');
            document.getElementById('textInput').value = '';
            document.getElementById('textInput').placeholder = 'Enter Amount';
            document.getElementById('statusButton').innerHTML = 'Processing...';
            showElement('inputSection');
            transaction = 'withdrawal';
        break;
        case 'deposit':
            hideElement('homeScreen');
            document.getElementById('textInput').value = '';
            document.getElementById('textInput').placeholder = 'Enter Amount';
            document.getElementById('statusButton').innerHTML = 'Processing...';
            showElement('inputSection');
            transaction = 'deposit';
        break;
        default:
            showElement('inputSection');
    }
});

document.getElementById('performAnotherTransaction').addEventListener('click', function(){
    hideElement('actionButtons');
    hideElement('successAlert');
    hideElement('checkBalanceBlock');
    showElement('homeScreen');
});

document.getElementById('exit').addEventListener('click', function(){
    hideElement('actionButtons');
    hideElement('successAlert');
    hideElement('checkBalanceBlock');
    showElement('inputSection');
    document.getElementById('textInput').value = '';
    login = false;
    userAccount = null;
});

/**Use this fix for the alert dismiss as bootstraps alert removes element from page causing null error */
document.getElementById('errorAlertCloseButton').addEventListener('click', function(){
    hideElement('errorAlert');
})

document.getElementById('successAlertCloseButton').addEventListener('click', function(){
    hideElement('successAlert');
})

/**Helper Functions */
function hideElement(elementId){
    document.getElementById(elementId).style.display='none'
}

function showElement(elementId){
    document.getElementById(elementId).style.display=''
}

function validateInput(input){
    try {
        if (input < 0) {
          throw new Error('Input cannot be negative');
        } else if (input === '') {
          throw new Error('Input cannot be empty');
        } else if (isNaN(input)) {
          throw new Error('Input must be a number');
        } else {
            return input;
        }
    
      } catch (error) {
        document.getElementById('errorMessage').innerHTML = error;
        return null;
      } finally {
        alert(`You entered ${input}`);
        showElement('spinner');
        hideElement('confirmButton');
      }
}