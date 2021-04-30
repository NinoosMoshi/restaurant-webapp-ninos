1- install bootstrap => npm install bootstrap
2- install fontawesome => npm install @fortawesome/fontawesome-free
3- import bootstrap in angular.json:
"styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
            ]



 note:
 for angular 9 and up your to add a dependency => ng add @angular/localize
 for pagination we have to install ng-bootstrap => npm install @ng-bootstrap/ng-bootstrap           
