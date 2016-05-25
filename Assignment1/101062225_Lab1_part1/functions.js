/**
 *  On clicking "Add" button, calls addTodo() function. What it does is:
 *  1. Use jquery to find number the current todos.
 *  2. Get current time
 *  3. Use 1. as id, and append time to todo item.
 *  4. Insert the todo item in todos div.
 */
function addTodo(){
    var n = $('.todo').size();
    var d = new Date();
    var hour = d.getHours();
    var second = d.getSeconds();
    var minute = d.getMinutes();

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    var time = d.getFullYear() + "/"
                + (d.getMonth()+1)  + "/"
                + d.getDate() + " @ "
                + hour + ":"
                + minute+ ":"
                + second;

    var todoObject =
        "<div class=\"todo\" id=\"" + n + "\">" +
            "<div class=\"time\">" +
                time +
            "</div>" +
            "<div>" +
                "<p class=\"content\" id=\"content" + n + "\">" +
                "</p>" +
                "<textarea class=\"contentInput invisible\" id=\"textarea" + n + "\">" +
                "</textarea>" +
            "</div>" +
            "<div class=\"buttonContainer\">" +
                "<button class=\"btn2\" onclick=\"editTodo(this.value)\" " +
                "value=\"" + n + "\" id=\"editBtn" + n + "\">Edit</button>" +
                "<button class=\"btn2 invisible\" onclick=\"doneEditingTodo(this.value)\" "+
                "value=\"" + n + "\" id=\"saveBtn" + n + "\">Save</button>"+
                "<button class=\"btn2\" onclick=\"deleteTodo(this.value)\" " +
                "value=\"" + n + "\" id=\"deleBtn" + n + "\">Delete</button>" +
            "</div>" +
        "</div>";

    $('.todos').append(todoObject);
}
/**
 *  On clicking "Edit" button, calls editTodo(index), and passes the button value.
 *  1. Put current todo content inside the textarea.
 *  2. Set the visibility of textarea and "Save" button to visible, content and "Edit" button to none.
 */
function editTodo(index) {
    //var todo = ".todo#" + index;
    var textarea = "#textarea" + index;
    var content = "#content" + index;
    var saveBtn = "#saveBtn" + index;
    var editBtn = "#editBtn" + index;

    $(content).addClass("invisible");
    $(editBtn).addClass("invisible");
    $(saveBtn).removeClass("invisible");
    $(textarea).removeClass("invisible");
    $(textarea).append($(content).html());
}

/**
 *  On clicking "Save" button, calls doneEditingTodo(index), and passes the button value.
 *  1. Set the visibility of content and "Edit" button to visible, textarea and "Sace" button to none.
 *  2. Put textarea text to the content.
 *  3. Clean up texarea.
 */
function doneEditingTodo(index) {
    var textarea = "#textarea" + index;
    var content = "#content" + index;
    var saveBtn = "#saveBtn" + index;
    var editBtn = "#editBtn" + index;

    $(saveBtn).addClass("invisible");
    $(editBtn).removeClass("invisible");
    $(textarea).addClass("invisible");
    $(content).removeClass("invisible");

    $(content).empty();
    $(content).append($(textarea).val());
    $(textarea).empty();
}

/**
 *  On clicking "Delete" button, calls doneEditingTodo(index), and passes the button value.
 *  Find the item and remove.
 */
function deleteTodo(index){
    var todo = ".todo#" + index;
    $(todo).remove();
}

/**
 * Remove all innerHtml of todos div.
 */
function deleteAllTodos(){
    $('.todos').empty();
}
