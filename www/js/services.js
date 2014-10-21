(function (window, angular) {

  angular.module('Trabajando.com')

    /**
     * Parse
     */
    .service ('Parse', [
        function () {
            window.Parse.initialize("cJVZxmt1w6FWIlxC0gYWabQoIBcmk0iaqwh3lLZx", "mjqRZ9F8cpSgWS54YkvLM6wt0YDGR56k73AirUgJ");
            return window.Parse;
        }
    ])

    /**
     * Speakers
     */
    .service ('Speakers', [
    	function () {

    		var speakers = [
    			{
    				id: 			1,
    				name: 			'mireia ranera',
    				photo: 			'mireia-ranera.png',
                    download:       'http://google.cl',
    				type: 			'international',
    				description: 	'Socia y Directora de Human Capital (HR2.0) en Íncipy, consultora de RRHH y estrategia digital. Emprendedora con más de 30 años de experiencia en la creación de empresas y gestión de equipos en áreas de negocio relacionadas con Internet, Redes Sociales, Marketing Directo, RRHH y Formación. Co-autora del Libro Blanco de los Recursos Humano, de Meta4: El reto de la Colaboración- El papel estratégico de los RRHH como líderes de negocio en la nueva era digital. 10 años de experiencia en proyectos para integrar la cultura 2.0 y las redes sociales en las organizaciones, trabajando para empresas como: PwC, LaCaixa, Gas Natural Fenosa, Ferrovial, Affinity Petcare, Starbucks, Friday’s'
    			},
    			{
    				id: 			2,
    				name: 			'alex putman',
    				photo: 			'alex-putman.png',
                    download:       'http://google.cl',
    				type: 			'international',
    				description: 	'Lorem ipsum'
    			},
    			{
    				id: 			3,
    				name: 			'clay parker jones',
    				photo: 			'clay-parker-jones.png',
                    download:       'http://google.cl',
    				type: 			'international',
    				description: 	'Lorem ipsum'
    			},
    			{
    				id: 			4,
    				name: 			'nicolás copano',
    				photo: 			'nicolas-copano.png',
                    download:       'http://google.cl',
    				type: 			'national',
    				description: 	'Presentador de TV y emprendedor, con cerca de 1 millón de seguidores, es una de las personalidades más influyentes de las redes sociales en Chile. Su ensayo “Movimiento Social Media” (Editorial Planeta) y su experiencia en redessociales le han permitido exponer en Brasil, Argentina, Mexico y España.Fundador de MQLTV, compañía que ha producido contenido y asesorado a Publimetro, Tumblr, Sony, McDonald´s, entre otras. El canal www.youtube.com/MQLTV cuenta con más de 15.000 suscriptores en Youtube y más de 500 contenidos originales publicados. En Redes sociales MQLTV posee en Google+ 17.635 seguidores y en Twitter 14.087 seguidores.'
    			}
    		];

            this.getAll = function () {
                return speakers;
            };

    		this.getAllByType = function (type) {
    			var spkrs = [];

    			angular.forEach (speakers, function (speaker) {
    				if (speaker.type == type)
    					spkrs.push (speaker);
    			});

    			return spkrs;
    		};

    		this.getById = function (id) {
    			var spkr;;

    			angular.forEach (speakers, function (speaker) {
    				if (speaker.id == id && !spkr)
    					spkr = speaker;
    			});

    			return spkr;
    		};

    		this.getByName = function (name) {
    			var spkr;

    			angular.forEach (speakers, function (speaker) {
    				if (speaker.name == name && !spkr)
    					spkr = speaker;
    			});

    			return spkr;
    		};

    	}
    ])
    
    /**
     * Participants
     */
    .service ('Participants', [
        function () {

            var participants = [
                {
                    id:             1,
                    name:           'inacap',
                    photo:          'inacap-box.png'
                },
                {
                    id:             2,
                    name:           'ascs',
                    photo:          'ascs-box.png'
                },
                {
                    id:             3,
                    name:           'ccs',
                    photo:          'ccs-box.png'
                },
                {
                    id:             4,
                    name:           'lexian',
                    photo:          'lexian-box.png'
                },
                {
                    id:             5,
                    name:           'impacto real',
                    photo:          'impacto-real-box.png'
                },
                {
                    id:             6,
                    name:           'regal box',
                    photo:          'regalbox-box.png'
                },
            ];

            this.getAll = function () {
                return participants;
            };

            this.getById = function (id) {
                var prtpnt;

                angular.forEach (particpants, function (particpant) {
                    if (particpant.id == id && !prtpnt)
                        prtpnt = particpant;
                });

                return prtpnt;
            };

        }
    ])
    
    /**
     * Questions
     */
    .service ('Questions', [
        function () {
            var defaultValue    = 4,
                questions       = [
              {
                id:     1,
                text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value:  4
              },
              {
                id:     2,
                text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value:  4
              },
              {
                id:     3,
                text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value:  4
              },
              {
                id:     4,
                text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value:  4
              },
              {
                id:     5,
                text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value:  4
              },
              {
                id:     6,
                text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value:  4
              },
              {
                id:     7,
                text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value:  4
              }
            ];

            this.getAll = function () {
                return questions;
            };

            this.reset = function () {
                angular.forEach (questions, function (question) {
                    question.value = defaultValue;
                });

                return true;
            };

        }
    ])

    /**
     * Evaluations
     */
    .service ('Evaluations', [
        'Parse',
        '$q',
        '$timeout',
        function (Parse, $q, $timeout) {
            var Evaluation = Parse.Object.extend ('Evaluation');

            // Save
            this.save = function (data) {
                var evaluation  = new Evaluation(),
                    d           = $q.defer();

                evaluation.save (data, {
                    success: function (r) {
                        $timeout (function () {
                            d.resolve (r);
                        });
                    },
                    error: function (object, error) {
                        d.reject (error);
                    }
                });

                return d.promise;
            };

            // List
            this.list = function () {
                var evaluations = $q.defer(),
                    query       = new Parse.Query ('Evaluation');

                query.find ({
                    success: function (r) {
                        $timeout (function () {
                            d.resolve (r);
                        });
                    },
                    error: function (error) {
                        $timeout (function () {
                            d.reject (error);
                        });
                    }
                });

                return d.promise;
            };

            // Get
            this.get = function (evaluationId) {
                var query   = new Parse.Query (Evaluation),
                    d       = $q.defer();

                query.get (evaluationId, {
                    success: function (r) {
                        $timeout (function () {
                            d.resolve (r);
                        });
                    },
                    error: function (error) {
                        $timeout (function () {
                            d.reject (error);
                        })
                    }
                });

                return d.promise;
            };

        }
    ])

  ;

})(window, angular);
