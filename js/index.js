var firebaseConfig = {
  apiKey: "AIzaSyD02-8_KnkjkDwNP4HgVRkurWi2fjDyzvg",
  authDomain: "blogcode-f1c91.firebaseapp.com",
  databaseURL: "https://blogcode-f1c91.firebaseio.com",
  projectId: "blogcode-f1c91",
  storageBucket: "blogcode-f1c91.appspot.com",
  messagingSenderId: "1058386451567",
  appId: "1:1058386451567:web:c1f17aeae8bacbef49419a",
  measurementId: "G-8DN5GCJ929"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function(){
      var email = $("#email").val()
      var password = $("#password").val()
      if (email != "" && password != "")
      {
        var result = firebase.auth().signInWithEmailAndPassword(email,password)
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        })
      }
      else{
          window.alert("Please fill out all field")
      }
  })

  $("#btn-signup").click(function(){
    var email = $("#email").val()
    var password = $("#password").val()
    var cPassword = $("#confirmPassword").val()
    if (email != "" && password != "" && cPassword != "")
    {
      if(password==cPassword)
      {
        var result = firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
          window.alert("Create account successfully!");
        })
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        })
      }
      else
      {
        window.alert("Password do not match with the Confirm Password")
      }
    }
    else{
        window.alert("Please fill out all field")
    }
})

  $("#btn-resetPassword").click(function(){
     var auth = firebase.auth();
     var email = $("#email").val();

     if(email != "")
     {
        auth.sendPasswordResetEmail(email).then(function(){
          window.alert("Email has been sent to you, Please check and verify.");
        })
        .catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Message : " + errorMessage);
        });
     }
     else
     {
      window.alert("Please write your email first.")
     }
});

  $("#btn-logout").click(function(){
    firebase.auth().signOut()
});


  $("#btn-update").click(function(){
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fName = $("#firstName").val();
    var sName = $("#secondName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName != "" && sName != "" && phone != "" && country != "" && gender != "" && bio !="" && address != "")
    {
      var userData =
      {
        "phone": phone,
        "address": address,
        "bio": bio,
        "firstName": fName,
        "secondName": sName,
        "country": country,
        "gender": gender,
      }

      usersRef.set(userData, function(error){
        if(error)
        {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Message : " + errorMessage);
        }
        else
        {
          window.location.href = "index.html";
        }
      })
    }
    else
    {
      window.alert("Form is incomplete. Please fill out all field")
    }
});


function switchView(view){
  $.get({
    url: view,
    cache: false,
  })
  .then(function(data){
    $("#container").html(data);
  })
}
