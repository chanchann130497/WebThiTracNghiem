var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/view/home", {
      templateUrl: "subjects.html"
    })
    .when("/view/gioithieu", {
      templateUrl: "gioithieu.html"
    })
    .when("/view/lienhe", {
      templateUrl: "lienhe.html"
    })
    .when("/view/gopy", {
      templateUrl: "gopy.html"
    })
    .when("/view/hoidap", {
      templateUrl: "hoidap.html"
    })
    .when("/view/changepass", {
      templateUrl: "changepass.html"
    })
    .when("/view/updateinfo", {
      templateUrl: "updateinfo.html",
    })
    .when("/view/quiz/:id/:name", {
      templateUrl: "quiz.html",
      controller: "quiz123"
    })
    .otherwise({
      redirectTo: "/view/home"
    });
});

app.run(function ($rootScope, $http) {
  window.location.href = "#!view/gioithieu";
})

app.controller("quiz123", function ($rootScope, $http, $routeParams) {
  $rootScope.quizId = $routeParams.id;
  $rootScope.quizName = $routeParams.name;
  $http.get("db/Quizs/" + $rootScope.quizId + ".js").then(function (response) {
    $rootScope.listQuizs = response.data;
    $rootScope.summark = ((Math.ceil($rootScope.listQuizs.length / 1) - 1) * 1);
  }, function (response) {
    alert("lỗi")
  });
  // phân trang Quizz
  $rootScope.begin = 0;
  $rootScope.first = function () {
    $rootScope.begin = 0;
  }
  $rootScope.prev = function () {
    if ($rootScope.begin > 0) {
      $rootScope.begin -= 1;
    }

  }
  $rootScope.next = function () {
    $rootScope.begin += 1;

  }
  $rootScope.last = function () {
    $rootScope.begin = $rootScope.summark;
  }

  // kết thúc phân trang Quizz
});
app.controller("myctrl", function ($rootScope, $http) {
  $rootScope.listMonHocs = [];
  $http.get("db/Subjects.js").then(function (response) {
    $rootScope.listMonHocs = response.data;
    $rootScope.sum = ((Math.ceil($rootScope.listMonHocs.length / 8) - 1) * 8);
  });
  $rootScope.begin = 0;
  $rootScope.first = function () {
    $rootScope.begin = 0;
  }
  $rootScope.prev = function () {
    if ($rootScope.begin > 0) {
      $rootScope.begin -= 8;
    }
  }
  $rootScope.next = function () {
    if ($rootScope.begin < $rootScope.sum) {
      $rootScope.begin += 8;
    }
  }
  $rootScope.last = function () {
    $rootScope.begin = $rootScope.sum;
  }
  $rootScope.mark = 0;
  var checkTraLoi = $rootScope.traLoi = {
    checked: ""
  };
  $rootScope.subMit = function () {
    var a = $("#cauTraLoi").val();
    var b = $("#dapAn").val();
    if (parseInt(a) == parseInt(b)) {
      Swal.fire(
        'Chính xác!',
        'Bạn trả lời đúng!',
        'success'
      )
      $rootScope.mark = $rootScope.mark + 1;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Không trùng khớp',
        text: 'Bạn trả lời sai!'
      })
    }
  }


  var indexS = localStorage.getItem('index'); //index Student Login
  $http.get("db/Students.js").then(function (response) {
    $rootScope.students = response.data;
    $rootScope.student = angular.copy($rootScope.students[indexS]);
  });
  
  $rootScope.update = function () {
    localStorage.setItem("username", $rootScope.student.username);
    localStorage.setItem("password", $rootScope.student.password);
    localStorage.setItem("fullname", $rootScope.student.fullname);
    localStorage.setItem("email", $rootScope.student.email);
    localStorage.setItem("gender", $rootScope.student.gender);
    localStorage.setItem("birthday", $rootScope.student.birthday);

    $rootScope.student = {
      "username": localStorage.getItem("username"),
      "password": localStorage.getItem("password"),
      "fullname": localStorage.getItem("fullname"),
      "email": localStorage.getItem("email"),
      "gender": localStorage.getItem("gender"),
      "birthday": localStorage.getItem("birthday"),
      "schoolfee": "1500000",
      "marks": "0"
    }

    $rootScope.checkLogin =  localStorage.getItem("fullname");
    $rootScope.students[indexS] = angular.copy($rootScope.student);
    localStorage.setItem('name', $rootScope.student.fullname);
    Swal.fire(
      'Thành Công',
      'Cập nhật thành công!',
      'success'
    )
    console.log($rootScope.students[indexS]);
    console.log($rootScope.students);
  }
  if (indexS == null) {
    $rootScope.checkLogin = "TÀI KHOẢN";
    $rootScope.checkLogin1 = 0;
  } else {
    $rootScope.checkLogin = localStorage.getItem('name');
    $rootScope.checkLogin1 = 1;
  }
  
  $rootScope.logout = function () {
    localStorage.clear();
    location.replace("layout.html");
  }
  $rootScope.change = function () {
    console.log($rootScope.student.passwordHT);
    if ($rootScope.students[indexS].password == $rootScope.student.passwordHT) {
      if ($rootScope.student.passwordCf == $rootScope.student.passwordNew) {
        $rootScope.students[indexS].password = angular.copy($rootScope.student.passwordNew);
        Swal.fire(
          'Thành Công',
          'Đổi mật khẩu thành công!',
          'success'
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Mật khẩu không trùng khớp',
          text: 'Mật khẩu mới và mật khẩu xác nhận phải trùng khớp!'
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Không trùng khớp',
        text: 'Sai mật khẩu!'
      })
    }


    console.log($rootScope.students);
  }
});


var upgradeTime = 600;
var seconds = upgradeTime;

function timer() {
  var days = Math.floor(seconds / 24 / 60 / 60);
  var hoursLeft = Math.floor((seconds) - (days * 86400));
  var hours = Math.floor(hoursLeft / 3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
  var minutes = Math.floor(minutesLeft / 60);
  var remainingSeconds = seconds % 60;

  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
  // document.getElementById('countdown').innerHTML = " " + pad(minutes) + ":" + pad(remainingSeconds);
  if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = "Completed";
  } else {
    seconds--;
  }
}
var countdownTimer = setInterval('timer()', 1000);