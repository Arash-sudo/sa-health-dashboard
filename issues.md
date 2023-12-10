the sa health endpoints take very long (1-2 seconds) to respond. with the cold start time for the lambda function cold start time, it will be too long for the initial request to respond.

solution 1: visit the website on laptop/pc to activate the lambda;
solution 2: (seems better), increase the timeout setting in lambda to 5 seconds;
