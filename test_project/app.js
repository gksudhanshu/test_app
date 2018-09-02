var app = angular.module('quiz', ['nvd3']);

app.controller('MainCtrl', function ($scope) {

    $scope.questions = [{
            "id": '1',
            "questionText": "Why is the sky blue?",
            "Options": [{
                    "answerText": "Option1"
                },
                {
                    "answerText": "Option2"
                },
                {
                    "answerText": "Option3"
                },
                {
                    "answerText": "Option4"
                }
            ],
            "CorrectAnswer": "Option1"
        },
        {
            "id": '2',
            "questionText": "Why is the meaning of life?",
            "Options": [{
                    "answerText": "Option1"
                },
                {
                    "answerText": "Option2"
                },
                {
                    "answerText": "Option3"
                },
                {
                    "answerText": "Option4"
                }
            ],
            "CorrectAnswer": "Option2"
        },
        {
            "id": '3',
            "questionText": "How many pens are in $10.00?",
            "Options": [{
                    "answerText": "Option1"
                },
                {
                    "answerText": "Option2"
                },
                {
                    "answerText": "Option3"
                },
                {
                    "answerText": "Option4"
                }
            ],
            "CorrectAnswer": "Option3"
        },
        {
            "id": '4',
            "questionText": "What is the default program?",
            "Options": [{
                    "answerText": "Option1"
                },
                {
                    "answerText": "Option2"
                },
                {
                    "answerText": "Option3"
                },
                {
                    "answerText": "Option4"
                }
            ],
            "CorrectAnswer": "Option2"
        }
    ];



    $scope.Correct = [];
    $scope.InCorrect = [];
    $scope.isNotAnswered = [];
    $scope.isShowGraph = false

    //On submit
    $scope.ShowResult = function () {
      $scope.isShowGraph = false
        $scope.Correct = [];
        $scope.InCorrect = [];
        $scope.isNotAnswered = [];
        $scope.questions.forEach(element => {
            var e = document.getElementById(element.id);
            var OptionValue = e.options[e.selectedIndex].value;
            document.getElementById(element.id).style.backgroundColor = "";
            document.getElementById(`panel_${element.id}`).style.backgroundColor = "";
            if (OptionValue === element.CorrectAnswer) {
                $scope.Correct.push(element.id);
            } else if (OptionValue !== '#' && OptionValue !== element.CorrectAnswer) {
                $scope.InCorrect.push(element.id);
            } else if (OptionValue === '#') {

                $scope.isNotAnswered.push(element.id)
                // document.getElementById(element.id).style.backgroundColor = "black";
                document.getElementById(`panel_${element.id}`).style.backgroundColor = "blue";
            }
        });
        //Show graph only when all questions are answered
        if ($scope.isNotAnswered.length == 0) {
            console.log('processed')
            $scope.isShowGraph = true
            $scope.InCorrect.forEach(inc => {
                document.getElementById(`panel_${inc}`).style.backgroundColor = "red";

            })

        }



        //For Graph
        $scope.data = [{
            key: "Cumulative Return",
            values: [{
                    "label": "Correct",
                    "value": $scope.Correct.length
                },

                {
                    "label": "Incorrect",
                    "value": $scope.InCorrect.length
                }
            ]
        }]
    }

    //On Clear
    $scope.ClearData = function () {
        console.log('Clear data')

        $scope.isShowGraph = false;
        $scope.isNotAnswered = [];
        $scope.Correct = [];
        $scope.InCorrect = [];
        $scope.questions.forEach(element => {
            document.getElementById(element.id).selectedIndex = 0;
            document.getElementById(element.id).style.backgroundColor = "";
            document.getElementById(`panel_${element.id}`).style.backgroundColor = "";
        })
    }


    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function (d) {
                return d.label;
            },
            y: function (d) {
                return d.value + (1e-10);
            },
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'Answers'
            },
            yAxis: {
                axisLabel: 'Number',
                axisLabelDistance: -10
            }
        }
    };


});
