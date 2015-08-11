var app = angular.module('portfolio', [
    'templates-app',
    'templates-common',
    'ui.router',
    'ngAnimate'
    //'ngModal'
])




.config(function myAppConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})




.run(function run() {


})




.controller('AppCtrl', function AppCtrl($scope, $location, $anchorScroll, $window, Data, preloader, $timeout) {

    $scope.projects = Data.get();

    $scope.index = 1;

    $scope.atBeginning = true;
    $scope.atEnd = false;

    $scope.projectsVisible = false;
    $scope.hideOverlay = false;
    $scope.hideIntroBody = false;
    $scope.fixHeader = false;
    $scope.hideOverflow = true;
    $scope.showProjects = function() {
        $scope.projectsVisible = true;
        $scope.hideOverflow = false;

        $timeout(function() {
            $scope.hideOverlay = true;

        }, 1300);
        $timeout(function() {
            $scope.hideIntroBody = true;
            $scope.fixHeader = true;
        }, 600);
    };

    $scope.time = getTime();

    function getTime() {
        var date = new Date();
        var current_hour = date.getHours();
        //alert(current_hour);
        if (current_hour >= 0 && current_hour < 12) {
            return 0;
        } else if (current_hour >= 12 && current_hour < 18) {
            return 1;
        } else if (current_hour >= 18 && current_hour < 24) {
            return 2;
        }
    }
    //on run determine if $scope.time === 0,1, or 2
    //$scope.time = 1;

    $scope.backgroundImage = function(timeOfDay) {
        if (timeOfDay === 0) {
            return 'morning-bg';
        } else if (timeOfDay === 1) {
            return 'afternoon-bg';
        } else if (timeOfDay === 2) {
            return 'evening-bg';
        }
    };

    $scope.greetingCopy = function(timeOfDay) {
        if (timeOfDay === 0) {
            return 'Good Morning';
        } else if (timeOfDay === 1) {
            return 'Good Afternoon';
        } else if (timeOfDay === 2) {
            return 'Good Evening';
        }
    };

    $(".loading-icon.start-complete").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
        function() {
            alert('gasdfasdf');
        });

    $scope.changeIndex = function(direction) {
        var index = $scope.index;
        if ((direction == "right") && ($scope.index !== $scope.projects.length)) {
            $scope.index = $scope.index + 1;
        } else if ((direction == "left") && ($scope.index != 1)) {
            $scope.index = $scope.index - 1;
        }
        checkForBeginningOrEnd();
        /*$timeout(function() {
            runScroll();
        }, 500);*/
        scrollTo(document.body, 0, 500);
        scrollTo(document.documentElement, 0, 300);
        //$scope.direction = direction;
    };

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function() {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    var checkForBeginningOrEnd = function() {
        if ($scope.index == 1) {
            $scope.atBeginning = true;
        } else {
            $scope.atBeginning = false;
        }
        if ($scope.index == $scope.projects.length) {
            $scope.atEnd = true;
        } else {
            $scope.atEnd = false;
        }
    };

    $scope.urlToLoad = '';
    $scope.hideModal = true;
    $scope.toggleModal = function(imageToLoad) {
        $scope.hideModal = !$scope.hideModal;
        $scope.urlToLoad = 'assets/img/' + imageToLoad + '.jpg';
    };

    var elevator = null;

    $scope.initElevator = function() {
        elevator = new Elevator({
            element: document.querySelector('.elevator-button'),
            duration: 500 // milliseconds
        });
    };

    var mobileNavShowing = false;
    $scope.toggleMobileNav = function() {
        mobileNavShowing = !mobileNavShowing;
        $scope.mobileNavShowing = mobileNavShowing;
    };

    // PRELOADING CONTENT - I keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    // Image src values to preload and display./
    // --
    // NOTE: "cache" attribute is to prevent images from caching in the
    // browser (for the sake of the demo).
    $scope.imageLocations = [
        ("assets/img/lovrnet-logo.png"), // 0
        ("assets/img/lovrnet1.jpg"), // 1
        ("assets/img/lovrnet2.jpg"), // 2
        ("assets/img/lovrnet3.jpg"), // 3
        ("assets/img/lovrnet_flow1.jpg"), // 4
        ("assets/img/lovrnet_flow2.jpg"), // 5
        ("assets/img/asortly-logo.png"), // 6
        ("assets/img/asortly1.jpg"), // 7
        ("assets/img/asortly2.jpg"), // 8
        ("assets/img/asortly3.jpg"), // 9
        ("assets/img/asortly4.jpg"), // 10
        ("assets/img/clip-logo.png"), // 11
        ("assets/img/clip1.jpg"), // 12
        ("assets/img/clip2.jpg"), // 13
        ("assets/img/clip3.jpg"), // 14
        ("assets/img/sleeknotion-logo.png"), // 15
        ("assets/img/sleeknotion1.jpg"), // 16
        ("assets/img/sleeknotion2.jpg"), // 17
        ("assets/img/sleeknotion3.jpg"), // 18
        ("assets/img/sleeknotion4.jpg"), // 19
        ("assets/img/sleeknotion5.jpg"), // 20
        ("assets/img/sleeknotion6.jpg"), // 21
        ("assets/img/clip4.jpg"), // 22
        ("assets/img/clip5.jpg"), // 23
        ("assets/img/clip6.jpg"), // 24
        ("assets/img/lovrnet4.jpg"), // 25
        ("assets/img/lovrnet5.jpg"), // 26
        //("assets/img/lolz1.jpg"), //27
        //("assets/img/lolz2.jpg"), //28
        //("assets/img/lolz3.jpg"), //29
        ("assets/img/lolzandroid-portfolio_ss1.jpg"), //27
        ("assets/img/lolzandroid-portfolio_ss2.jpg"), //28
        ("assets/img/lolzandroid-portfolio_ss3.jpg") //29
        //("assets/img/lovrnet6.jpg"), // 27
        //("assets/img/lovrnet7.jpg"), // 28
        //("assets/img/lovrnet8.jpg"), // 29
        //("assets/img/lovrnet9.jpg"), // 30
        //("assets/img/lovrnet10.jpg"), // 31
        //("assets/img/lovrnet11.jpg"), // 32
        //("assets/img/lovrnet12.jpg") // 33
    ];

    // Preload the images; then, update display when returned.
    setTimeout(function() {
        preloader.preloadImages($scope.imageLocations).then(
            function handleResolve(imageLocations) {

                // Loading was successful.
                $scope.isLoading = false;
                $scope.isSuccessful = true;

                console.info("Preload Successful");

            },
            function handleReject(imageLocation) {

                // Loading failed on at least one image.
                $scope.isLoading = false;
                $scope.isSuccessful = false;

                console.error("Image Failed", imageLocation);
                console.info("Preload Failure");

            },
            function handleNotify(event) {

                $scope.percentLoaded = event.percent;

                console.info("Percent loaded:", event.percent);

            }
        );
    }, 100);

})




.service('Data', function() {
    var data = [{
        number: 1,
        cssclass: "lovrnet-border",
        logo: "assets/img/lovrnet-logo.png",
        title: "Lions LOVRNET",
        responsibilities: "UX / Visual Design / Front-End Development / Project Management",
        template: "project-lovrnet"
    }, {
        number: 2,
        cssclass: "clip-border",
        logo: "assets/img/clip-logo.png",
        title: "Clip",
        responsibilities: "UX / Visual Design",
        template: "project-clip"
    }, {
        number: 3,
        cssclass: "asortly-border",
        logo: "assets/img/asortly-logo.png",
        title: "Asortly",
        responsibilities: "UX / Visual Design / Front-End Development",
        template: "project-asortly"
    }, {
        number: 4,
        cssclass: "lolz-border",
        logo: "assets/img/lolz-android-logo.png",
        title: "Lolz",
        responsibilities: "UX / Visual Design / Front-End Dev / Back-End Dev",
        template: "project-lolz-android"
    }, {
        number: 5,
        cssclass: "sleeknotion-border",
        logo: "assets/img/sleeknotion-logo.png",
        title: "Sleek Notion",
        responsibilities: "UX / Visual Design / Front-End Development",
        template: "project-sleeknotion"
    }];
    this.get = function() {
        return data;
    };
})





// Test out new features: http://jsfiddle.net/lgrube3/dnch391j/
// Angular Modal: http://jsfiddle.net/lgrube3/yv5krfLt/










// -------------------------------------------------- //
// -------------------------------------------------- //


// I provide a utility class for preloading image objects.
.factory(
    "preloader",
    function($q, $rootScope) {

        // I manage the preloading of image objects. Accepts an array of image URLs.
        function Preloader(imageLocations) {

            // I am the image SRC values to preload.
            this.imageLocations = imageLocations;

            // As the images load, we'll need to keep track of the load/error
            // counts when announing the progress on the loading.
            this.imageCount = this.imageLocations.length;
            this.loadCount = 0;
            this.errorCount = 0;

            // I am the possible states that the preloader can be in.
            this.states = {
                PENDING: 1,
                LOADING: 2,
                RESOLVED: 3,
                REJECTED: 4
            };

            // I keep track of the current state of the preloader.
            this.state = this.states.PENDING;

            // When loading the images, a promise will be returned to indicate
            // when the loading has completed (and / or progressed).
            this.deferred = $q.defer();
            this.promise = this.deferred.promise;

        }


        // ---
        // STATIC METHODS.
        // ---


        // I reload the given images [Array] and return a promise. The promise
        // will be resolved with the array of image locations.
        Preloader.preloadImages = function(imageLocations) {

            var preloader = new Preloader(imageLocations);

            return (preloader.load());

        };


        // ---
        // INSTANCE METHODS.
        // ---


        Preloader.prototype = {

            // Best practice for "instnceof" operator.
            constructor: Preloader,


            // ---
            // PUBLIC METHODS.
            // ---


            // I determine if the preloader has started loading images yet.
            isInitiated: function isInitiated() {

                return (this.state !== this.states.PENDING);

            },


            // I determine if the preloader has failed to load all of the images.
            isRejected: function isRejected() {

                return (this.state === this.states.REJECTED);

            },


            // I determine if the preloader has successfully loaded all of the images.
            isResolved: function isResolved() {

                return (this.state === this.states.RESOLVED);

            },


            // I initiate the preload of the images. Returns a promise.
            load: function load() {

                // If the images are already loading, return the existing promise.
                if (this.isInitiated()) {

                    return (this.promise);

                }

                this.state = this.states.LOADING;

                for (var i = 0; i < this.imageCount; i++) {

                    this.loadImageLocation(this.imageLocations[i]);

                }

                // Return the deferred promise for the load event.
                return (this.promise);

            },


            // ---
            // PRIVATE METHODS.
            // ---


            // I handle the load-failure of the given image location.
            handleImageError: function handleImageError(imageLocation) {

                this.errorCount++;

                // If the preload action has already failed, ignore further action.
                if (this.isRejected()) {

                    return;

                }

                this.state = this.states.REJECTED;

                this.deferred.reject(imageLocation);

            },


            // I handle the load-success of the given image location.
            handleImageLoad: function handleImageLoad(imageLocation) {

                this.loadCount++;

                // If the preload action has already failed, ignore further action.
                if (this.isRejected()) {

                    return;

                }

                // Notify the progress of the overall deferred. This is different
                // than Resolving the deferred - you can call notify many times
                // before the ultimate resolution (or rejection) of the deferred.
                this.deferred.notify({
                    percent: Math.ceil(this.loadCount / this.imageCount * 100),
                    imageLocation: imageLocation
                });

                // If all of the images have loaded, we can resolve the deferred
                // value that we returned to the calling context.
                if (this.loadCount === this.imageCount) {

                    this.state = this.states.RESOLVED;

                    this.deferred.resolve(this.imageLocations);

                }

            },


            // I load the given image location and then wire the load / error
            // events back into the preloader instance.
            // --
            // NOTE: The load/error events trigger a $digest.
            loadImageLocation: function loadImageLocation(imageLocation) {

                var preloader = this;

                // When it comes to creating the image object, it is critical that
                // we bind the event handlers BEFORE we actually set the image
                // source. Failure to do so will prevent the events from proper
                // triggering in some browsers.
                var image = $(new Image())
                    .load(
                        function(event) {

                            // Since the load event is asynchronous, we have to
                            // tell AngularJS that something changed.
                            $rootScope.$apply(
                                function() {

                                    preloader.handleImageLoad(event.target.src);

                                    // Clean up object reference to help with the
                                    // garbage collection in the closure.
                                    preloader = image = event = null;

                                }
                            );

                        }
                    )
                    .error(
                        function(event) {

                            // Since the load event is asynchronous, we have to
                            // tell AngularJS that something changed.
                            $rootScope.$apply(
                                function() {

                                    preloader.handleImageError(event.target.src);

                                    // Clean up object reference to help with the
                                    // garbage collection in the closure.
                                    preloader = image = event = null;

                                }
                            );

                        }
                    )
                    .prop("src", imageLocation);

            }

        };


        // Return the factory instance.
        return (Preloader);

    }
);
