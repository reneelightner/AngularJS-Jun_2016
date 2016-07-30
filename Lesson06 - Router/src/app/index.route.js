(function() {
  'use strict';

  angular.module('template')
  .config(function ($stateProvider, $urlRouterProvider, MyCustomUserProvider, UI_STATES) {


    MyCustomUserProvider.setUserName('tom@nycda.com')


    $stateProvider
    .state(UI_STATES.HOME, {
      url: '/',
      templateUrl: 'app/home/partials/home.html',
      controller: 'HomeController as ctrl'
    })
    .state(UI_STATES.CONTACTS, {
      url: '/contacts',
      templateUrl: 'app/contacts/partials/contacts.html',
      controller: 'ContactsController as ctrl'
    })
    .state('user-home', {
      url: '/user-home/:id',
      templateUrl: 'app/home/partials/user-home.html',
      controller: 'UserHomeController as ctrl'
    })


    .state('contacts.ceo', {
      url: '/ceo',
      templateUrl: 'app/contacts/partials/ceo.html',
    })
    .state('contacts.president', {
      url: '/president',
      templateUrl: 'app/contacts/partials/president.html',
    })
    .state('contacts.founder', {
      url: '/founder',
      templateUrl: 'app/contacts/partials/founder.html',
    })

    .state(UI_STATES.STORE, {
      url: '/store',
      templateUrl: 'app/store/partials/store.html',
      controller: 'StoreController as ctrl'
    })
    .state('store.shoes', {
      views: {
        listView: {
          templateUrl: 'app/store/partials/shoesList.html',
        },
        detailView: {
          templateUrl: 'app/store/partials/shoesDetail.html',
        }
      }
    })
    .state('store.shirts', {
      views: {
        listView: {
          templateUrl: 'app/store/partials/shirtList.html',
        },
        detailView: {
          templateUrl: 'app/store/partials/shirtDetail.html',
        }
      }
    });;


    $urlRouterProvider.otherwise('/')

  })


})();
