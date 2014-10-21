(function (window, angular) {

  angular.module('Trabajando.com', ['ionic', 'ngCordova'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {

        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config ([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {

        $stateProvider

          /**
           * Home
           */
          .state ('home', {
            url:          '/',
            controller:   'HomeCtrl',
            templateUrl:  'templates/home.html'
          })

          /**
           * Event
           */
          .state ('event', {
            url:          '/event',
            templateUrl:  'templates/event.html'
          })

          /**
           * Speakers Home
           */
          .state ('speakers', {
            url:          '/speakers',
            templateUrl:  'templates/speakers.html'
          })

          /**
           * Speakers List By Type
           */
          .state ('speakers_type', {
            url:          '/speakers/:type',
            templateUrl:  'templates/speakers-type.html',
            controller:   'SpeakersCtrl',
            resolve:      {
              data: [
                '$stateParams',
                function ($stateParams) {
                  var data = {};

                  data.classPrefix = '';
                  switch ($stateParams.type) {
                    case 'national':
                      data.classPrefix  = 'nat';
                      data.title        = 'SPEAKERS NACIONALES';
                      break;
                    case 'international':
                      data.classPrefix = 'int';
                      data.title        = 'SPEAKERS INTERNACIONALES';
                      break;
                  }

                  data.type         = $stateParams.type;

                  return data;
                }
              ],
              speakers: [
                'Speakers',
                '$stateParams',
                function (Speakers, $stateParams) {
                  return Speakers.getAllByType ($stateParams.type);
                }
              ]
            },
          })
          
          /**
           * Speaker Detail
           */
          .state ('speaker', {
            url:          '/speaker/:speakerId',
            templateUrl:  'templates/speaker-detail.html',
            controller:    'SpeakerCtrl',
            resolve: {
              data: [
                'Speakers',
                '$stateParams',
                function (Speakers, $stateParams) {
                  var data = {};
                  data.speaker = Speakers.getById ($stateParams.speakerId);

                  if (data.speaker)
                    switch (data.speaker.type) {
                      case 'international':
                        data.classPrefix = 'int';
                        break;
                      case 'national':
                        data.classPrefix = 'nat';
                        break;
                    }

                  return data;
                }
              ]
            }
          })

          /**
           * Schedule
           */
          .state ('schedule', {
            url:          '/schedule',
            templateUrl:  'templates/schedule.html'
          })

          /**
           * Schedule 1
           */
           .state ('schedule_1', {
            url:          '/schedule/1',
            templateUrl:  'templates/schedule-1.html'
           })

           /**
            * Map
            */
            .state ('map', {
              url:          '/map',
              templateUrl:  'templates/map.html'
            })

            /**
             * Participants
             */
            .state ('participants', {
              url:           '/participants',
              templateUrl:    'templates/participants.html',
              controller:     'ParticipantsCtrl',
              resolve:        {
                'participants': [
                  'Participants',
                  function (Participants) {
                    return Participants.getAll();
                  }
                ]
              }
            })

            /**
             * Sponsors
             */
            .state ('sponsors', {
              url:          '/sponsors',
              templateUrl:  'templates/sponsors.html'
            })

            /**
             * Promotions
             */
            .state ('promotions', {
              url:          '/promotions',
              templateUrl:  'templates/promotions.html'
            })

            /**
             * Downloads
             */
            .state ('downloads', {
              url:          '/downloads',
              templateUrl:  'templates/downloads.html',
              controller:   'DownloadsCtrl',
              resolve:      {
                speakers: [
                  'Speakers',
                  function (Speakers) {
                    return Speakers.getAll();
                  }
                ]
              }
            })

            /**
             * Evaluation
             */
            .state ('evaluation', {
              url:          '/evaluate/:speakerId',
              templateUrl:  'templates/evaluation.html',
              controller:    'EvaluationCtrl',
              resolve:      {
                speaker:  [
                  'Speakers',
                  '$stateParams',
                  function (Speakers, $stateParams) {
                    var speakerId = $stateParams.speakerId,
                        speaker   = Speakers.getById (speakerId);
                    return speaker;
                  }
                ],
                questions: [
                  'Questions',
                  function (Questions) {
                    return Questions.getAll();
                  }
                ]
              }
            })

        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

      }
    ])
    
    // Speakers shown per column
    .constant ('speakersPerColumn', 2)

    // Participants shown per column
    .constant ('participantsPerColumn', 2)

  ;

})(window, angular);