import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersServiceProvider]
})
export class HomePage {
public csvItems:any;
public txt:any;
public email:any;
public pass:any;
public userId:any;
private i:any;
private j:any;
private users;
private usersList:any;
  constructor(public navCtrl: NavController,public http: Http ,private userservice:UsersServiceProvider) {
this.userId=firebase.auth().currentUser.uid;

  }
  text(){
  alert(this.txt);
  this.userservice.loadjsonUsers(this.txt).then(data=>{
  this.usersList=data;
  this.text2();
  })
  }
  ionViewWillEnter(){
  this.loadCSV();
  }
  text2(){
  alert(this.usersList[0].phone.trim(' '));
  for(this.i=0;this.i<=(this.usersList.length-1);this.i++){
  this.userservice.addUsers(this.usersList[this.i].email.trim(),this.usersList[this.i].login.password.trim(),this.usersList[this.i].phone.trim(' '),this.usersList[this.i].login.username.trim(),this.usersList[this.i].name.first.trim(),this.usersList[this.i].name.last.trim(),this.usersList[this.i].gender.trim()).then(authData=>{
  alert('Json users added :'+this.i);
  },error=>{
  alert('error in adding users'+error.message);
  });
  }
  }
  //addUsersinfirebase(){
  //for(this.i=0;this.i<=(this.csvItems.length-1);this.i++){
  //this.userservice.addUsers(this.csvItems[this.i].emails.trim(),this.csvItems[this.i].passwords.trim(),this.csvItems[this.i].emails.trim(),this.csvItems[this.i].passwords.trim()).then(authData=>{
  //alert('done adding users'+this.i);
  //},error=>{
  //alert('error in adding users'+error.message);
  //});
  //}
  //}
  addUsersData(){

  alert('welcome'+this.csvItems.length);

  }
  //login(){
  //if((this.email==this.csvItems[0].salary.trim())&&(this.pass==this.csvItems[0].years.trim())){
  //alert('welcome '+this.csvItems[0].years+' '+this.email);
  //}
  //}

logUserOut(){
 this.userservice.logoutUser().then(()=>{
this.navCtrl.setRoot(LoginPage);
 });

  }

loadCSV(){
   this.http.get('../../assets/data/users.csv')
   .map(res => res.text())
   .subscribe((data)=>
   {
      var csv         = this.parseCSVFile(data);
      this.csvItems  = csv;
   });
}


parseCSVFile(str)
{
   var arr  = [],
       obj  = [],
       row,
       col,
       c,
       quote   = false;  // true means we're inside a quoted field

   // iterate over each character, keep track of current row and column (of the returned array)
   for (row = col = c = 0; c < str.length; c++)
   {
      var cc = str[c],
          nc = str[c+1];        // current character, next character

      arr[row]           = arr[row] || [];
      arr[row][col]  = arr[row][col] || '';

      /* If the current character is a quotation mark, and we're inside a
    quoted field, and the next character is also a quotation mark,
    add a quotation mark to the current column and skip the next character
      */
      if (cc == '"' && quote && nc == '"')
      {
         arr[row][col] += cc;
         ++c;
         continue;
      }


      // If it's just one quotation mark, begin/end quoted field
      if (cc == '"')
      {
         quote = !quote;
         continue;
      }


      // If it's a comma and we're not in a quoted field, move on to the next column
      if (cc == ',' && !quote)
      {
         ++col;
         continue;
      }


      /* If it's a newline and we're not in a quoted field, move on to the next
         row and move to column 0 of that new row */
      if (cc == '\n' && !quote)
      {
         ++row;
         col = 0;
         continue;
      }

      // Otherwise, append the current character to the current column
      arr[row][col] += cc;
   }

   return this.formatParsedObject(arr, true);
}



formatParsedObject(arr, hasTitles)
{
   let emails,
       passwords,
       obj = [];

   for(var j = 0; j < arr.length; j++)
   {
      var items         = arr[j];

      if(items.indexOf("") === -1)
      {
         if(hasTitles === true && j === 0)
         {
            emails        = items[0];
            passwords        = items[1];
            }
         else
         {
            obj.push({
               emails          : items[0],
               passwords       : items[1]
            });
         }
      }
   }
   return obj;
}

}
