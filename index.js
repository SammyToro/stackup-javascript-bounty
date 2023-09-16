/** Account Class */
class Account{
    constructor(name,pin,balance){
        this.name = name;
        this.pin = pin;
        this.balance = balance;
    }

    deposit(amount){
        this.balance += amount;
    }

    withdraw(amount){
        this.balance -= amount;
    }
 }

 /**ATM Machine Class */
 class AtmSimulator{

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

//Hnadle user login with pin
document.getElementById('confirmButton').addEventListener('click',function(){
    let input = document.getElementById('textInput').value;
    let validatedInput = validateInput(input);
    //Delay of 2s to show animation
    const timer = setTimeout(function(){//Handle invalid input
        if(validatedInput == null){
            hideElement('spinner');
            showElement('errorAlert');
            showElement('confirmButton');
        }else{//Valid input
             myATM = new AtmSimulator(100000);
             let account = myATM.verifyPin(input);
             console.log(account);
             if(account.length === 0){
                document.getElementById('errorMessage').innerHTML = "You entered a wrong pin try again";
                hideElement('spinner');
                showElement('confirmButton');
                showElement('errorAlert');
             }else{
                document.getElementById('successMessage').innerHTML = "Login successful";
                hideElement('errorAlert')
                showElement('successAlert');
                hideElement('spinner');
                showElement('confirmButton');
                hideElement('inputSection');

                let userAccount = account[0];
                document.getElementById('fullName').innerHTML = userAccount.name;
                showElement('homeScreen');
             }
        }
    },2000);
});

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