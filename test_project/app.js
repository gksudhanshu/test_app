var app = angular.module('quiz', ['nvd3']);

app.controller('MainCtrl', function($scope) {
  
     $scope.questions = [{
             "id": '1',
             "questionText": "Why is the sky blue?",
             "Options": [{
                     "answerText": "1Correct"
                 },
                 {
                     "answerText": "1blah blah 2"
                 },
                 {
                     "answerText": "1blah blah 3"
                 },
                 {
                     "answerText": "1blah blah 4"
                 }
             ],
             "CorrectAnswer": "1Correct"
         },
         {
             "id": '2',
             "questionText": "Why is the meaning of life?",
             "Options": [{
                     "answerText": "2blah blah 1"
                 },
                 {
                     "answerText": "2Correct"
                 },
                 {
                     "answerText": "2blah blah 3"
                 },
                 {
                     "answerText": "2blah blah 4"
                 }
             ],
             "CorrectAnswer": "2Correct"
         },
         {
             "id": '3',
             "questionText": "How many pens are in $10.00?",
             "Options": [{
                     "answerText": "3blah blah 1"
                 },
                 {
                     "answerText": "3blah blah 2"
                 },
                 {
                     "answerText": "3Correct"
                 },
                 {
                     "answerText": "3blah blah 4"
                 }
             ],
             "CorrectAnswer": "3Correct"
         },
         {
             "id": '4',
             "questionText": "What is the default program?",
             "Options": [{
                     "answerText": "4blah blah 1"
                 },
                 {
                     "answerText": "4Correct"
                 },
                 {
                     "answerText": "4blah blah 3"
                 },
                 {
                     "answerText": "4blah blah 4"
                 }
             ],
             "CorrectAnswer": "4Correct"
         }
     ];

     
    
     $scope.Correct = [];
     $scope.InCorrect = [];
     $scope.isNotAnswered=[];
     $scope.isShowGraph=false
    
     //On submit
     $scope.ShowResult = function () {
     
         $scope.Correct = [];
         $scope.InCorrect = [];
         $scope.isNotAnswered=[];
         $scope.questions.forEach(element => {
             var e = document.getElementById(element.id);
             var OptionValue = e.options[e.selectedIndex].value;
             document.getElementById(element.id).style.backgroundColor = "";
             document.getElementById(`panel_${element.id}`).style.backgroundColor = "";
             if (OptionValue === element.CorrectAnswer) {
                 $scope.Correct.push(element.id);
             } else if (OptionValue !== '#' && OptionValue !== element.CorrectAnswer) {
              
              // document.getElementById(`panel_${element.id}`).style.class =$scope.pannelinfo ;
                 $scope.InCorrect.push(element.id);
             } else if (OptionValue === '#') {
            
              $scope.isNotAnswered.push(element.id)
                // document.getElementById(element.id).style.backgroundColor = "black";
                 document.getElementById(`panel_${element.id}`).style.backgroundColor = "blue";
             }
         });

         $scope.InCorrect.forEach(inc=>{
         
         
         })

//Show graph only when all questions are answered
if($scope.isNotAnswered.length==0)
{ $scope.isShowGraph=true}
//For Graph
         $scope.data = [
          {
              key: "Cumulative Return",
              values: [
                  {
                      "label" : "Correct" ,
                      "value" : $scope.Correct.length
                  }  ,
                 
                  {
                      "label" : "Incorrect" ,
                      "value" : $scope.InCorrect.length
                  }
              ]
          }
      ]
     }

     //On Clear
     $scope.ClearData = function () {
         console.log('Clear data')
        
         $scope.isShowGraph=false;
         $scope.isNotAnswered=[];
         $scope.Correct = [];
         $scope.InCorrect = [];
         $scope.questions.forEach(element => {
             document.getElementById(element.id).selectedIndex = 0;
             document.getElementById(element.id).style.backgroundColor = "";
         })
     }
    
 
  $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value + (1e-10);},
                showValues: true,
                valueFormat: function(d){
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
