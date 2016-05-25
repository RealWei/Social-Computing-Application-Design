101062225 曾振瑋 Lab1-3

/////////////////////////////////////
//                                 //
//    Files contained in Lab 1-3   //
//                                 //
/////////////////////////////////////

PTT parser.py     : Source code of Lab 1-3.



/////////////////////////////////////
//                                 //
//      Explanation of my work     //
//                                 //
/////////////////////////////////////

First, use requests to get the html file of the PTT post to parse.
Then use BeautifulSoup to parse html for easier manipulation.
Extract the comment section by querying div with class = "push".
Re-parse the comment section, then count the numbers of pushes/boos/arrows (upvote/downvote/neutral).

Append the count result of three type of comment and comment section in html form to a single string, then write to output.html.


/////////////////////////////////////
//                                 //
//       Problem encountered       //
//                                 //
/////////////////////////////////////

I have to search BeautifulSoup API document for the functions needed to get the desired data of the html file.
