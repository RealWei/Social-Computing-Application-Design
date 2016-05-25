101062225 曾振瑋 Lab1-1

/////////////////////////////////////
//                                 //
//    Files contained in Lab 1-1   //
//                                 //
/////////////////////////////////////

buttons.css     : Defines button style.
containers.css  : Defines page layout.
texts.css       : Defines text styles.
functions.js    : All button functions are deifned here.
index.html      : The main webpage of Todo List.

Other files(mfb.js, mfb.min.css, ...) and directories(_ and lib) are files of floating action menu, a good third-party library.



/////////////////////////////////////
//                                 //
//      Explanation of my work     //
//                                 //
/////////////////////////////////////

I put a div with class = todos. When adding a todo, it will be inserted into the todos div. To delete all todos, just clean up the innerHtml of the todos div.

Uses JQuery to find the number of todo items, then append to id, for manipulation. Finally, insert todo item into todos div.

When clicking button, it passes it's value to JavaScript function to manipulate the todo item.

Uses a third-party library to add floating action menu to my page.



/////////////////////////////////////
//                                 //
//       Problem encountered       //
//                                 //
/////////////////////////////////////

I didn't know how to use JQuery at the beginning. But it's easy to learn because I know how to use JavaScript.

I have to write todo item in html form in my js file, and I have to escape " symbol. It turns out to be a mess when I have to put variables between lots of " and \".

P.S. The "Add" and "Delete all" button is in the floating action menu, which located at the buttom-right corner of the page.
