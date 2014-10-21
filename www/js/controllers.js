(function (window, angular) {

  angular.module('Trabajando.com')

    /**
     * Home Controller
     */
    .controller ('HomeCtrl', [
    	'$scope',
    	function ($scope) {
    		console.log('home');
    	}
    ])

    /**
     * Speakers Controller
     */
    .controller ('SpeakersCtrl', [
      'speakers',
      '$scope',
      'speakersPerColumn',
      'data',
      function (speakers, $scope, speakersPerColumn, data) {
        $scope.speakers       = speakers;
        $scope.speakersGroups = [];
        $scope.colClass       = speakersPerColumn > 1 ? 'col-' + Math.round (100 / speakersPerColumn) : '';
        $scope.data           = data;

        var counter = 0;
        angular.forEach (speakers, function (speaker, index) {
          var mod = index % speakersPerColumn;
          if (mod == 0) {
            counter++;
            var group = [speaker];
            $scope.speakersGroups.push(group);
          } else {
            $scope.speakersGroups[counter-1].push(speaker);
          }
        });

      }
    ])

    /**
     * Speaker Controller
     */
    .controller ('SpeakerCtrl', [
      '$scope',
      'data',
      '$state',
      function ($scope, data, $state) {
        $scope.speaker      = data.speaker;
        $scope.classPrefix  = data.classPrefix;
          
        $scope.test = function () {
            console.log('here: ', data);
        };
      }
    ])

    /**
     * ParticipantsCtrl
     */
    .controller ('ParticipantsCtrl', [
      '$scope',
      'participants',
      'participantsPerColumn',
      function ($scope, participants, participantsPerColumn) {
        $scope.participants   = participants;
        $scope.participantsGroups = [];
        $scope.colClass       = participantsPerColumn > 1 ? 'col-' + Math.round (100 / participantsPerColumn) : '';

        var counter = 0;
        angular.forEach (participants, function (participant, index) {
          var mod = index % participantsPerColumn;
          if (mod == 0) {
            counter++;
            var group = [participant];
            $scope.participantsGroups.push(group);
          } else {
            $scope.participantsGroups[counter-1].push(participant);
          }
        });
      }
    ])

    /**
     * Downloads Controller
     */
    .controller ('DownloadsCtrl', [
      'speakers',
      '$scope',
      function (speakers, $scope) {
        $scope.speakers = speakers;

        $scope.download = function (fileExtUrl) {
          console.log('downloading...');
        };
      }
    ])

    /**
     * Evaluation Controller
     */
    .controller ('EvaluationCtrl', [
      '$scope',
      'speaker',
      'questions',
      'Questions',
      '$cordovaNetwork',
      function ($scope, speaker, questions, Questions, $cordovaNetwork) {
        Questions.reset();

        $scope.speaker    = speaker;
        $scope.questions  = questions;
        $scope.sent       = false;
        $scope.succcess   = false;
        $scope.error      = false;

        $scope.submit = function () {
          console.log($scope);
        };
      }
    ])

    /**
     * Evaluation Form Controller
     */
    .controller ('EvaluationFormCtrl', [
      '$scope',
      '$cordovaNetwork',
      'Evaluations',
      '$cordovaLocalNotification',
      function ($scope, $cordovaNetwork, Evaluations, $cordovaLocalNotification) {
        $scope.sent             = false;
        $scope.sending          = false;
        $scope.succcess         = false;
        $scope.error            = false;
        $scope.isConnected      = window.navigator.hasOwnProperty ('connection') ? $cordovaNetwork.isOnline() : true;
        var isPluginDefined     = window.hasOwnProperty ('plugin') ? true : false;
        
//        $scope.isConnected = false;
          
        var later = new Date();
            later.setSeconds(later.getSeconds() + 10);

        $scope.rememberEvaluation    = function () {
            console.log(isPluginDefined);
            
            // If notifications are enabled    
            if (isPluginDefined)
                // Add a new notification
                $cordovaLocalNotification.add({
                    id:         '123456',
                    date:       later,
                    message:    'Recordatorio',
                    title:      'Titulo :]',
//                    icon:       'file://img/notification.png'
                });
        };

        $scope.submit = function () {
            console.log('saving... ', $cordovaNetwork.isOnline());
          
            // Cancel all notifications
            $cordovaLocalNotification.cancelAll();
            
            if ($cordovaNetwork.isOnline()) {
                var evaluation = {
                  speakerId:    $scope.speaker.id,
                  speakerName:  $scope.speaker.name
                };

                angular.forEach ($scope.questions, function (question) {
                  evaluation['q' + question.id] = question.value;
                });


                Evaluations.save (evaluation);
                console.log (evaluation);
            }


        };

      }
    ])

  ;

})(window, angular);
